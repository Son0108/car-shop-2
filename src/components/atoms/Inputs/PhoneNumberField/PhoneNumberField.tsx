import { useField } from "formik";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import LibPhoneNumber, { PhoneNumberFormat } from "google-libphonenumber";
import clsx from "clsx";
import { BaseInputProps } from "../shared/Input.shared";
import Label from "../shared/Label/Label";
import { getCountryCodeSelectOptions } from "../../../../utilities/PhoneNumberUtility";
import HelperText from "../shared/HelperText/HelperText";

const countryCodes = getCountryCodeSelectOptions();
const util = LibPhoneNumber.PhoneNumberUtil.getInstance();

/**
 * Props definition for the PhoneNumberField
 */
export interface PhoneNumberFieldProps extends BaseInputProps {
  placeholder?: string;
}

/**
 * Field to handle phone-number inputs
 */
const PhoneNumberField = ({
  disabled,
  id,
  label,
  labelSrOnly,
  name,
  placeholder,
  required,
  tabIndex,
}: PhoneNumberFieldProps) => {
  const [, meta] = useField(name);
  const [numberField, phoneNumberMeta] = useField(`${name}.phoneNumber`);
  const [countryCodeField, countryCodeMeta] = useField(`${name}.countryCode`);
  const [displayNumber, setDisplayNumber] = useState("");

  /**
   * when ever the phoneNumber or the countryCode change, update the value that is to be displayed.
   * If the number and countryCode can be formatted to an internationalized number format,
   * the value is displayed in that format.
   */
  useEffect(() => {
    try {
      const region = util.getRegionCodeForCountryCode(countryCodeField.value);
      const number = util.parse(numberField.value, region);
      setDisplayNumber(util.format(number, PhoneNumberFormat.INTERNATIONAL));
    } catch (err) {
      setDisplayNumber(numberField.value);
    }
  }, [numberField.value, countryCodeField.value]);

  /**
   * handle the onChange event of the number input. If a countryCode is given,
   * @param event
   */
  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const number = util.parse(event.target.value);
      // If the country code of the target value differs from the value in the
      // countryCode select also fire an onChange event on that value
      if (number.getCountryCode() !== parseInt(countryCodeField.value, 10)) {
        countryCodeField.onChange({
          target: {
            name: countryCodeField.name,
            value: number.getCountryCode(),
          },
        });
      }
      numberField.onChange({
        target: {
          name: numberField.name,
          value: number.getNationalNumber(),
        },
      });
    } catch (e) {
      console.debug(e);
      numberField.onChange(event);
    }
  };

  const showError = useMemo(() => {
    return meta.error && (phoneNumberMeta.touched || countryCodeMeta.touched);
  }, [meta.error, phoneNumberMeta.touched, countryCodeMeta.touched]);

  return (
    <div>
      {label && (
        <Label
          srOnly={labelSrOnly}
          htmlFor={id}
          content={label}
          required={required}
        />
      )}
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 flex items-center">
          <label
            htmlFor={id ? `${id}.countryCode` : undefined}
            className="sr-only"
          >
            Country
          </label>
          <select
            id={id ? `${id}.countryCode` : undefined}
            name={countryCodeField.name}
            value={countryCodeField.value}
            onBlur={countryCodeField.onBlur}
            onChange={countryCodeField.onChange}
            disabled={disabled}
            required={required}
            tabIndex={tabIndex ? tabIndex + 1 : -1}
            className={clsx(
              "h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 rounded-md",
              "focus:ring-primary-500 focus:border-primary-500"
            )}
          >
            {countryCodes.map((option) => (
              <option
                value={option.value}
                key={`option-${option.value}-${option.label}`}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <input
          id={id && `${id}.phoneNumber`}
          type="text"
          name={`${name}.phoneNumber`}
          value={displayNumber}
          onBlur={numberField.onBlur}
          onChange={handleNumberChange}
          disabled={disabled}
          required={required}
          className={clsx(
            "block w-full pl-16 border-gray-300 rounded-md",
            "focus:ring-primary-500 focus:border-primary-500",
            showError &&
              "border-error-300 text-error-900 placeholder-error-300",
            disabled && "text-gray-500 bg-gray-50"
          )}
          placeholder={placeholder}
          tabIndex={tabIndex}
        />
      </div>
      {showError && <HelperText error>{meta.error}</HelperText>}
    </div>
  );
};

export default PhoneNumberField;
