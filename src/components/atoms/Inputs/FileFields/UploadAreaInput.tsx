import clsx from "clsx";
import { ChangeEventHandler, useMemo } from "react";
import { Translate } from "next-translate";
import { DocumentAddIcon, DocumentIcon } from "@heroicons/react/outline";
import FileUtility from "../../../../utilities/FileUtility";
import UploadImageIcon from "../../Icons/UploadImageIcon";
import { BaseInputPropsWithoutLabel } from "../shared/Input.shared";
import { IFile } from "../../../../definitions/types/models/File";

interface UploadAreaInputProps extends BaseInputPropsWithoutLabel {
  acceptedFormats: string | string[];
  handleChange: ChangeEventHandler;
  maximumSize: number;
  translate: Translate;
  type?: "document" | "image";
  value?: File | FileList | IFile;
}

const UploadAreaInput = ({
  acceptedFormats,
  disabled,
  handleChange,
  id,
  maximumSize,
  name,
  required,
  tabIndex,
  translate,
  type = "document",
  value,
}: UploadAreaInputProps) => {
  const icon = useMemo(() => {
    switch (type) {
      case "image":
        return <UploadImageIcon />;
      default:
        if (value) return <DocumentIcon />;
        return <DocumentAddIcon />;
    }
  }, [type, value]);

  // If a value is given show the name of the file
  const fileName = useMemo(() => {
    let displayValue;
    if (value instanceof FileList && value.length > 0) {
      displayValue = value[0].name;
    } else if (value instanceof File) {
      displayValue = value.name;
    } else if (value) {
      displayValue = (value as IFile).originalName;
    }
    return displayValue;
  }, [value]);

  return (
    <div className="max-w-lg flex justify-center mx-auto px-6 py-6 lg:p-12 border-2 border-gray-300 border-dashed rounded-md">
      <div className="space-y-1 text-center text-gray-500">
        <div className="mx-auto h-12 w-12 text-gray-400">{icon}</div>
        {fileName && <p className="text-sm">{fileName}</p>}
        <div className="flex flex-col md:flex-row items-center text-sm text-gray-600">
          <label
            htmlFor={id}
            className={clsx(
              "relative cursor-pointer bg-white rounded-md font-medium",
              "text-primary-600 hover:text-primary-500 focus-within:outline-none",
              "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
            )}
          >
            <span>
              {translate(
                value
                  ? "forms:helperText.uploadDifferentFile"
                  : "forms:helperText.uploadFile"
              )}
            </span>
            <input
              className="sr-only"
              disabled={disabled}
              id={id}
              name={name}
              onChange={handleChange}
              required={required}
              tabIndex={tabIndex}
              type="file"
            />
          </label>
          <p className="pl-1">{translate("forms:helperText.orDragAndDrop")}</p>
        </div>
        <p className="text-xs">
          {translate("forms:helperText.uploadFilesOfTypeWithLimit", {
            mimeTypes: Array.isArray(acceptedFormats)
              ? acceptedFormats.join(", ")
              : acceptedFormats,
            uploadLimit: FileUtility.getReadableSize(maximumSize),
          })}
        </p>
      </div>
    </div>
  );
};

export default UploadAreaInput;
