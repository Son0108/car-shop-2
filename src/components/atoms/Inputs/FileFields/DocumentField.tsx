import { useField } from "formik";
import useTranslation from "next-translate/useTranslation";
import clsx from "clsx";
import { BaseInputProps } from "../shared/Input.shared";
import Label from "../shared/Label/Label";
import FileInput from "./FileInput";
import HelperText from "../shared/HelperText/HelperText";
import UploadAreaInput from "./UploadAreaInput";
import DropArea from "./DropArea";
import { IFile } from "../../../../definitions/types/models/File";

export interface DocumentFieldProps extends BaseInputProps {
  /**
   * Accepted file formats
   */
  acceptedFormats: string | string[];
  /**
   * Maximum allowed file-size
   */
  maximumSize: number;
  /**
   * The currently persisted file
   */
  persistedValue?: IFile;
}

const DocumentField = ({
  acceptedFormats,
  disabled,
  id,
  label,
  labelSrOnly,
  maximumSize,
  name,
  persistedValue,
  required,
  tabIndex,
}: DocumentFieldProps) => {
  const { t } = useTranslation();
  const [field, meta] = useField(name);

  return (
    <div>
      <Label
        content={label}
        htmlFor={id}
        required={required}
        srOnly={labelSrOnly}
      />
      <div className={clsx(label && "mt-1")}>
        <FileInput name={name}>
          {({ handleChange, handleDrop, value }) => (
            <DropArea handleDrop={handleDrop}>
              {() => (
                <UploadAreaInput
                  acceptedFormats={acceptedFormats}
                  disabled={disabled}
                  handleChange={handleChange}
                  id={id}
                  maximumSize={maximumSize}
                  name={field.name}
                  required={required}
                  tabIndex={tabIndex}
                  translate={t}
                  type="document"
                  value={
                    value || persistedValue
                      ? value || persistedValue
                      : undefined
                  }
                />
              )}
            </DropArea>
          )}
        </FileInput>
      </div>
      {meta.touched && Boolean(meta.error) && (
        <HelperText error={Boolean(meta.error)}>{meta.error}</HelperText>
      )}
    </div>
  );
};

export default DocumentField;
