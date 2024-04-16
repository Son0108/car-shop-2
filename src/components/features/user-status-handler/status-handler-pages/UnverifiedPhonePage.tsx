import useTranslation from "next-translate/useTranslation";
import { useAuth } from "../../../../contexts/AuthenticationContext/AuthenticationContext";
import CardLayout from "../../../templates/Layout/CardLayout/CardLayout";
import SEO from "../../../utilities/SEO";
import Panel from "../../../atoms/Panel/Panel";
import Button from "../../../atoms/Button/Button";

const UnverifiedPhonePage = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const title = t("notifications:verify.phone.title");

  return (
    <CardLayout title={title}>
      <SEO title={title} noIndex />
      <Panel>
        <div className="flex flex-col space-y-4">
          <p>{t("notifications:verify.phone.message")}</p>
          <Button onClick={logout}>{t("common:actions.logout")}</Button>
        </div>
      </Panel>
    </CardLayout>
  );
};

export default UnverifiedPhonePage;
