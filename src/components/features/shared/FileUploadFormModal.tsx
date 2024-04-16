import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import useTranslation from "next-translate/useTranslation";
import {
  FileCategory,
  FileCategoryValuesType,
} from "../../../definitions/types/models/File";
import { FormikSubmitHandler } from "../../../helpers/FormikSubmitHandler";
import Modal from "../../atoms/Modal/Modal";
import Button from "../../atoms/Button/Button";
import DocumentField from "../../atoms/Inputs/FileFields/DocumentField";
import {
  ACCEPTED_FILE_FORMATS,
  MAXIMUM_FILE_SIZE,
} from "../../../config/constants/file-config";
import FileValidatorBuilder from "../../../helpers/validators/FileValidatorBuilder";

export interface FileUploadFormValues {
  fileCategory: FileCategoryValuesType;
  file: File | null;
}

interface FileUploadFormModalProps {
  closeCallback?: { (): void };
  fileCategory: FileCategory;
  handleSubmit: FormikSubmitHandler<FileUploadFormValues>;
}

const FileUploadFormModal = ({
  closeCallback,
  fileCategory,
  handleSubmit,
}: FileUploadFormModalProps) => {
  const { t } = useTranslation();

  const initialValues: FileUploadFormValues = {
    file: null,
    fileCategory: fileCategory.value,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({
        file: new FileValidatorBuilder(t)
          .validateMaximumSize(MAXIMUM_FILE_SIZE)
          .validateAcceptedFormats(ACCEPTED_FILE_FORMATS)
          .validateRequired()
          .build(),
      })}
    >
      {(props: FormikProps<FileUploadFormValues>) => (
        <Form onSubmit={props.handleSubmit}>
          <Modal
            title={t("profile:heading.uploadDocument", {
              documentType: fileCategory.text,
            })}
            actions={
              <Button
                fill
                type="submit"
                loading={props.isSubmitting}
                disabled={!props.isValid || !props.dirty}
                onClick={props.submitForm}
              >
                {t("forms:actions.upload")}
              </Button>
            }
            content={
              <div className="flex justify-start">
                <DocumentField
                  acceptedFormats={ACCEPTED_FILE_FORMATS}
                  maximumSize={MAXIMUM_FILE_SIZE}
                  name="file"
                />
              </div>
            }
            closeCallback={closeCallback}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FileUploadFormModal;
