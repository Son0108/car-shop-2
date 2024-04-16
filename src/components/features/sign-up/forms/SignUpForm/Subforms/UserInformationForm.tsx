import useTranslation from "next-translate/useTranslation";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import TextField from "../../../../../atoms/Inputs/TextField/TextField";
import SelectField from "../../../../../atoms/Inputs/SelectField/SelectField";
import Link from "../../../../../atoms/Link/Link";
import NewPasswordInputs from "../../../../../organisms/NewPasswordInputs/NewPasswordInputs";
import Button from "../../../../../atoms/Button/Button";
import getEmailValidator from "../../../../../../helpers/validators/email.validator";
import {
  getPasswordConfirmationValidator,
  getPasswordValidator,
} from "../../../../../../helpers/validators/password.validator";
import {
  getFirstNameValidator,
  getLastNameValidator,
} from "../../../../../../helpers/validators/name.validator";
import { Gender } from "../../../../../../definitions/types/models/Gender";
import EmailAlreadyExistsException from "../../../../../../helpers/errors/EmailAlreadyExistsException";
import StringValidatorBuilder from "../../../../../../helpers/validators/StringValidatorBuilder";

export interface IUserInformationFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  gender: string;
}

interface IUserInformationFormProps {
  genders: Gender[];
  handleSubmit: (values: IUserInformationFormValues) => Promise<void>;
  values?: IUserInformationFormValues;
}

const UserInformationForm = ({
  genders = [],
  handleSubmit,
  values,
}: IUserInformationFormProps) => {
  const { t } = useTranslation();

  const initialValues: IUserInformationFormValues = values || {
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    gender: genders[0].value,
  };

  const validationSchema = Yup.object().shape({
    email: getEmailValidator(t),
    password: getPasswordValidator(t),
    passwordConfirm: getPasswordConfirmationValidator(t, "password"),
    firstName: getFirstNameValidator(t),
    lastName: getLastNameValidator(t),
    gender: new StringValidatorBuilder(t)
      .validateOneOf(genders.map((g) => g.value))
      .validateRequired()
      .build(),
  });

  const submit = async (
    data: IUserInformationFormValues,
    helpers: FormikHelpers<IUserInformationFormValues>
  ) => {
    try {
      helpers.setSubmitting(true);
      await handleSubmit(data);
    } catch (err) {
      if (err instanceof EmailAlreadyExistsException) {
        helpers.setFieldError(
          "email",
          t("forms:validation.emailAlreadyExists")
        );
      }
      helpers.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submit}
      validationSchema={validationSchema}
    >
      {(props: FormikProps<IUserInformationFormValues>) => (
        <Form>
          <div className="flex-col space-y-5 mb-4">
            <SelectField
              id="gender-input"
              label={t("forms:fields.title")}
              name="gender"
              options={genders.map((gender) => ({
                value: gender.value,
                label: gender.text,
              }))}
              required
            />
            <div className="flex flex-col space-y-5 sm:space-y-0 sm:flex-row sm:space-x-4">
              <TextField
                id="firstname-input"
                autoComplete="given_name"
                label={t("forms:fields.firstName")}
                name="firstName"
                type="text"
                required
              />
              <TextField
                id="lastname-input"
                autoComplete="family_name"
                label={t("forms:fields.lastName")}
                name="lastName"
                type="text"
                required
              />
            </div>
            <TextField
              id="email-input"
              autoComplete="email"
              label={t("forms:fields.email")}
              name="email"
              type="email"
              required
            />
            <NewPasswordInputs
              passwordInputName="password"
              passwordConfirmationInputName="passwordConfirm"
            />
            <Button
              fill
              type="submit"
              disabled={(!props.dirty && !values) || !props.isValid}
              loading={props.isSubmitting}
            >
              {t("forms:actions.continue")}
            </Button>
            <div className="flex justify-between flex-wrap mt-2">
              <p className="text-xs inline-block">
                {t("signUp:haveAnAccount")}{" "}
                <Link href="/login" variant="text" className="text-xs">
                  {t("signUp:loginLink")}
                </Link>
              </p>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserInformationForm;
