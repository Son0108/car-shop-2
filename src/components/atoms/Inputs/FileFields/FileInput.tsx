import {
  ChangeEvent,
  ChangeEventHandler,
  DragEvent,
  DragEventHandler,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useField } from "formik";

interface FileFieldRenderProp {
  /**
   * Change handler to update the field value
   */
  handleChange: ChangeEventHandler;
  /**
   * Drop handler to update the field value
   */
  handleDrop: DragEventHandler;
  /**
   * Value of the field
   */
  value?: File | FileList;
  /**
   * Preview url of the file blob
   */
  preview?: string;
  /**
   * Callback to unset the field value
   */
  unset: { (): void };
}

export interface FileInputProps {
  /**
   * Render function
   */
  children?: { (props: FileFieldRenderProp): ReactNode };
  /**
   * Define if multiple files can be passed
   */
  multiple?: boolean;
  /**
   * name of the input element
   */
  name: string;
}

const FileInput = ({ children, multiple = false, name }: FileInputProps) => {
  const [field, meta, helper] = useField(name);
  const [preview, setPreview] = useState<string | undefined>();

  useEffect(() => {
    let url: string | undefined;
    if (
      field.value &&
      field.value instanceof File &&
      field.value.type.match(/image\/*/)
    ) {
      url = URL.createObjectURL(field.value);
      setPreview(url);
    }

    return () => {
      if (url) {
        setPreview(undefined);
        URL.revokeObjectURL(url);
      }
    };
  }, [field.value]);

  const updateField = (files: FileList) => {
    if (multiple) {
      helper.setValue(files);
    } else {
      helper.setValue(files[0]);
    }

    if (!meta.touched) helper.setTouched(true, false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!e.target || !e.target.files || e.target.files.length === 0) return;

    updateField(e.target.files);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (
      !e.dataTransfer ||
      !e.dataTransfer.files ||
      e.dataTransfer.files.length === 0
    )
      return;

    updateField(e.dataTransfer.files);
  };

  return (
    <div className="block relative">
      {children &&
        children({
          handleChange,
          handleDrop,
          preview,
          unset: () => {
            helper.setValue(undefined);
          },
          value: field.value,
        })}
    </div>
  );
};

export default FileInput;
