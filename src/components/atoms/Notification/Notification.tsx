import { MouseEventHandler, useMemo } from "react";
import clsx from "clsx";
import {
  CheckCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import useTranslation from "next-translate/useTranslation";
import IconButton from "../Button/IconButton/IconButton";
import { Severity } from "../../../definitions/types/Severity";

export interface NotificationProps {
  /**
   * Title of the notification
   */
  title: string;
  /**
   * message to be shown inside the notification
   */
  message?: string;
  /**
   * severity of the notification
   */
  severity?: Severity;
  /**
   * close handler for the notification
   */
  handleClose?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * Show a responsive notification styled for a specific severity and allow
 * and optional close-handler to be passed.
 */
const Notification = ({
  handleClose,
  message,
  severity,
  title,
}: NotificationProps) => {
  const { t } = useTranslation();

  const icon = useMemo(() => {
    switch (severity) {
      case "info":
        return <InformationCircleIcon />;
      case "success":
        return <CheckCircleIcon />;
      case "warning":
        return <ExclamationIcon />;
      case "error":
        return <XCircleIcon />;
      default:
        return null;
    }
  }, [severity]);

  return (
    <div className="flex items-end justify-center pointer-events-none sm:items-start sm:justify-end">
      <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div className="p-4">
          <div className="flex items-start">
            {severity && (
              <div
                className={clsx(
                  "flex-shrink-0 h-6 w-6",
                  severity === "info" && "text-info-400",
                  severity === "success" && "text-success-400",
                  severity === "warning" && "text-warning-400",
                  severity === "error" && "text-error-400"
                )}
              >
                {icon}
              </div>
            )}
            <div className="ml-3 flex-1 pt-0.5">
              {title && (
                <p className="text-sm font-medium text-gray-900">{title}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">{message}</p>
            </div>
            {handleClose && (
              <div className="ml-4 flex-shrink-0 flex text-gray-400 hover:text-gray-500">
                <IconButton onClick={handleClose}>
                  <span className="sr-only">{t("common:actions.close")}</span>
                  <div className="block h-5 w-5">
                    <XIcon />
                  </div>
                </IconButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
