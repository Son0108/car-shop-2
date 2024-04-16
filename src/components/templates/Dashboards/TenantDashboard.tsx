import useSWR from "swr";
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthenticationContext/AuthenticationContext";
import WelcomeUserPanel from "../../molecules/WelcomeUserPanel/WelcomeUserPanel";
import QuestionnaireSummaryPanel from "../../molecules/QuestionnaireSummaryPanel/QuestionnaireSummaryPanel";
import ActivitiesPanel from "../../molecules/ActivitiesPanel/ActivitiesPanel";
import { Activity } from "../../../definitions/types/models/Activity";
import { Application } from "../../../definitions/types/models/Application";
import QuestionnaireCTXProvider from "../../features/questionnaire/QuestionnaireContext";
import ApplicationsOverviewPanel from "../../molecules/ApplicationsOverviewPanel/ApplicationsOverviewPanel";
import { sortByApplicationStatus } from "../../../helpers/status/StatusCompareFunctions";
import { Count } from "../../../definitions/types/models/Count";

const TenantDashboard = () => {
  const { avatar, user } = useAuth();
  const [paginationApplications, setPaginationApplications] = useState({
    page: 0,
    size: 5,
  });
  const { data: applications, error: applicationsError } = useSWR<
    Application[]
  >("/users/own/applications");
  const { data: count } = useSWR<Count>("/users/own/applications/count");
  const { data: activities } = useSWR<Activity[]>("/users/own/activities");

  useEffect(() => {
    setPaginationApplications((prevState) => {
      return {
        ...prevState,
        totalCount: count?.count,
      };
    });
  }, [count]);

  return (
    <div className="grid grid-cols-1 auto-rows-max lg:grid-cols-5 gap-4">
      {user && (
        <div className="lg:col-span-3">
          <WelcomeUserPanel
            applications={applications}
            user={user}
            src={avatar}
          />
        </div>
      )}
      <div className="lg:col-span-2">
        <QuestionnaireCTXProvider>
          {({ answers, totalQuestions, loading }) => (
            <QuestionnaireSummaryPanel
              loading={loading}
              amountAnswered={answers ? answers.length : 0}
              totalQuestions={totalQuestions}
            />
          )}
        </QuestionnaireCTXProvider>
      </div>
      <div className="lg:col-span-3 lg:min-h-screen-30">
        <ApplicationsOverviewPanel
          pagination={{
            page: paginationApplications.page,
            size: paginationApplications.size,
            totalCount: count?.count,
            setPagination: setPaginationApplications,
          }}
          applications={applications?.sort((application1, application2) =>
            sortByApplicationStatus(
              application1.status.value,
              application2.status.value
            )
          )}
          loading={!applications && !applicationsError}
        />
      </div>
      <div className="lg:col-span-2">
        <ActivitiesPanel activities={activities} />
      </div>
    </div>
  );
};

export default TenantDashboard;
