import clsx from "clsx";
import { BaseButtonProps, ButtonColor } from "../shared/Button.shared";

export interface IconButtonProps extends BaseButtonProps {
  color?: ButtonColor;
  variant?: "rounded";
}

const IconButton = ({
  ariaLabel,
  children,
  color = "white",
  disabled,
  id,
  onClick,
  tabIndex,
  type = "button",
  variant,
}: IconButtonProps) => (
  <button
    aria-label={ariaLabel}
    className={clsx(
      "focus:outline-none",
      variant === "rounded" && "rounded-full p-2 shadow-md hover:shadow",
      color === "primary" && "bg-primary-500 text-white",
      color === "accent" && "bg-accent-500 text-white",
      color === "black" && "bg-gray-900 text-white",
      color === "white" && "bg-white text-gray-900"
    )}
    disabled={disabled}
    id={id}
    onClick={onClick}
    tabIndex={tabIndex}
    type={type}
  >
    {children}
  </button>
);

export default IconButton;
