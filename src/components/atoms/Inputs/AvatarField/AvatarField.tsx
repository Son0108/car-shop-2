import Image from "next/image";
import { useField } from "formik";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import clsx from "clsx";
import { BaseInputProps } from "../shared/Input.shared";
import Label from "../shared/Label/Label";
import Button from "../../Button/Button";
import HelperText from "../shared/HelperText/HelperText";

const acceptedFileTypes = "image/png,image/jpg,image/jpeg";

/**
 * Props definition of the AvatarField component
 */
export interface AvatarFieldProps extends BaseInputProps {
  /**
   * src of the image shown as a placeholder before a preview of the
   * input-file is shown.
   */
  src: string;
}

/**
 * The AvatarField component takes a single file input and shows a preview
 * of the given image in from of a rounded avatar.
 */
const AvatarField = ({
  disabled,
  id,
  label,
  labelSrOnly,
  name,
  required,
  src,
  tabIndex,
}: AvatarFieldProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const [field, meta, helper] = useField<File>(name);
  const [previewURL, setPreviewURL] = useState<string | undefined>();

  useEffect(() => {
    let url: string | undefined;

    // If the field value is a file create an URLObject
    if (field.value && field.value instanceof File) {
      url = URL.createObjectURL(field.value);
      setPreviewURL(url);
    }

    return () => {
      setPreviewURL(undefined);
      if (url) URL.revokeObjectURL(url);
    };
  }, [field.value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Ignore the onChange event if no files are attached
    if (!e.target.files || e.target.files.length === 0) return;

    // Set the file as the new value
    helper.setValue(e.target.files[0]);

    // Set touched value of the element without validation
    // since setValue already validates it
    if (!meta.touched) helper.setTouched(true, false);
  };

  return (
    <div className="flex flex-col h-full">
      <Label
        content={label}
        htmlFor={id}
        required={required}
        srOnly={labelSrOnly}
      />
      <div className="flex flex-row space-x-5 justify-center items-center mt-1 h-full">
        <div className="block relative rounded-full overflow-hidden w-32 lg:w-48 h-32 lg:h-48">
          <Image
            className="relative w-full h-full object-cover"
            src={previewURL || src}
            alt=""
            unoptimized
            width={200}
            height={200}
          />
          <label
            htmlFor={id}
            className={clsx(
              "absolute inset-0 w-full h-full",
              "flex items-center justify-center text-sm font-medium text-white",
              "bg-black bg-opacity-75 opacity-0 hover:opacity-100 focus-within:opacity-100"
            )}
          >
            <span className="hidden lg:block">{t("forms:actions.change")}</span>
            <input
              accept={acceptedFileTypes}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
              disabled={disabled}
              id={id}
              name={name}
              onChange={handleChange}
              ref={ref}
              required={required}
              tabIndex={tabIndex}
              type="file"
            />
          </label>
        </div>
        <div className="block lg:hidden">
          <Button
            color="white"
            disabled={disabled}
            variant="contained"
            onClick={() => ref.current && ref.current.click()}
          >
            {t("forms:actions.change")}
          </Button>
        </div>
      </div>
      {meta.touched && Boolean(meta.error) && (
        <HelperText error={Boolean(meta.error)}>{meta.error}</HelperText>
      )}
    </div>
  );
};

export default AvatarField;
