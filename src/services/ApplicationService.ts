import { ApplicationStatus } from "../definitions/types/models/Application";
import api from "../config/api/api";
import { SearchCriteriaGroup } from "../definitions/types/models/searchcriteria/SearchCriteriaGroup";

const ApplicationService = () => ({
  /**
   * Update the application-status for a given application
   * @param applicationID id of the application
   * @param status new status
   */
  updateApplicationStatus: async (
    applicationID: string,
    status: ApplicationStatus
  ) => {
    await api.put(`/applications/${applicationID}`, {
      status,
    });
  },

  getFilteredApplications: async (
    realEstateId: string | string[] | undefined,
    filterPredicates: SearchCriteriaGroup[],
    page: number,
    size: number
  ) => {
    const { data } = await api.post(
      `/real-estates/${realEstateId}/applications?page=${page}&size=${
        filterPredicates.length ? size : 20
      }`,
      [...filterPredicates]
    );

    return data;
  },

  updateApplicationStarred: async (applicationId: string) => {
    await api.put(`/applications/${applicationId}/starred`);
  },
});

export default ApplicationService;
