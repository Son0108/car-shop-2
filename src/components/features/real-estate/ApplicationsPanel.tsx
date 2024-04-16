import NextLink from "next/link";
import useTranslation from "next-translate/useTranslation";
import clsx from "clsx";
import { useRouter } from "next/router";
import { StarIcon } from "@heroicons/react/solid";
import { Dispatch, SetStateAction } from "react";
import { ApplicationWithUser } from "../../../definitions/types/models/Application";
import Avatar from "../../atoms/Avatar/Avatar";
import FileUtility from "../../../utilities/FileUtility";
import Badge from "../../atoms/Badge/Badge";
import DataPanel from "../../molecules/DataPanel/DataPanel";
import { getBadgeColorForApplicationStatus } from "../../../helpers/status/BadgeColorHelper";
import Link from "../../atoms/Link/Link";
import { PaginationProps } from "../../molecules/PaginationPanel/PaginationPanel";
import ApplicationService from "../../../services/ApplicationService";

interface ApplicationsPanelProps {
  applications?: ApplicationWithUser[];
  loading?: boolean;
  showLink?: boolean;
  pagination?: PaginationProps;
  setReinitialize?: Dispatch<SetStateAction<boolean>>;
}

const ApplicationsPanel = ({
  applications = [],
  loading,
  showLink,
  pagination,
  setReinitialize,
}: ApplicationsPanelProps) => {
  const { t } = useTranslation();
  const {
    query: { id: realEstateId },
  } = useRouter();

  const updateStarred = async (applicationId: string) => {
    await ApplicationService().updateApplicationStarred(applicationId);
    if (setReinitialize) {
      setReinitialize((prevState) => !prevState);
    }
  };

  return (
    <DataPanel
      pagination={pagination}
      data={applications}
      keyFunc={({ id }) => `application-${id}`}
      loading={loading}
      title={t("realEstates:text.applicants")}
      addAction={
        showLink && (
          <Link
            variant="text"
            className="text-sm text-gray-700"
            href={`/real-estates/${realEstateId}/applications`}
          >
            {t("realEstates:actions.allApplications")}
          </Link>
        )
      }
    >
      {({ id, applicant, createdAt, status, starred }: ApplicationWithUser) => (
        <div className="flex flex-row items-center">
          <NextLink href={`/applications/${id}`}>
            <a
              className={clsx(
                "px-6 py-3 flex flex-grow",
                "sm:flex-row sm:justify-even sm:items-center sm:space-x-4",
                "hover:bg-gray-50"
              )}
            >
              <div className="flex-grow inline-flex items-center space-x-4">
                <Avatar
                  size="sm"
                  src={
                    applicant.avatar
                      ? FileUtility.getImageURL(applicant.avatar.name)
                      : undefined
                  }
                  unoptimized
                />
                <span className="font-medium">{`${applicant.firstName} ${applicant.lastName}`}</span>
              </div>
              <div className="inline-flex flex-col items-end space-y-2 ">
                <Badge color={getBadgeColorForApplicationStatus(status.value)}>
                  {status.text}
                </Badge>
                <span>
                  {t("realEstates:text.appliedAt", {
                    date: Intl.DateTimeFormat().format(Date.parse(createdAt)),
                  })}
                </span>
              </div>
            </a>
          </NextLink>
          <a>
            <StarIcon
              key={`star-${applicant.id}`}
              className={clsx(
                starred
                  ? "text-warning-400 hover:text-gray-300"
                  : "text-gray-300 hover:text-warning-400",
                "h-6 w-6 flex-shrink-0 mr-5"
              )}
              aria-hidden="true"
              onClick={() => updateStarred(id)}
            />
          </a>
        </div>
      )}
    </DataPanel>
  );
};

export default ApplicationsPanel;
