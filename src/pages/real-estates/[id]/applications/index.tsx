import useSWR from "swr";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { ApplicationWithUser } from "../../../../definitions/types/models/Application";
import { RealEstate } from "../../../../definitions/types/models/RealEstate";
import StackedLayout from "../../../../components/templates/Layout/StackedLayout/StackedLayout";
import SEO from "../../../../components/utilities/SEO";
import {
  sortByApplicationStarred,
  sortByApplicationStatus,
} from "../../../../helpers/status/StatusCompareFunctions";
import ApplicationsPanel from "../../../../components/features/real-estate/ApplicationsPanel";
import FilterPanel from "../../../../components/molecules/FilterPanel/FilterPanel";
import { Filters } from "../../../../definitions/types/models/filter/Filters";
import { SearchCriteriaGroup } from "../../../../definitions/types/models/searchcriteria/SearchCriteriaGroup";
import ApplicationService from "../../../../services/ApplicationService";
import { ExtendedCollectionDTO } from "../../../../definitions/types/models/ExtendedCollectionDTO";
import { PaginationProps } from "../../../../components/molecules/PaginationPanel/PaginationPanel";

const RealEstateApplications = () => {
  const {
    query: { id },
  } = useRouter();
  const { t } = useTranslation();
  const [paginationApplications, setPaginationApplications] =
    useState<PaginationProps>({
      page: 0,
      size: 20,
      totalCount: 0,
    });

  const [reinitialize, setReinitialize] = useState<boolean>(false);

  const [filterPredicates, setFilterPredicates] = useState<
    SearchCriteriaGroup[]
  >([]);

  const [filteredApplications, setFilteredApplications] = useState<
    ApplicationWithUser[]
  >([]);

  const { data: correspondingRealEstate } = useSWR<RealEstate>(
    `/real-estates/own/${id}`
  );

  const { data: filters } = useSWR<Filters[]>("/public/filters");

  useEffect(() => {
    ApplicationService()
      .getFilteredApplications(
        id,
        filterPredicates,
        paginationApplications.page,
        paginationApplications.size
      )
      .then(
        (
          filteredApplicationsResponse: ExtendedCollectionDTO<
            ApplicationWithUser[]
          >
        ) => {
          setFilteredApplications(filteredApplicationsResponse.data);
          setPaginationApplications((prevState) => ({
            ...prevState,
            totalCount: filteredApplicationsResponse.totalCount,
            size: filteredApplicationsResponse.data.length,
          }));
        }
      );
  }, [
    reinitialize,
    filterPredicates,
    id,
    paginationApplications.page,
    paginationApplications.size,
  ]);

  return (
    <StackedLayout
      title={t("applications:titleAllApplications", {
        name: correspondingRealEstate ? correspondingRealEstate.name : "",
      })}
    >
      <SEO
        noIndex
        title={t("applications:titleAllApplications", {
          name: correspondingRealEstate ? correspondingRealEstate.name : "",
        })}
      />
      <div className="grid lg:grid-cols-3 gap-5">
        <div>
          <FilterPanel
            filters={filters}
            setFilterPredicates={setFilterPredicates}
            additionalFilter={[
              {
                name: "USER_FIRSTNAME",
                type: "text",
                label: t("common:filter.firstnameFilter"),
                initialValues: {
                  USER_FIRSTNAME: "",
                },
              },
              {
                name: "USER_LASTNAME",
                type: "text",
                label: t("common:filter.lastnameFilter"),
                initialValues: {
                  USER_LASTNAME: "",
                },
                additionalStyle: "mt-3",
              },
            ]}
          />
        </div>
        <div className="lg:col-span-2">
          <ApplicationsPanel
            pagination={{
              page: paginationApplications.page,
              size: paginationApplications.size,
              totalCount: paginationApplications.totalCount,
              setPagination: setPaginationApplications,
            }}
            applications={filteredApplications
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
            loading={!filteredApplications}
            setReinitialize={setReinitialize}
          />
        </div>
      </div>
    </StackedLayout>
  );
};

export default RealEstateApplications;
