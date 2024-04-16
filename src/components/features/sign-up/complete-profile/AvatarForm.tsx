import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import useTranslation from "next-translate/useTranslation";
import AvatarField from "../../../atoms/Inputs/AvatarField/AvatarField";
import FileValidatorBuilder from "../../../../helpers/validators/FileValidatorBuilder";
import {
  ACCEPTED_IMAGE_FORMATS,
  MAXIMUM_FILE_SIZE,
} from "../../../../config/constants/file-config";
import Button from "../../../atoms/Button/Button";
import { DEFAULT_AVATAR } from "../../../../config/constants/placeholders";
import { FormikSubmitHandler } from "../../../../helpers/FormikSubmitHandler";

export interface AvatarFormValues {
  avatar: File | null;
}

interface AvatarFormProps {
  avatar?: string;
  handleSubmit: FormikSubmitHandler<AvatarFormValues>;
}

const AvatarForm = ({ avatar, handleSubmit }: AvatarFormProps) => {
  const { t } = useTranslation();

  const initialValues: AvatarFormValues = {
    avatar: null,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({
        avatar: new FileValidatorBuilder(t)
          .validateMaximumSize(MAXIMUM_FILE_SIZE)
          .validateAcceptedFormats(ACCEPTED_IMAGE_FORMATS)
          .build(),
      })}
    >
      {(props: FormikProps<AvatarFormValues>) => (
        <Form onSubmit={props.handleSubmit}>
          <div className="flex flex-col space-y-4">
            <p>{t("signUp:avatarForm.text")}</p>
            <AvatarField
              src={avatar || DEFAULT_AVATAR}
              name="avatar"
              id="avatar-input"
            />
            <Button
              disabled={!props.isValid}
              loading={props.isSubmitting}
              type="submit"
            >
              {t(!props.dirty ? "forms:actions.skip" : "forms:actions.upload")}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AvatarForm;
