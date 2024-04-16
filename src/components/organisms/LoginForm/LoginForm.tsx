import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import TextField from "../../atoms/Inputs/TextField/TextField";
import PasswordField from "../../atoms/Inputs/PasswordField/PasswordField";
import SwitchField from "../../atoms/Inputs/SwitchField/SwitchField";
import Button from "../../atoms/Button/Button";
import getEmailValidator from "../../../helpers/validators/email.validator";
import StringValidatorBuilder from "../../../helpers/validators/StringValidatorBuilder";
import { FormikSubmitHandler } from "../../../helpers/FormikSubmitHandler";

export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginFormProps {
  handleSubmit: FormikSubmitHandler<LoginFormValues>;
}

const LoginForm = ({ handleSubmit }: LoginFormProps) => {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    email: getEmailValidator(t),
    password: new StringValidatorBuilder(t).validateRequired().build(),
  });

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(props: FormikProps<LoginFormValues>) => (
        <Form>
          <div className="flex flex-col space-y-5 mb-4">
            <TextField
              autoComplete="username"
              id="username-input"
              label={t("forms:fields.email")}
              name="email"
              type="email"
              required
            />
            <PasswordField
              autoComplete="current-password"
              id="password-input"
              label={t("forms:fields.password")}
              name="password"
              required
            />
            <div className="py-2">
              <SwitchField
                id="rememberMeInput"
                name="rememberMe"
                label={t("login:fields.rememberMe")}
              />
            </div>
            <Button
              fill
              type="submit"
              disabled={!props.dirty || !props.isValid}
              loading={props.isSubmitting}
            >
              {t("login:loginButton")}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
