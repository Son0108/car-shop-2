import useTranslation from "next-translate/useTranslation";
import SEO from "../components/utilities/SEO";
import TenantDashboard from "../components/templates/Dashboards/TenantDashboard";
import { useAuth } from "../contexts/AuthenticationContext/AuthenticationContext";
import AgentDashboard from "../components/templates/Dashboards/AgentDashboard";
import StackedLayout from "../components/templates/Layout/StackedLayout/StackedLayout";

const Dashboard = () => {
  const { t } = useTranslation();
  const { isTenant, isAgent } = useAuth();

  return (
    <StackedLayout title={t("dashboard:title")}>
      <SEO title={t("dashboard:title")} noIndex />
      {isTenant && <TenantDashboard />}
      {isAgent && <AgentDashboard />}
    </StackedLayout>
  );
};

export default Dashboard;
