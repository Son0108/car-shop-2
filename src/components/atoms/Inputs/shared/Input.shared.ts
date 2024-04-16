import { ReactNode } from "react";

/**
 * Base props definition for all input elements
 */
export interface BaseInputProps {
  /**
   * disabled state of the input
   */
  disabled?: boolean;
  /**
   * id of the input
   */
  id?: string;
  /**
   * content shown inside the label of the input
   */
  label?: ReactNode;
  /**
   * define if the label should only be shown to screen-readers
   */
  labelSrOnly?: boolean;
  /**
   * name attribute of the input
   */
  name: string;
  /**
   * required state of the input
   */
  required?: boolean;
  /**
   * tab-index of the input
   */
  tabIndex?: number;
}

/**
 * BaseInputProps without label
 */
export type BaseInputPropsWithoutLabel = Omit<
  BaseInputProps,
  "label" | "labelSrOnly"
>;
