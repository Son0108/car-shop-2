import { useRouter } from "next/router";
import useSWR from "swr";
import useTranslation from "next-translate/useTranslation";
import StackedLayout from "../../components/templates/Layout/StackedLayout/StackedLayout";
import SEO from "../../components/utilities/SEO";
import Panel from "../../components/atoms/Panel/Panel";
import { QuestionCategory } from "../../definitions/types/models/QuestionCategory";
import { UserAnswer } from "../../definitions/types/models/UserAnswer";
import {
  ApplicationStatus,
  ApplicationWithUser,
} from "../../definitions/types/models/Application";
import ApplicationDetailPanel from "../../components/features/applications/ApplicantPanel";
import { isAPIError } from "../../config/api/api-error";
import { handleAPIErrorResponse } from "../../helpers/errors/APIErrorHandler";
import { useNotifier } from "../../contexts/NotificationContext/NotificationContext";
import ApplicationService from "../../services/ApplicationService";
import { downloadFile } from "../../helpers/DownloadHelper";
import { IFile } from "../../definitions/types/models/File";
import QuestionCategoryList from "../../components/features/profile/tabs/QuestionnaireTab/QuestionCategoryList";
import Heading from "../../components/atoms/Heading/Heading";
import ApplicationOptionsPanel from "../../components/features/applications/ApplicationOptionsPanel";

const ApplicationDetailPage = () => {
  const {
    query: { id },
  } = useRouter();
  const { t } = useTranslation();
  const { notify } = useNotifier();

  const {
    data: application,
    error: applicationError,
    mutate: mutateApplication,
  } = useSWR<ApplicationWithUser>(`/applications/${id}`);

  const { data: questionCategories, error: questionCategoriesError } = useSWR<
    QuestionCategory[]
  >(application ? "/question-categories" : null);

  const { data: userAnswers, error: userAnswersError } = useSWR<UserAnswer[]>(
    `/applications/${id}/users-questions`
  );

  const title = application
    ? t("applications:title", {
        firstName: application.applicant.firstName,
        lastName: application.applicant.lastName,
      })
    : t("common:text.loading");

  const handleDownload = (file: IFile) => downloadFile(file, notify);

  const handleUpdate = async (status: ApplicationStatus) => {
    if (!application) return;

    if (
      status === "ACCEPTED" &&
      !window.confirm(t("applications:text.promptAcceptWarning"))
    ) {
      return;
    }

    try {
      await ApplicationService().updateApplicationStatus(
        application.id,
        status
      );
      await mutateApplication(application, true);
    } catch (err) {
      if (isAPIError(err)) {
        handleAPIErrorResponse(err, { notify });
      }
    }
  };

  const loading =
    (!application && !applicationError) ||
    (!questionCategories && !questionCategoriesError) ||
    (!userAnswers && !userAnswersError);

  return (
    <StackedLayout title={title}>
      <SEO title={title} noIndex />
      <div className="grid gap-4 md:grid-cols-5 h-auto">
        <div className="md:col-span-3 h-auto">
          <ApplicationDetailPanel
            application={application}
            handleDownload={handleDownload}
            loading={loading}
          />
        </div>
        <div className="md:col-span-2 md:sticky md:top-8">
          <ApplicationOptionsPanel
            application={application}
            loading={!application && !applicationError}
            handleUpdate={handleUpdate}
          />
        </div>
        {application && (
          <div className="md:col-span-3">
            <Panel
              loading={!questionCategories && !questionCategoriesError}
              noPadding
              header={
                <Heading variant="h4" as="h2">
                  {t("applications:headings.answers")}
                </Heading>
              }
            >
              {questionCategories &&
                questionCategories
                  .sort(
                    (category1, category2) =>
                      category1.position - category2.position
                  )
                  .map((questionCategory) => (
                    <QuestionCategoryList
                      key={questionCategory.id}
                      category={questionCategory}
                      answers={userAnswers}
                    />
                  ))}
            </Panel>
          </div>
        )}
      </div>
    </StackedLayout>
  );
};

export default ApplicationDetailPage;
