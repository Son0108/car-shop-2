import clsx from "clsx";
import { FocusEventHandler, ReactNode } from "react";
import { useField } from "formik";
import { BaseInputProps } from "../shared/Input.shared";
import HelperText from "../shared/HelperText/HelperText";
import Label from "../shared/Label/Label";

/**
 * Props definition of the TextField
 */
export interface TextFieldProps extends BaseInputProps {
  /**
   * auto-complete attribute of the input field.
   */
  autoComplete?: string;
  /**
   * placeHolder shown if no value is set
   */
  placeholder?: string;
  /**
   * dropdown element in front of the input element
   */
  dropdown?: ReactNode;
  /**
   * leading element in before of the input element
   */
  leading?: ReactNode;
  /**
   * focusEvent handler
   * @event FocusEvent
   */
  onFocus?: FocusEventHandler;
  /**
   * leading element in after of the input element
   */
  trailing?: ReactNode;
  /**
   * available input types for the component
   */
  type?: "text" | "email" | "password" | "url" | "tel" | "date" | "number";

  onChange?: any;

  additionalStyle?: string;
}

const TextField = ({
  autoComplete,
  disabled,
  dropdown,
  id,
  label,
  labelSrOnly,
  leading,
  name,
  onFocus,
  onChange,
  placeholder,
  required,
  tabIndex,
  trailing,
  type = "text",
  additionalStyle,
}: TextFieldProps) => {
  const [field, meta] = useField(name);

  return (
    <div className={`w-full ${additionalStyle}`}>
      {label && (
        <Label
          srOnly={labelSrOnly}
          htmlFor={id}
          content={label}
          required={required}
        />
      )}
      <div className="mt-1 relative shadow-sm">
        {dropdown && (
          <div className="absolute inset-y-0 left-0 flex items-center">
            {dropdown}
          </div>
        )}
        {leading && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            {leading}
          </div>
        )}
        {trailing && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {trailing}
          </div>
        )}
        <input
          autoComplete={autoComplete}
          className={clsx(
            "block w-full sm:leading-8 px-3 py-1 border rounded-md",
            "border-gray-300 placeholder-gray-300",
            "focus:outline-none focus:ring-primary-500 focus:border-primary-500",
            meta.touched &&
              Boolean(meta.error) &&
              "border-error-300 text-error-900 placeholder-error-300",
            dropdown && "pl-24",
            leading && "pl-16",
            trailing && "pr-16",
            disabled && "text-gray-500 bg-gray-50"
          )}
          disabled={disabled}
          id={id}
          name={name}
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
          onFocus={onFocus}
          placeholder={placeholder}
          required={required}
          tabIndex={tabIndex}
          type={type}
          value={field.value}
        />
      </div>
      {meta.touched && meta.error && (
        <HelperText id={id} error={Boolean(meta.error)}>
          {meta.error}
        </HelperText>
      )}
    </div>
  );
};

export default TextField;
