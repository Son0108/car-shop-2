import { useRouter } from "next/router";
import useSWR from "swr";
import { useCallback, useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { RealEstate } from "../../../definitions/types/models/RealEstate";
import StackedLayout from "../../../components/templates/Layout/StackedLayout/StackedLayout";
import SEO from "../../../components/utilities/SEO";
import RealEstateDetailPanel from "../../../components/features/real-estate/RealEstateDetailPanel";
import { useAuth } from "../../../contexts/AuthenticationContext/AuthenticationContext";
import { ApplicationWithUser } from "../../../definitions/types/models/Application";
import ApplicationsPanel from "../../../components/features/real-estate/ApplicationsPanel";
import api from "../../../config/api/api";
import { useNotifier } from "../../../contexts/NotificationContext/NotificationContext";
import Button from "../../../components/atoms/Button/Button";
import ShareRealEstatePanel from "../../../components/features/real-estate/ShareRealEstatePanel";
import LoadingScreen from "../../../components/templates/LoadingScreen/LoadingScreen";
import Alert from "../../../components/atoms/Alert/Alert";
import {
  sortByApplicationStarred,
  sortByApplicationStatus,
} from "../../../helpers/status/StatusCompareFunctions";
import { Severity } from "../../../definitions/types/Severity";
import { PaginationProps } from "../../../components/molecules/PaginationPanel/PaginationPanel";
import { ExtendedCollectionDTO } from "../../../definitions/types/models/ExtendedCollectionDTO";
import NotFoundPage from "../../404";

interface Props {
  initialData: RealEstate;
}

const RealEstateDetailView = ({ initialData }: Props) => {
  const {
    push,
    query: { id },
  } = useRouter();
  const { t } = useTranslation();
  const { user, isAgent, isTenant } = useAuth();
  const { notify } = useNotifier();
  const [paginationApplications, setPaginationApplications] =
    useState<PaginationProps>({
      page: 0,
      size: 5,
    });

  const [reinitialize, setReinitialize] = useState<boolean>(false);

  const { data: realEstate, error: realEstateError } = useSWR<RealEstate>(
    isAgent ? `/real-estates/own/${id}` : `/real-estates/${id}`,
    {
      initialData,
      revalidateOnMount: true,
    }
  );

  const {
    data: applications,
    error: applicationsError,
    mutate: mutateApplications,
  } = useSWR<ExtendedCollectionDTO<ApplicationWithUser[]>>(
    isAgent
      ? `/real-estates/${id}/applications?page=${paginationApplications.page}&size=${paginationApplications.size}`
      : null
  );

  useEffect(() => {
    mutateApplications(applications, true);
  }, [reinitialize]); //eslint-disable-line

  useEffect(() => {
    setPaginationApplications((prevState) => {
      return {
        ...prevState,
        totalCount: applications?.totalCount,
      };
    });
  }, [applications?.totalCount]);

  const {
    data: ownApplication,
    error: ownApplicationError,
    revalidate: revalidateOwnApplication,
    isValidating: validatingOwnApplication,
  } = useSWR<ApplicationWithUser>(
    isTenant ? `/real-estates/${id}/application/own` : null
  );

  const handleApply = useCallback(async () => {
    try {
      await api.post(`/real-estates/${id}/apply`);
      notify({
        title: t("notifications:createApplicationSuccess"),
        severity: "success",
      });
    } catch (err: any) {
      notify({
        title: err.message,
        severity: "error",
      });
    }
  }, [notify, id, t]);

  const panelAction = () => {
    if (
      !realEstate ||
      (!realEstate && !realEstateError) ||
      (isTenant && !ownApplication && !ownApplicationError)
    )
      return null;

    if (isAgent && realEstate.agent.id === user?.id) {
      return (
        <Button onClick={() => push(`/real-estates/${id}/edit`)}>
          {t("realEstates:actions.edit")}
        </Button>
      );
    }

    if (isTenant && ownApplication) {
      let message = t("realEstates:text.alreadyApplied");
      let severity: Severity = "info";

      if (ownApplication.status.value === "ACCEPTED") {
        message = t("realEstates:text.applicationAccepted");
        severity = "success";
      } else if (ownApplication.status.value === "TEMPORARY_ACCEPTED") {
        message = t("realEstates:text.applicationTemporaryAccepted");
        severity = "success";
      } else if (ownApplication.status.value === "DECLINED") {
        message = t("realEstates:text.applicationDeclined");
        severity = "error";
      }

      return (
        <div className="py-4">
          <Alert severity={severity}>
            <p>{message}</p>
          </Alert>
        </div>
      );
    }

    // Before potentially allowing someone to apply check if the application-process has ended
    if (realEstate.status.value === "CLOSED") {
      return (
        <div className="py-4">
          <Alert severity="info">
            <p>{t("realEstates:text.noLongerAvailable")}</p>
          </Alert>
        </div>
      );
    }

    if (isTenant && !ownApplication) {
      return (
        <Button
          onClick={async () => {
            await handleApply();
            await revalidateOwnApplication();
          }}
          loading={
            (!ownApplication && !ownApplicationError) ||
            validatingOwnApplication
          }
        >
          {t("realEstates:actions.apply")}
        </Button>
      );
    }

    if (!user) {
      return (
        <Button
          onClick={() =>
            push({
              pathname: "/login",
              query: {
                redirect: `/real-estates/${id}`,
              },
            })
          }
        >
          {t("realEstates:actions.login")}
        </Button>
      );
    }

    return null;
  };

  if (realEstateError) {
    return <NotFoundPage />;
  }

  if (!realEstate) {
    return <LoadingScreen />;
  }

  return (
    <StackedLayout title={realEstate.name}>
      <SEO noIndex title={realEstate.name} />
      <div className="grid gap-4">
        <RealEstateDetailPanel
          realEstate={realEstate}
          callToAction={panelAction()}
        />
        {isAgent && user && realEstate.agent.id === user.id && (
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <ApplicationsPanel
                pagination={{
                  page: paginationApplications.page,
                  size: paginationApplications.size,
                  totalCount: applications?.totalCount,
                  setPagination: setPaginationApplications,
                }}
                applications={applications?.data
                  .sort((application1, application2) =>
                    sortByApplicationStatus(
                      application1.status.value,
                      application2.status.value
                    )
                  )
                  .sort((application1, application2) =>
                    sortByApplicationStarred(
                      application1.starred,
                      application2.starred,
                      false
                    )
                  )}
                loading={!applications && !applicationsError}
                showLink
                setReinitialize={setReinitialize}
              />
            </div>
            <ShareRealEstatePanel
              id={`qr-code-${id}`}
              link={window.location.href}
            />
          </div>
        )}
      </div>
    </StackedLayout>
  );
};

export default RealEstateDetailView;
