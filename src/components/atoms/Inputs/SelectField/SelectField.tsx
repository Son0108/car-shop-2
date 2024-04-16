import { useField } from "formik";
import clsx from "clsx";
import { BaseInputProps } from "../shared/Input.shared";
import HelperText from "../shared/HelperText/HelperText";
import Label from "../shared/Label/Label";

/**
 * Object that holds an option
 */
export interface SelectOption {
  /**
   * value of the item
   */
  value: string;
  /**
   * label which is shown for the item
   */
  label: string;
}

/**
 * Props definition for the SelectField component
 */
export interface SelectProps extends BaseInputProps {
  /**
   * transparent borders for the select element
   */
  borderTransparent?: boolean;
  /**
   * available options in the select input
   */
  options?: SelectOption[];
  /**
   * placeholder text that is shown when no value is selected
   */
  placeholder?: string;
  /**
   * Size of the text inside the select input
   */
  size?: "xs" | "sm" | "md" | "lg";

  onChange?: any;
}

/**
 * Offer a selection of values from which one can be picked.
 */
const SelectField = ({
  borderTransparent,
  disabled,
  id,
  label,
  labelSrOnly,
  name,
  options = [],
  placeholder,
  required,
  tabIndex,
  size = "md",
  onChange,
}: SelectProps) => {
  const [field, meta] = useField(name);

  return (
    <div>
      {label && (
        <Label
          srOnly={labelSrOnly}
          content={label}
          required={required}
          htmlFor={id}
        />
      )}
      <select
        key={`select-${field.name}`}
        disabled={disabled}
        id={id}
        name={name}
        className={clsx(
          "block w-full pl-3 pr-10 py-2 rounded-md border-gray-300",
          "focus:outline-none focus:ring-primary-500 focus:border-primary-500 mt-1",
          borderTransparent && "border-transparent bg-transparent",
          disabled && "text-gray-500 bg-gray-50",
          size === "xs" && "text-xs",
          size === "sm" && "text-sm",
          size === "md" && "text-base",
          size === "lg" && "text-lg"
        )}
        value={field.value}
        onBlur={field.onBlur}
        onChange={(e) => {
          field.onChange(e);
          if (onChange) {
            onChange({
              name: e.target.name,
              value: e.target.value,
            });
          }
        }}
        required={required}
        tabIndex={tabIndex}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((selectOption: SelectOption) => (
          <option
            key={`option-${selectOption.value}`}
            label={selectOption.label}
            value={selectOption.value}
          >
            {selectOption.label}
          </option>
        ))}
      </select>
      {meta.touched && Boolean(meta.error) && (
        <HelperText id={id} error={Boolean(meta.error)}>
          {meta.error}
        </HelperText>
      )}
    </div>
  );
};

export default SelectField;
