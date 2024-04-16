import { Form, Formik, FormikProps } from "formik";

import useTranslation from "next-translate/useTranslation";
import { useMemo, useRef } from "react";
import { FormikSubmitHandler } from "../../../helpers/FormikSubmitHandler";
import { FileCategory } from "../../../definitions/types/models/File";
import Button from "../../atoms/Button/Button";

export interface FileListItemFormValues {
  fileCategory: string;
  file: File | null;
}

interface FileListItemFormProps {
  fileCategory: FileCategory;
  handleSubmit: FormikSubmitHandler<FileListItemFormValues>;
}

const FileListInputForm = ({
  fileCategory,
  handleSubmit,
}: FileListItemFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const initialValues: FileListItemFormValues = useMemo(
    () => ({
      file: null,
      fileCategory: fileCategory.value,
    }),
    [fileCategory]
  );

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {(props: FormikProps<FileListItemFormValues>) => (
        <Form>
          <div className="invisible">
            <input ref={inputRef} name="file" />
          </div>
          <Button
            variant="text"
            size="sm"
            color="primary"
            loading={props.isSubmitting}
            onClick={() => {
              if (inputRef.current) inputRef.current.click();
            }}
          >
            {t("forms:actions.upload")}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FileListInputForm;
