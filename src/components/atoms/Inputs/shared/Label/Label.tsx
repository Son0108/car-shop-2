import { ReactNode } from "react";
import clsx from "clsx";

/**
 * Props definition for the Label component
 */
export interface LabelProps {
  /**
   * reference to the id of the associated input field
   */
  htmlFor?: string;
  /**
   * if the referenced input field is required
   */
  required?: boolean;
  /**
   * content of the label
   */
  content: ReactNode;
  /**
   * define if the label should only be accessible to screen readers
   */
  srOnly?: boolean;
}

/**
 * Render a Label for an input-field
 */
const Label = ({ content, htmlFor, required, srOnly }: LabelProps) => (
  <label
    htmlFor={htmlFor}
    className={clsx(
      "block text-base font-medium text-gray-700",
      srOnly && "sr-only"
    )}
  >
    {content}
    {required && "*"}
  </label>
);

export default Label;
