import useTranslation from "next-translate/useTranslation";
import { Activity } from "../../../definitions/types/models/Activity";
import ActivitiesPanelItem from "./ActivitiesPanelItem";
import Heading from "../../atoms/Heading/Heading";
import Panel from "../../atoms/Panel/Panel";

export interface ActivitiesPanelProps {
  activities?: Activity[];
  loading?: boolean;
}

const ActivitiesPanel = ({
  activities = [],
  loading,
}: ActivitiesPanelProps) => {
  const { t } = useTranslation();
  return (
    <Panel
      header={
        <Heading as="h3" variant="h5" className="leading-6 font-medium">
          {t("dashboard:activities")}
        </Heading>
      }
      loading={loading}
    >
      {activities && activities.length > 0 && (
        <ul className="-mb-8">
          {activities
            // Sort by date descending
            .sort((a, b) =>
              Date.parse(a.createdAt) < Date.parse(b.createdAt) ? 1 : -1
            )
            .map((activity, index) => (
              <li
                key={`activities-panel-item-${activity.activityCategory}-${activity.createdAt}`}
              >
                <ActivitiesPanelItem
                  activity={activity}
                  last={index === activities.length - 1}
                />
              </li>
            ))}
        </ul>
      )}
      {(!activities || activities.length === 0) && (
        <p className="text-center">{t("common:text.noData")}</p>
      )}
    </Panel>
  );
};

export default ActivitiesPanel;
