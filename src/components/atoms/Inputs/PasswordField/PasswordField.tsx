import { FocusEvent, useMemo, useState } from "react";
import { useField } from "formik";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { BaseInputProps } from "../shared/Input.shared";
import TextField from "../TextField/TextField";
import IconButton from "../../Button/IconButton/IconButton";
import PasswordCriteria, { IPasswordCriteria } from "./PasswordCriteria";

export const PASSWORD_REGEX =
  /^(?=(.*[A-Z])+)(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-_+.])+).{8,}$/;

/**
 * Props definition for the PasswordField component
 */
export interface PasswordFieldProps extends BaseInputProps {
  /**
   * auto-complete attribute of the input field.
   */
  autoComplete?: string;
  /**
   * placeHolder shown if no value is set
   */
  placeholder?: string;
  /**
   * criteria required by the entered password
   */
  criteria?: IPasswordCriteria[];
}

/**
 * Field to handle password inputs
 */
const PasswordField = ({
  autoComplete,
  criteria,
  disabled,
  id,
  label,
  labelSrOnly,
  name,
  placeholder,
  required,
  tabIndex,
}: PasswordFieldProps) => {
  const [field] = useField(name);
  const [showPassword, setShowPassword] = useState(false);
  const [showCriteria, setShowCriteria] = useState(false);

  // Show passwort after initial input focus
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const focusEventHandler = (_: FocusEvent<Element>) => {
    setShowCriteria(true);
  };

  const iconButton = useMemo(
    () => (
      <IconButton
        aria-label="toggle password visibility"
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        tabIndex={-1}
      >
        <div className="h-5 w-5 text-gray-500">
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </div>
      </IconButton>
    ),
    [showPassword]
  );

  return (
    <div className="flex flex-col space-y-2">
      <TextField
        autoComplete={autoComplete}
        id={id}
        disabled={disabled}
        label={label}
        labelSrOnly={labelSrOnly}
        name={name}
        onFocus={focusEventHandler}
        placeholder={placeholder}
        required={required}
        tabIndex={tabIndex}
        trailing={iconButton}
        type={showPassword ? "text" : "password"}
      />
      <div className="flex flex-col px-2">
        {criteria &&
          showCriteria &&
          criteria.map((c) => (
            <PasswordCriteria
              key={`${name}-criteria-${c.message}`}
              message={c.message}
              matches={c.regex.test(field.value)}
            />
          ))}
      </div>
    </div>
  );
};

export default PasswordField;
