import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { UserFullyDressed } from "../../../definitions/types/models/User";
import Heading from "../../atoms/Heading/Heading";
import Panel from "../../atoms/Panel/Panel";
import { DEFAULT_AVATAR } from "../../../config/constants/placeholders";
import { Application } from "../../../definitions/types/models/Application";

export interface IProfileOverviewPanelProps {
  src?: string;
  user: UserFullyDressed;
  applications?: Application[];
}

const WelcomeUserPanel = ({
  src = DEFAULT_AVATAR,
  user,
  applications,
}: IProfileOverviewPanelProps) => {
  const { t } = useTranslation();
  return (
    <Panel noPadding>
      <h2 className="sr-only" id="profile-overview-title">
        {t("dashboard:profileOverview")}
      </h2>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-grow justify-center sm:justify-start p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                <div className="mx-auto h-28 w-28 rounded-full overflow-hidden">
                  <Image
                    className="object-cover"
                    src={src}
                    height={200}
                    width={200}
                    unoptimized
                  />
                </div>
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-2xl font-medium text-primary-600">
                  {` ${t("dashboard:welcomeBack")}`}
                </p>
                <Heading as="h2" variant="h3">
                  {user.firstName} {user.lastName}
                </Heading>
              </div>
            </div>
          </div>
        </div>
        {applications && (
          <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
            <div className="px-6 py-5 text-sm font-medium text-center">
              <span className="text-gray-900">
                {applications.reduce((value, application) => {
                  if (
                    application.status.value === "OPEN" ||
                    application.status.value === "ON_HOLD"
                  ) {
                    return value + 1;
                  }
                  return value;
                }, 0)}
              </span>
              <span className="text-gray-600">
                {` ${t("dashboard:pendingApplications")}`}
              </span>
            </div>

            <div className="px-6 py-5 text-sm font-medium text-center">
              <span className="text-gray-900">
                {applications.reduce((value, application) => {
                  if (application.status.value === "DECLINED") {
                    return value + 1;
                  }
                  return value;
                }, 0)}
              </span>
              <span className="text-gray-600">
                {` ${t("dashboard:declinedApplications")}`}
              </span>
            </div>
          </div>
        )}
      </div>
    </Panel>
  );
};

export default WelcomeUserPanel;
