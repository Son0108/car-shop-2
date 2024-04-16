import useTranslation from "next-translate/useTranslation";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import SEO from "../../components/utilities/SEO";
import CardLayout from "../../components/templates/Layout/CardLayout/CardLayout";
import { useAuth } from "../../contexts/AuthenticationContext/AuthenticationContext";
import AvatarForm, {
  AvatarFormValues,
} from "../../components/features/sign-up/complete-profile/AvatarForm";
import UserService from "../../services/UserService";
import Panel from "../../components/atoms/Panel/Panel";
import Button from "../../components/atoms/Button/Button";
import QuestionnaireCTXProvider from "../../components/features/questionnaire/QuestionnaireContext";
import QuestionnaireForm from "../../components/features/questionnaire/QuestionnaireForm";
import { isAPIError } from "../../config/api/api-error";
import { handleAPIErrorResponse } from "../../helpers/errors/APIErrorHandler";
import { useNotifier } from "../../contexts/NotificationContext/NotificationContext";
import { FileCategory, IFile } from "../../definitions/types/models/File";
import { downloadFile } from "../../helpers/DownloadHelper";
import { FileUploadFormValues } from "../../components/features/shared/FileUploadFormModal";
import EditableFileList from "../../components/molecules/FileList/EditableFileList";

type CompleteProfileStep =
  | "INTRO"
  | "UPLOAD_AVATAR"
  | "TENANT_UPLOAD_DOCUMENTS"
  | "TENANT_QUESTIONNAIRE"
  | "TENANT_QUESTIONNAIRE_SUMMARY"
  | "OUTRO";

const CompleteProfilePage = () => {
  const router = useRouter();
  const { isTenant, user, mutate: mutateUser } = useAuth();
  const { t } = useTranslation();
  const { notify } = useNotifier();

  // Return the steps of the complete-profile wizard based on the user-role
  const steps: CompleteProfileStep[] = useMemo(() => {
    if (isTenant) {
      return [
        "INTRO",
        "TENANT_QUESTIONNAIRE",
        "TENANT_QUESTIONNAIRE_SUMMARY",
        "UPLOAD_AVATAR",
        "TENANT_UPLOAD_DOCUMENTS",
        "OUTRO",
      ];
    }
    // Return agent steps
    return ["INTRO", "UPLOAD_AVATAR", "OUTRO"];
  }, [isTenant]);

  const [step, setStep] = useState<CompleteProfileStep>(steps[0]);

  const { data: fileCategories, error: fileCategoriesError } = useSWR<
    FileCategory[]
  >("/file-categories/user-files");

  useEffect(() => {
    if (user && user.status !== "INCOMPLETE") {
      router.push("/");
    }
  }, [router, user]);

  const title = useMemo(() => {
    switch (step) {
      case "TENANT_QUESTIONNAIRE":
        return "Fragebogen";
      case "TENANT_QUESTIONNAIRE_SUMMARY":
        return "Fragebogen";
      case "UPLOAD_AVATAR":
        return "Avatar";
      case "TENANT_UPLOAD_DOCUMENTS":
        return "Dokumente";
      case "OUTRO":
        return "Profil vollständig!";
      default:
        return "Profil vervollständigen";
    }
  }, [step]);

  const advance = () =>
    setStep((currentStep) => {
      const currentIndex = steps.indexOf(currentStep);
      // If it's not the last step load the next question;
      if (currentIndex < steps.length - 1) {
        return steps[currentIndex + 1];
      }
      // Else maintain last step
      return currentStep;
    });

  const handleAvatarFormSubmit = async (values: AvatarFormValues) => {
    try {
      if (values.avatar) {
        await UserService().uploadAvatar(values.avatar);
      }
      advance();
    } catch (err) {
      if (isAPIError(err)) {
        handleAPIErrorResponse(err, {
          notify,
        });
      }
    }
  };

  const handleDocumentDownload = async (file: IFile) =>
    downloadFile(file, notify);

  const handleDocumentUpload = async (values: FileUploadFormValues) => {
    try {
      if (values.file) {
        await UserService().uploadDocument(values.fileCategory, values.file);

        // Force revalidation of user to show updated files
        await mutateUser(user, true);
      }
    } catch (err) {
      if (isAPIError(err)) {
        handleAPIErrorResponse(err, { notify });
      }
    }
  };

  const handleDocumentDeletion = async (file: IFile) => {
    try {
      await UserService().deleteDocument(file.name);

      // Force revalidation of user to show updated files
      await mutateUser(user, true);
    } catch (err) {
      if (isAPIError(err)) {
        handleAPIErrorResponse(err, { notify });
      }
    }
  };

  const handleCompletion = async () => {
    try {
      await UserService().completeProfile();
      // After the user was completed update all instances of the current user
      await mutate("/users/own");
      await router.push("/dashboard");
    } catch (err) {
      if (isAPIError(err)) {
        handleAPIErrorResponse(err, { notify });
      }
    }
  };

  return (
    <CardLayout title={title}>
      <SEO title={title} noIndex />
      {step === "INTRO" && (
        <Panel>
          <div className="flex flex-col space-y-4">
            <p>{t("signUp:completeProfile.intro")}</p>
            <div className="flex justify-end">
              <Button onClick={advance}>{t("forms:actions.continue")}</Button>
            </div>
          </div>
        </Panel>
      )}
      {(step === "TENANT_QUESTIONNAIRE" ||
        step === "TENANT_QUESTIONNAIRE_SUMMARY") && (
        <QuestionnaireCTXProvider handleComplete={advance}>
          {({
            question,
            answers,
            categories,
            handleNext,
            handlePrevious,
            handleSubmit,
            loading,
            questionIndex,
            totalQuestions,
          }) => (
            <>
              {step === "TENANT_QUESTIONNAIRE" && (
                <Panel loading={loading}>
                  {categories && (
                    <div>
                      {question && (
                        <QuestionnaireForm
                          handlePrevious={handlePrevious}
                          handleSkip={handleNext}
                          userAnswer={answers?.find(
                            (answer) => answer.question.id === question?.id
                          )}
                          question={question}
                          handleSubmit={handleSubmit}
                          activeQuestionIndex={questionIndex}
                          questionsCount={totalQuestions}
                        />
                      )}
                      {!loading && !question && (
                        <div className="space-y-4">
                          <p>
                            {t("signUp:completeProfile.questionnaireIntro")}
                          </p>
                          <p>
                            {t("signUp:completeProfile.questionnaireOptional")}
                          </p>
                          <div className="flex justify-end">
                            <Button onClick={handleNext}>
                              {t("forms:actions.continue")}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Panel>
              )}
              {step === "TENANT_QUESTIONNAIRE_SUMMARY" && (
                <Panel>
                  <div className="space-y-4">
                    <p>
                      {t("signUp:completeProfile.questionnaireFinished", {
                        percentage: `${Math.floor(
                          ((answers ? answers.length : 0) / totalQuestions) *
                            100
                        )}%`,
                      })}
                    </p>
                    <div className="flex justify-end">
                      <Button onClick={advance}>
                        {t("forms:actions.continue")}
                      </Button>
                    </div>
                  </div>
                </Panel>
              )}
            </>
          )}
        </QuestionnaireCTXProvider>
      )}
      {step === "UPLOAD_AVATAR" && (
        <Panel>
          <AvatarForm handleSubmit={handleAvatarFormSubmit} />
        </Panel>
      )}
      {step === "TENANT_UPLOAD_DOCUMENTS" && (
        <Panel>
          <div className="space-y-4">
            <p>{t("signUp:uploadDocumentsForm.intro")}</p>
            <p>{t("signUp:uploadDocumentsForm.orLater")}</p>
            {fileCategories && !fileCategoriesError && (
              <div>
                <EditableFileList
                  handleUpload={handleDocumentUpload}
                  handleDelete={handleDocumentDeletion}
                  handleDownload={handleDocumentDownload}
                  items={fileCategories.map((fileCategory) => {
                    return {
                      fileCategory,
                      value: user?.files.find(
                        (userFile) =>
                          userFile.fileCategory.value === fileCategory.value
                      ),
                    };
                  })}
                />
              </div>
            )}
            <Button onClick={advance} fill>
              {t("forms:actions.continue")}
            </Button>
          </div>
        </Panel>
      )}
      {step === "OUTRO" && (
        <Panel>
          <div className="space-y-4">
            <p>{t("signUp:completeProfile.outro")}</p>
            <Button onClick={handleCompletion} fill>
              {t("forms:actions.submit")}
            </Button>
          </div>
        </Panel>
      )}
    </CardLayout>
  );
};

export default CompleteProfilePage;
