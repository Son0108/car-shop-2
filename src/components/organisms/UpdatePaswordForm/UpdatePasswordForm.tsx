import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import PasswordField from "../../atoms/Inputs/PasswordField/PasswordField";
import { IPasswordCriteria } from "../../atoms/Inputs/PasswordField/PasswordCriteria";
import Button from "../../atoms/Button/Button";
import {
  getPasswordConfirmationValidator,
  getPasswordValidator,
} from "../../../helpers/validators/password.validator";
import getPasswordCriteria from "../../../helpers/validators/PasswordCriterias";
import { FormikSubmitHandler } from "../../../helpers/FormikSubmitHandler";

export interface UpdatePasswordFormValues {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

interface UpdatePasswordFormProps {
  handleSubmit: FormikSubmitHandler<UpdatePasswordFormValues>;
}

const UpdatePasswordForm = ({ handleSubmit }: UpdatePasswordFormProps) => {
  const { t } = useTranslation();

  const passwordCriteria: IPasswordCriteria[] = getPasswordCriteria(t);

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required(t("forms:validation.required")),
    newPassword: getPasswordValidator(t),
    newPasswordConfirm: getPasswordConfirmationValidator(t, "newPassword"),
  });

  return (
    <Formik
      initialValues={{
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(props: FormikProps<UpdatePasswordFormValues>) => (
        <Form>
          <div className="flex flex-col space-y-4">
            <PasswordField
              id="old-password-input"
              autoComplete="current-password"
              label={t("forms:fields.oldPassword")}
              name="oldPassword"
              required
            />
            <PasswordField
              id="new-password-input"
              autoComplete="new-password"
              label={t("forms:fields.newPassword")}
              name="newPassword"
              criteria={passwordCriteria}
              required
            />
            <PasswordField
              id="new-password-confirmation-input"
              autoComplete="new-password"
              label={t("forms:fields.newPasswordConfirm")}
              name="newPasswordConfirm"
              required
            />
            <div className="flex">
              <Button
                type="submit"
                disabled={!props.dirty || !props.isValid}
                loading={props.isSubmitting}
              >
                {t("forms:actions.update")}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdatePasswordForm;
