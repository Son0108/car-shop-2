import useTranslation from "next-translate/useTranslation";
import * as Yup from "yup";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { PhoneNumberCreate } from "../../../../../../definitions/types/models/PhoneNumber";
import { IAddressCreate } from "../../../../../../definitions/types/models/Address";
import PhoneNumberField from "../../../../../atoms/Inputs/PhoneNumberField/PhoneNumberField";
import AddressField from "../../../../../atoms/Inputs/AddressField/AddressField";
import Button from "../../../../../atoms/Button/Button";
import getPhoneNumberValidator from "../../../../../../helpers/validators/phoneNumber.validator";
import InvalidAddressException from "../../../../../../helpers/errors/InvalidAddressException";

export interface IIndividualAgentFormValues {
  phoneNumber: PhoneNumberCreate;
  address: IAddressCreate;
}

export interface IIndividualAgentFormProps {
  handleSubmit: (values: IIndividualAgentFormValues) => Promise<void>;
  values?: IIndividualAgentFormValues;
}

const IndividualAgentForm = ({
  handleSubmit,
  values,
}: IIndividualAgentFormProps) => {
  const { t } = useTranslation();

  const initialValues: IIndividualAgentFormValues = values || {
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
    phoneNumber: getPhoneNumberValidator(t),
  });

  const submit = async (
    data: IIndividualAgentFormValues,
    helpers: FormikHelpers<IIndividualAgentFormValues>
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
      {(props: FormikProps<IIndividualAgentFormValues>) => (
        <Form>
          <div className="flex flex-col space-y-5">
            <PhoneNumberField
              id="phonenumber-input"
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

export default IndividualAgentForm;
