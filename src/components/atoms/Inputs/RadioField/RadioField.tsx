import { useField } from "formik";
import clsx from "clsx";
import { RadioGroup as HUIRadioGroup } from "@headlessui/react";
import { BaseInputProps } from "../shared/Input.shared";
import HelperText from "../shared/HelperText/HelperText";

export interface IRadioOption {
  /**
   * name of the option
   */
  name: string;
  /**
   * description of the option
   */
  description?: string;
  /**
   * value of the option
   */
  value: string;
}

export interface IRadioGroupProps {
  /**
   * radio-group options
   */
  options: IRadioOption[];
}

/**
 * RadioGroup that shows a clickable tuple of options
 */
const RadioField = ({
  disabled,
  id,
  label,
  name,
  options,
  tabIndex,
}: IRadioGroupProps & BaseInputProps) => {
  const [field, meta, helper] = useField(name);

  const handleChange = (e: string) => {
    helper.setValue(e);
  };

  return (
    <div>
      <HUIRadioGroup
        id={id}
        disabled={disabled}
        tabIndex={tabIndex}
        value={field.value}
        onChange={handleChange}
      >
        <HUIRadioGroup.Label className="sr-only">{label}</HUIRadioGroup.Label>
        <div className="bg-white rounded-md -space-y-px">
          {options.map((setting, settingIdx) => (
            <HUIRadioGroup.Option
              key={setting.name}
              value={setting.value}
              className={({ checked }) =>
                clsx(
                  settingIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                  settingIdx === options.length - 1
                    ? "rounded-bl-md rounded-br-md"
                    : "",
                  checked
                    ? "bg-primary-50 border-primary-200 z-10"
                    : "border-gray-200",
                  "relative border p-4 flex cursor-pointer focus:outline-none"
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <span
                    className={clsx(
                      checked
                        ? "bg-primary-600 border-transparent"
                        : "bg-white border-gray-300",
                      active ? "ring-2 ring-offset-2 ring-primary-500" : "",
                      "h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center"
                    )}
                    aria-hidden="true"
                  >
                    <span className="rounded-full bg-white w-1.5 h-1.5" />
                  </span>
                  <div className="ml-3 flex flex-col">
                    <HUIRadioGroup.Label
                      as="span"
                      className={clsx(
                        checked ? "text-primary-900" : "text-gray-900",
                        "block text-sm font-medium"
                      )}
                    >
                      {setting.name}
                    </HUIRadioGroup.Label>
                    <HUIRadioGroup.Description
                      as="span"
                      className={clsx(
                        checked ? "text-primary-700" : "text-gray-500",
                        "block text-sm"
                      )}
                    >
                      {setting.description}
                    </HUIRadioGroup.Description>
                  </div>
                </>
              )}
            </HUIRadioGroup.Option>
          ))}
        </div>
      </HUIRadioGroup>
      {meta.error && <HelperText error>{meta.error}</HelperText>}
    </div>
  );
};

export default RadioField;
