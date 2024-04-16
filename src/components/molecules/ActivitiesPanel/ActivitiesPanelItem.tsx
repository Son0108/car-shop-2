import { useMemo } from "react";
import { UserIcon } from "@heroicons/react/solid";
import { Activity } from "../../../definitions/types/models/Activity";

export interface ActivitiesPanelItemProps {
  activity: Activity;
  last?: boolean;
}

const ActivitiesPanelItem = ({ activity, last }: ActivitiesPanelItemProps) => {
  const date = useMemo(() => {
    const dateObject = new Date(Date.parse(activity.createdAt));
    return dateObject.toLocaleDateString(navigator.language);
  }, [activity.createdAt]);

  return (
    <div className="relative pb-8 w-full">
      {!last && (
        <span
          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
          aria-hidden="true"
        />
      )}
      <div className="relative flex space-x-3">
        <div className="flex items-center">
          <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
            <div className="h-5 w-5 text-white">
              <UserIcon />
            </div>
          </span>
        </div>
        <div className="min-w-0 flex-1 pt-1.5 flex justify-between items-center space-x-4">
          <div className="-pt-1.5">
            <p className="text-sm text-gray-500">{activity.activityString}</p>
          </div>
          <div className="text-right text-sm whitespace-nowrap text-gray-500">
            <time dateTime={activity.createdAt}>{date}</time>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesPanelItem;
