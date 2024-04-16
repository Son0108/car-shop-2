import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import useTranslation from "next-translate/useTranslation";
import * as Yup from "yup";
import { IAddressCreate } from "../../../../../../definitions/types/models/Address";
import AddressField from "../../../../../atoms/Inputs/AddressField/AddressField";
import DateField from "../../../../../atoms/Inputs/DateField/DateField";
import PhoneNumberField from "../../../../../atoms/Inputs/PhoneNumberField/PhoneNumberField";
import { PhoneNumberCreate } from "../../../../../../definitions/types/models/PhoneNumber";
import Button from "../../../../../atoms/Button/Button";
import getBirthdateValidator from "../../../../../../helpers/validators/date.validators";
import getPhoneNumberValidator from "../../../../../../helpers/validators/phoneNumber.validator";
import InvalidAddressException from "../../../../../../helpers/errors/InvalidAddressException";

export interface ITenantFormValues {
  birthDate: string;
  phoneNumber: PhoneNumberCreate;
  address: IAddressCreate;
}

export interface ITenantFormProps {
  handleSubmit: (values: ITenantFormValues) => Promise<void>;
  values?: ITenantFormValues;
}

const TenantForm = ({ handleSubmit, values }: ITenantFormProps) => {
  const { t } = useTranslation();

  const initialValues: ITenantFormValues = values || {
    birthDate: "",
    address: {
      street: "",
      postCode: "",
      city: "",
      country: "",
    },
    phoneNumber: {
      phoneNumber: "",
      countryCode: "",
    },
  };

  const validationSchema = Yup.object().shape({
    birthDate: getBirthdateValidator(t),
    phoneNumber: getPhoneNumberValidator(t),
  });

  const submit = async (
    data: ITenantFormValues,
    helpers: FormikHelpers<ITenantFormValues>
  ) => {
    try {
      await handleSubmit(data);
    } catch (err) {
      if (err instanceof InvalidAddressException) {
        helpers.setFieldError("address", t("forms:validation.address.invalid"));
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
      {(props: FormikProps<ITenantFormValues>) => (
        <Form>
          <div className="flex flex-col space-y-5">
            <DateField
              id="birthdate-input"
              name="birthDate"
              label={t("forms:fields.birthDate")}
              placeholder="dd.mm.yyyy"
              required
            />
            <PhoneNumberField
              id="phone-number-input"
              name="phoneNumber"
              label={t("forms:fields.phoneNumber")}
              placeholder="+41 31 917 53 80"
              required
            />
            <AddressField
              id="address-input"
              name="address"
              label={t("forms:fields.address")}
              required
              placeholder={{
                country: t("forms:fields.country"),
                city: t("forms:fields.city"),
                postCode: t("forms:fields.postCode"),
                street: t("forms:fields.street"),
              }}
              subLabels={{
                country: t("forms:fields.country"),
                city: t("forms:fields.city"),
                postCode: t("forms:fields.postCode"),
                street: t("forms:fields.street"),
              }}
            />
            <Button
              fill
              type="submit"
              disabled={(!props.dirty && !values) || !props.isValid}
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

export default TenantForm;
