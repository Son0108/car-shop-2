import { useField } from "formik";
import clsx from "clsx";
import { useRef } from "react";
import { BaseInputProps } from "../shared/Input.shared";
import HelperText from "../shared/HelperText/HelperText";

/**
 * Field to handle bool values
 */
const SwitchField = ({
  disabled,
  id,
  label,
  name,
  required,
  tabIndex,
}: BaseInputProps) => {
  // ref to the invisible-checkbox
  const checkbox = useRef<HTMLInputElement>(null);
  const [{ value, onBlur, onChange }, meta] = useField(name);

  return (
    <div>
      <div className="flex items-center">
        <button
          id={id}
          tabIndex={tabIndex}
          type="button"
          className={clsx(
            "relative inline-flex flex-shrink-0",
            "h-6 w-11 border-2 border-transparent rounded-full",
            "transition-colors ease-in-out duration-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
            !disabled && "cursor-pointer",
            disabled && "cursor-default",
            value === true && !disabled && "bg-primary-600",
            (value === false || disabled) && "bg-gray-200"
          )}
          disabled={disabled}
          role="switch"
          aria-checked="false"
          onClick={() => {
            // emulate a click on the invisible checkbox
            if (checkbox && checkbox.current) {
              checkbox.current.click();
            }
          }}
        >
          {label && <span className="sr-only">{label}</span>}
          <span
            aria-hidden="true"
            className={clsx(
              "pointer-events-none inline-block h-5 w-5",
              "rounded-full bg-white shadow transform ring-0",
              "transition ease-in-out duration-200",
              value === true && "translate-x-5",
              value === false && "translate-x-0"
            )}
          />
          <input
            ref={checkbox}
            checked={value}
            className="invisible"
            disabled={disabled}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            required={required}
            tabIndex={-1}
            type="checkbox"
          />
        </button>
        {label && (
          <label htmlFor={id} className="ml-4 text-base block text-gray-900">
            {label}
          </label>
        )}
      </div>
      {meta.touched && meta.error && (
        <HelperText id={id} error={Boolean(meta.error)}>
          {meta.error}
        </HelperText>
      )}
    </div>
  );
};

export default SwitchField;
