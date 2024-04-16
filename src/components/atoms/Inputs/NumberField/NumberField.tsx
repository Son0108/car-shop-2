import { ReactText } from "react";
import { BaseInputProps } from "../shared/Input.shared";
import TextField from "../TextField/TextField";

/**
 * Props Definition for the NumberField component
 */
export interface NumberFieldProps extends BaseInputProps {
  /**
   * placeHolder shown if no value is set
   */
  placeholder?: string;
  /**
   * leading element in after of the input element
   */
  unit?: ReactText;
}

/**
 * Field to handle the input of numeric values
 */
const NumberField = ({
  disabled,
  id,
  label,
  labelSrOnly,
  name,
  placeholder,
  required,
  tabIndex,
  unit,
}: NumberFieldProps) => {
  return (
    <TextField
      disabled={disabled}
      id={id}
      label={label}
      labelSrOnly={labelSrOnly}
      name={name}
      placeholder={placeholder}
      required={required}
      tabIndex={tabIndex}
      type="number"
      trailing={
        unit && <span className="text-gray-500 sm:text-sm">{unit}</span>
      }
    />
  );
};

export default NumberField;
