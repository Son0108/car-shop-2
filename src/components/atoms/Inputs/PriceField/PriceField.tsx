import { ReactText } from "react";
import { BaseInputProps } from "../shared/Input.shared";
import TextField from "../TextField/TextField";

/**
 * Props definition for the PriceField component
 */
export interface PriceFieldProps extends BaseInputProps {
  /**
   * placeHolder shown if no value is set
   */
  placeholder?: string;
  /**
   * leading element in after of the input element
   */
  currency?: ReactText;
}

/**
 * Field to handle price inputs.
 */
const PriceField = ({
  currency,
  disabled,
  id,
  label,
  labelSrOnly,
  name,
  placeholder,
  required,
  tabIndex,
}: PriceFieldProps) => {
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
      trailing={
        currency && <span className="text-gray-500 sm:text-sm">{currency}</span>
      }
    />
  );
};

export default PriceField;
