import useTranslation from "next-translate/useTranslation";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import NewPasswordInputs from "../NewPasswordInputs/NewPasswordInputs";
import Button from "../../atoms/Button/Button";
import {
  getPasswordConfirmationValidator,
  getPasswordValidator,
} from "../../../helpers/validators/password.validator";
import { FormikSubmitHandler } from "../../../helpers/FormikSubmitHandler";

export interface ResetPasswordFormValues {
  password: string;
  passwordConfirm: string;
}

interface ResetPasswordFormProps {
  handleSubmit: FormikSubmitHandler<ResetPasswordFormValues>;
}

const ResetPasswordForm = ({ handleSubmit }: ResetPasswordFormProps) => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        password: "",
        passwordConfirm: "",
      }}
      validationSchema={Yup.object().shape({
        password: getPasswordValidator(t),
        passwordConfirm: getPasswordConfirmationValidator(t, "password"),
      })}
      onSubmit={handleSubmit}
    >
      {(props: FormikProps<ResetPasswordFormValues>) => (
        <Form className="w-full flex flex-col space-y-5 ">
          <NewPasswordInputs
            passwordInputName="password"
            passwordConfirmationInputName="passwordConfirm"
          />
          <Button
            type="submit"
            disabled={!props.dirty || !props.isValid}
            loading={props.isSubmitting}
          >
            {t("resetPassword:resetPassword")}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
