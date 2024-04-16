import { ReactNode, useMemo } from "react";
import clsx from "clsx";
import {
  CheckCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
  XCircleIcon,
  XIcon,
} from "@heroicons/react/solid";
import useTranslation from "next-translate/useTranslation";
import { Severity } from "../../../definitions/types/Severity";

/**
 * Property definition for the Alert component
 */
export interface AlertProps {
  actions?: {
    text: string;
    onClick?: () => void;
  }[];
  children?: ReactNode;
  handleClose?: () => void;
  title?: string;
  severity?: Severity;
}

/**
 * Show an alert-message inside a accordingly colored box
 */
const Alert = ({
  actions,
  children,
  handleClose,
  severity = "info",
  title,
}: AlertProps) => {
  const { t } = useTranslation();

  const icon = useMemo(() => {
    switch (severity) {
      case "success":
        return <CheckCircleIcon className="text-success-500" />;
      case "warning":
        return <ExclamationIcon className="text-warning-500" />;
      case "error":
        return <XCircleIcon className="text-error-500" />;
      default:
        return <InformationCircleIcon className="text-info-500" />;
    }
  }, [severity]);

  return (
    <div
      className={clsx(
        "rounded-md p-4",
        severity === "info" && "bg-info-50",
        severity === "success" && "bg-success-50",
        severity === "warning" && "bg-warning-50",
        severity === "error" && "bg-error-50"
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0 h-5 w-5">{icon}</div>
        <div className="ml-3">
          {title && (
            <h3
              className={clsx(
                "text-sm font-medium",
                severity === "info" && "text-info-800",
                severity === "success" && "text-success-800",
                severity === "warning" && "text-warning-800",
                severity === "error" && "text-error-800"
              )}
            >
              {title}
            </h3>
          )}
          {children && (
            <div
              className={clsx(
                "text-sm",
                title && "mt-2",
                severity === "info" && "text-info-700",
                severity === "success" && "text-success-700",
                severity === "warning" && "text-warning-700",
                severity === "error" && "text-error-700"
              )}
            >
              {children}
            </div>
          )}
          {actions && (
            <div className="mt-4">
              <div className="-mx-2 -my-1.5 flex space-x-3">
                {actions.map((action) => (
                  <button
                    className={clsx(
                      "px-2 py-1.5 rounded-md text-sm font-medium",
                      "focus:outline-none focus:ring-2 focus: ring-offset-2",
                      severity === "info" &&
                        "text-info-800 hover:bg-info-100 focus:ring-offset-info-50 focus:ring-info-600",
                      severity === "success" &&
                        "text-success-800 hover:bg-success-100 focus:ring-offset-success-50 focus:ring-success-600",
                      severity === "warning" &&
                        "text-warning-800 hover:bg-warning-100 focus:ring-offset-warning-50 focus:ring-warning-600",
                      severity === "error" &&
                        "text-error-800 hover:bg-error-100 focus:ring-offset-error-50 focus:ring-error-600"
                    )}
                    key={`actions-${action.text}`}
                    onClick={action.onClick}
                  >
                    {action.text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        {handleClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                className={clsx(
                  "inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2",
                  severity === "info" &&
                    "text-info-500 hover:bg-info-100 focus:ring-offset-info-50 focus:ring-info-600",
                  severity === "success" &&
                    "text-success-500 hover:bg-success-100 focus:ring-offset-success-50 focus:ring-success-600",
                  severity === "warning" &&
                    "text-warning-500 hover:bg-warning-100 focus:ring-offset-warning-50 focus:ring-warning-600",
                  severity === "error" &&
                    "text-error-500 hover:bg-error-100 focus:ring-offset-error-50 focus:ring-error-600"
                )}
              >
                <span className="sr-only">{t("common:actions.close")}</span>
                <div className="h-5 w-5">
                  <XIcon />
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;
