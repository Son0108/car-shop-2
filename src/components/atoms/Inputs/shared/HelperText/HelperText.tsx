import { ReactNode } from "react";
import clsx from "clsx";

export interface IHelperTextProps {
  /**
   * content of the helper-text
   */
  children?: ReactNode;
  /**
   * is the helper-text showing an error message
   */
  error?: boolean;
  /**
   * id of the element to which the helper-text belongs
   */
  id?: string;
}

const HelperText = ({ children, error, id }: IHelperTextProps) => (
  <p
    id={id && `${id}-${error ? "error" : "description"}`}
    className={clsx("mt-2 text-sm", error ? "text-error-600" : "text-gray-500")}
  >
    {children}
  </p>
);

export default HelperText;
