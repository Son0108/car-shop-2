import { ReactText } from "react";
import clsx from "clsx";
import { Severity } from "../../../definitions/types/Severity";

export type BadgeColor = "gray" | "primary" | Severity;
type BadgeSize = "regular" | "large";

export interface BadgeProps {
  children?: ReactText;
  color?: BadgeColor;
  size?: BadgeSize;
}

const Badge = ({
  children,
  color = "primary",
  size = "regular",
}: BadgeProps) => (
  <span
    className={clsx(
      "inline-flex w-max items-center rounded-full font-medium",
      size === "regular" && "px-2.5 py-0.5 text-xs",
      size === "large" && "px-3 py-0.5 text-sm",
      color === "primary" && "bg-primary-100 text-primary-800",
      color === "gray" && "bg-gray-100 text-gray-800",
      color === "info" && "bg-info-100 text-info-800",
      color === "success" && "bg-success-100 text-success-800",
      color === "warning" && "bg-warning-100 text-warning-800",
      color === "error" && "bg-error-100 text-error-800"
    )}
  >
    {children}
  </span>
);

export default Badge;
