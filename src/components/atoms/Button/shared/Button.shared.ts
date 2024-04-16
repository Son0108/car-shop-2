import { MouseEventHandler, ReactNode } from "react";

export type ButtonColor = "primary" | "accent" | "white" | "black" | "gray";

export type ButtonVariant = "contained" | "text";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

// Props shared by all button components
export interface BaseButtonProps {
  /**
   * ariaLabel is a string that explains the purpose of the button.
   * This is not needed when the Button contains text doing the same.
   */
  ariaLabel?: string;
  /**
   * elements that are rendered inside the button
   */
  children?: ReactNode;
  /**
   * disabled state of the button
   */
  disabled?: boolean;
  /**
   * id of the button element
   */
  id?: string;
  /**
   * onclick handler of the button
   * @param e event parameter
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * tabIndex of the button
   */
  tabIndex?: number;
  /**
   * type value of the button
   */
  type?: "button" | "submit" | "reset";
}
