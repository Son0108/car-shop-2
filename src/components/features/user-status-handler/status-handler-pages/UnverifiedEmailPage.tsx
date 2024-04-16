import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import CardLayout from "../../../templates/Layout/CardLayout/CardLayout";
import SEO from "../../../utilities/SEO";
import Panel from "../../../atoms/Panel/Panel";
import Button from "../../../atoms/Button/Button";
import Divider from "../../../atoms/Divider/Divider";
import { useAuth } from "../../../../contexts/AuthenticationContext/AuthenticationContext";
import { useNotifier } from "../../../../contexts/NotificationContext/NotificationContext";
import VerificationService from "../../../../services/VerificationService";
import { handleAPIErrorResponse } from "../../../../helpers/errors/APIErrorHandler";
import { isAPIError } from "../../../../config/api/api-error";

const UnverifiedEmailPage = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { notify } = useNotifier();
  const title = t("notifications:verify.email.title");
  const [emailRequested, setEmailRequested] = useState(false);

  const requestEmailAgain = async () => {
    if (!user) return;

    if (emailRequested) {
      notify({
        severity: "warning",
        title: t(
          "notifications:userStatus.requestNewVerificationEmail.alreadySent"
        ),
      });
      return;
    }

    setEmailRequested(true);

    try {
      await VerificationService().requestNewVerificationEmail(user.email);
      notify({
        severity: "success",
        title: t("notifications:userStatus.requestNewVerificationEmail.sent"),
      });
    } catch (err) {
      if (isAPIError(err)) {
        handleAPIErrorResponse(err, {
          notify,
        });
      }
      setEmailRequested(false);
    }
  };

  return (
    <CardLayout title={title}>
      <SEO title={title} noIndex />
      <Panel>
        <div className="flex flex-col space-y-4">
          <p>{t("notifications:verify.email.message")}</p>
          <Button onClick={logout}>{t("common:actions.logout")}</Button>
          <Divider text={t("common:text.or")} />
          <Button
            variant="text"
            size="sm"
            color="primary"
            onClick={requestEmailAgain}
          >
            E-Mail erneut anfordern
          </Button>
        </div>
      </Panel>
    </CardLayout>
  );
};

export default UnverifiedEmailPage;
