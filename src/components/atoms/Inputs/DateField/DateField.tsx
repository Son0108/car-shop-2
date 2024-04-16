import { BaseInputProps } from "../shared/Input.shared";
import TextField from "../TextField/TextField";

/**
 * Props definition for the DateField component
 */
export interface DateFieldProps extends BaseInputProps {
  /**
   * Placeholder text shown inside the
   */
  placeholder?: string;
}

/**
 * DateField handels date inputs
 */
const DateField = ({
  disabled,
  id,
  label,
  labelSrOnly,
  name,
  placeholder,
  required,
  tabIndex,
}: DateFieldProps) => (
  <TextField
    disabled={disabled}
    id={id}
    label={label}
    labelSrOnly={labelSrOnly}
    name={name}
    required={required}
    placeholder={placeholder}
    tabIndex={tabIndex}
    type="date"
  />
);

export default DateField;
