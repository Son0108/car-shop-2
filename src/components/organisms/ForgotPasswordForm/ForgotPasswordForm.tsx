import useTranslation from "next-translate/useTranslation";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import TextField from "../../atoms/Inputs/TextField/TextField";
import Button from "../../atoms/Button/Button";
import getEmailValidator from "../../../helpers/validators/email.validator";
import { FormikSubmitHandler } from "../../../helpers/FormikSubmitHandler";

export interface ForgotPasswordFormValues {
  email: string;
}

interface ForgotPasswordFormProps {
  handleSubmit: FormikSubmitHandler<ForgotPasswordFormValues>;
}

const ForgotPasswordForm = ({ handleSubmit }: ForgotPasswordFormProps) => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={Yup.object().shape({
        email: getEmailValidator(t),
      })}
      onSubmit={handleSubmit}
    >
      {(props: FormikProps<ForgotPasswordFormValues>) => (
        <Form className="w-full flex flex-col space-y-5">
          <TextField
            id="email-input"
            name="email"
            label={t("forms:fields.email")}
            type="email"
            required
          />
          <Button
            type="submit"
            disabled={!props.dirty || !props.isValid}
            loading={props.isSubmitting}
          >
            {t("forms:actions.submit")}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;
