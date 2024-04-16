import clsx from "clsx";
import { useField } from "formik";
import { BaseInputProps } from "../shared/Input.shared";
import HelperText from "../shared/HelperText/HelperText";

/**
 * Checkbox component to display bool-values inside forms.
 */
const Checkbox = ({
  disabled,
  id,
  label,
  name,
  required,
  tabIndex,
}: BaseInputProps) => {
  const [field, meta] = useField(name);

  return (
    <div>
      <div className="flex items-center w-full">
        <input
          checked={field.value}
          className={clsx(
            "h-4 w-4 text-primary-600 border-primary-300 rounded",
            "focus:text-primary-600 focus:ring-primary-500",
            disabled && "text-gray-500 cursor-default",
            disabled && "focus:text-gray-500 focus:ring-transparent"
          )}
          disabled={disabled}
          id={id}
          name={name}
          onBlur={field.onBlur}
          onChange={field.onChange}
          required={required}
          tabIndex={tabIndex}
          type="checkbox"
        />
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

export default Checkbox;
