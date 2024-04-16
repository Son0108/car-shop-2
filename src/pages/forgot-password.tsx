import useTranslation from "next-translate/useTranslation";
import ForgotPasswordForm, {
  ForgotPasswordFormValues,
} from "../components/organisms/ForgotPasswordForm/ForgotPasswordForm";
import SEO from "../components/utilities/SEO";
import api from "../config/api/api";
import Panel from "../components/atoms/Panel/Panel";
import CardLayout from "../components/templates/Layout/CardLayout/CardLayout";
import { useNotifier } from "../contexts/NotificationContext/NotificationContext";
import { isAPIError } from "../config/api/api-error";
import { handleAPIErrorResponse } from "../helpers/errors/APIErrorHandler";

const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const { notify } = useNotifier();
  const title = t("forgotPassword:heading");

  const handlePasswordRest = async (values: ForgotPasswordFormValues) => {
    try {
      await api.post(`/users/requestResetPassword/${values.email}`);
      notify({
        severity: "success",
        title: t("notifications:forgotPassword.emailSent"),
      });
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
        <div className="space-y-5">
          <p>{t("forgotPassword:enterEmail")}</p>
          <ForgotPasswordForm handleSubmit={handlePasswordRest} />
        </div>
      </Panel>
    </CardLayout>
  );
};

export default ForgotPasswordPage;
