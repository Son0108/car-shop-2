import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import ResetPasswordForm, {
  ResetPasswordFormValues,
} from "../components/organisms/ResetPasswordForm/ResetPasswordForm";
import { useNotifier } from "../contexts/NotificationContext/NotificationContext";
import CardLayout from "../components/templates/Layout/CardLayout/CardLayout";
import api from "../config/api/api";
import Panel from "../components/atoms/Panel/Panel";
import Button from "../components/atoms/Button/Button";
import SEO from "../components/utilities/SEO";
import { isAPIError } from "../config/api/api-error";
import { handleAPIErrorResponse } from "../helpers/errors/APIErrorHandler";

const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const { notify } = useNotifier();
  const router = useRouter();
  const {
    query: { token },
  } = router;
  const title = t("resetPassword:heading");

  const handlePasswordReset = async (values: ResetPasswordFormValues) => {
    try {
      await api.put(`/verifications/${token}/resetPassword`, {
        newPassword: values.password,
      });
      notify({
        title: t("resetPassword:resetSuccessful"),
        severity: "success",
      });
      // Redirect the user to login page after a successful password reset
      await router.push("/login");
    } catch (err) {
      if (isAPIError(err)) {
        handleAPIErrorResponse(err, {
          notify,
        });
      }
    }
  };

  return (
    <CardLayout title={title}>
      <SEO title={title} noIndex />
      <Panel>
        {token && (
          <div className="space-y-5">
            <p>{t("resetPassword:enterNewPassword")}</p>
            <ResetPasswordForm handleSubmit={handlePasswordReset} />
          </div>
        )}
        {!token && (
          <div className="space-y-5">
            <p>{t("resetPassword:invalidLink")}</p>
            <Button fill onClick={() => router.push("/forgot-password")}>
              {t("resetPassword:requestAgain")}
            </Button>
          </div>
        )}
      </Panel>
    </CardLayout>
  );
};

export default ForgotPasswordPage;
