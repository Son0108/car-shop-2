import { useField } from "formik";
import useTranslation from "next-translate/useTranslation";
import { BaseInputProps } from "../shared/Input.shared";
import FileInput from "../FileFields/FileInput";
import Label from "../shared/Label/Label";
import HelperText from "../shared/HelperText/HelperText";
import DropArea from "../FileFields/DropArea";
import ImageFilePreview from "./ImageFilePreview";
import UploadAreaInput from "../FileFields/UploadAreaInput";
import { IFile } from "../../../../definitions/types/models/File";
import FileUtility from "../../../../utilities/FileUtility";

export interface ImageFieldProps extends BaseInputProps {
  /**
   * Accepted file formats
   */
  acceptedFormats: string | string[];
  /**
   * Maximum allowed file-size
   */
  maximumSize: number;
  /**
   * Object of the currently persisted image
   */
  persistedValue?: IFile;
}

const ImageField = ({
  acceptedFormats,
  disabled,
  id,
  label,
  labelSrOnly,
  maximumSize,
  name,
  required,
  persistedValue,
  tabIndex,
}: ImageFieldProps) => {
  const { t } = useTranslation();
  const [, meta] = useField(name);

  return (
    <div>
      <Label
        content={label}
        htmlFor={id}
        srOnly={labelSrOnly}
        required={required}
      />
      <FileInput name={name}>
        {({ handleChange, handleDrop, preview, value }) => (
          <div className="flex flex-col items-center w-full">
            <DropArea handleDrop={handleDrop}>
              {() => {
                if (preview || persistedValue) {
                  const src =
                    preview ||
                    FileUtility.getImageURL((persistedValue as IFile).name);

                  return (
                    <ImageFilePreview
                      handleChange={handleChange}
                      name={name}
                      required={required}
                      tabIndex={tabIndex}
                      id={id}
                      disabled={disabled}
                      src={src}
                    />
                  );
                }
                if (value && value instanceof File) {
                  return <p>{value.name}</p>;
                }
                return (
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <UploadAreaInput
                      acceptedFormats={acceptedFormats}
                      handleChange={handleChange}
                      maximumSize={maximumSize}
                      translate={t}
                      name={name}
                      type="image"
                      required={required}
                      tabIndex={tabIndex}
                      id={id}
                      disabled={disabled}
                    />
                  </div>
                );
              }}
            </DropArea>
          </div>
        )}
      </FileInput>
      {meta.touched && Boolean(meta.error) && (
        <HelperText error={Boolean(meta.error)}>{meta.error}</HelperText>
      )}
    </div>
  );
};
export default ImageField;
