import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import useTranslation from "next-translate/useTranslation";
import RadioField, {
  IRadioOption,
} from "../../../../../atoms/Inputs/RadioField/RadioField";
import Button from "../../../../../atoms/Button/Button";
import StringValidatorBuilder from "../../../../../../helpers/validators/StringValidatorBuilder";

export interface IUserTypeFormValues {
  userType: string;
}

export interface IUserTypeFormProps {
  userTypes: IRadioOption[];
  handleSubmit: (values: IUserTypeFormValues) => Promise<void>;
  values?: IUserTypeFormValues;
}

const UserTypeForm = ({
  handleSubmit,
  userTypes,
  values,
}: IUserTypeFormProps) => {
  const { t } = useTranslation();

  const initialValues: IUserTypeFormValues = values || {
    userType: userTypes[0].value,
  };

  const validationSchema = Yup.object().shape({
    userType: new StringValidatorBuilder(t)
      .validateOneOf(userTypes.map((u) => u.value))
      .validateRequired()
      .build(),
  });

  const submit = async (
    data: IUserTypeFormValues,
    helpers: FormikHelpers<IUserTypeFormValues>
  ) => {
    try {
      helpers.setSubmitting(true);
      await handleSubmit(data);
    } catch (err) {
      helpers.setSubmitting(false);
    }
  };

  return (
    <Formik
      onSubmit={submit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {(props: FormikProps<IUserTypeFormValues>) => (
        <Form>
          <div className="flex flex-col space-y-5 mb-4">
            <RadioField
              id="user-type-radio-group"
              label={t("forms:fields.userType")}
              name="userType"
              options={userTypes}
            />
            <Button
              fill
              type="submit"
              disabled={!props.isValid}
              loading={props.isSubmitting}
            >
              {t("forms:actions.continue")}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserTypeForm;
