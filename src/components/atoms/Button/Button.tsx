import clsx from "clsx";
import {
  BaseButtonProps,
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from "./shared/Button.shared";
import { Severity } from "../../../definitions/types/Severity";

export interface ButtonProps extends BaseButtonProps {
  /**
   * define the color of the button
   */
  color?: ButtonColor | Severity;
  /**
   * define if the button should span the available width
   */
  fill?: boolean;
  /**
   * loading state of the button.
   * If true it disables the button and shows a spinner
   */
  loading?: boolean;
  /**
   * define the size of the button
   */
  size?: ButtonSize;
  /**
   * define the visual-variant of the button
   */
  variant?: ButtonVariant;

  additionalStyling?: string;
}

/**
 * Reusable button component to render contained- and text-buttons.
 */
const Button = ({
  ariaLabel,
  additionalStyling,
  children,
  variant = "contained",
  color = variant === "contained" ? "primary" : "black",
  size = variant === "contained" ? "lg" : "md",
  disabled,
  fill = false,
  id,
  loading,
  onClick,
  tabIndex,
  type = "button",
}: ButtonProps) => (
  <button
    aria-label={ariaLabel}
    className={clsx(
      // "contained" variant styling
      "inline-flex justify-center items-center",
      variant === "contained" &&
        clsx(
          "border text-base font-medium shadow-sm ",
          additionalStyling,
          !disabled && "focus:outline-none focus:ring-2 focus:ring-offset-2",
          // Style depending on button size
          size === "xl" && "text-base px-6 py-3 rounded-md",
          size === "lg" && "text-base px-4 py-2 rounded-md",
          size === "md" && "text-sm px-4 py-2 rounded-md",
          size === "sm" && "text-sm px-3 py-2 rounded-md",
          size === "xs" && "text-xs px-2.5 py-1.5 rounded",
          color === "primary" &&
            "text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-500",
          color === "accent" &&
            "text-white bg-accent-600 hover:bg-accent-700 focus:ring-accent-500",
          color === "white" &&
            "text-gray-700 border-gray-300 bg-white hover:bg-gray-50 focus:ring-primary-500",
          color !== "white" && "border-transparent",
          color === "black" &&
            "text-white bg-gray-600 hover:bg-gray-700 focus:ring-gray-500",
          color === "info" &&
            "text-white bg-info-600 hover:bg-info-700 focus:ring-info-500",
          color === "success" &&
            "text-white bg-success-600 hover:bg-success-700 focus:ring-success-499",
          color === "warning" &&
            "text-white bg-warning-600 hover:bg-warning-700 focus:ring-warning-500",
          color === "error" &&
            "text-white bg-error-600 hover:bg-error-700 focus:ring-error-500"
        ),
      // "text" variant styling
      variant === "text" &&
        clsx(
          "font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2",
          additionalStyling,
          // Style depending on size
          size === "md" && "text-base",
          size === "xs" && "text-xs",
          size === "sm" && "text-sm",
          size === "lg" && "text-lg",
          size === "xl" && "text-xl",
          color === "primary" &&
            "text-primary-600 hover:text-primary-500 focus:ring-primary-500",
          color === "accent" &&
            "text-accent-600  hover:text-accent-500 focus:ring-accent-500",
          color === "white" &&
            "text-white hover:text-gray-50 focus:ring-gray-50",
          color === "black" &&
            "text-gray-900 hover:text-gray-800 focus:ring-gray-800",
          color === "gray" &&
            "text-gray-600 hover:text-gray-500 focus:ring-gray-500",
          color === "info" &&
            "text-info-600 hover:text-info-500 focus:ring-info-500",
          color === "success" &&
            "text-success-600 hover:text-success-500 focus:ring-success-500",
          color === "warning" &&
            "text-warning-600 hover:text-warning-500 focus:ring-warning-500",
          color === "error" &&
            "text-error-600 hover:text-error-500 focus:ring-error-500"
        ),
      fill && "w-full",
      // disabled && Styles.disabled
      (disabled || loading) && "opacity-50 cursor-not-allowed"
    )}
    disabled={disabled || loading}
    id={id}
    onClick={onClick}
    tabIndex={tabIndex}
    type={type}
  >
    {loading && (
      <svg
        className={clsx(
          "animate-spin -ml-1 mr-3",
          (size === "sm" || size === "xs") && "h-3 w-3",
          (size === "md" || size === "lg" || size === "xl") && "h-5 w-5"
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    )}
    {children}
  </button>
);

export default Button;
