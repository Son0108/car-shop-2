import useTranslation from "next-translate/useTranslation";
import * as Yup from "yup";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useMemo } from "react";
import { CompanyCreate } from "../../../../../../definitions/types/models/Company";
import PhoneNumberField from "../../../../../atoms/Inputs/PhoneNumberField/PhoneNumberField";
import TextField from "../../../../../atoms/Inputs/TextField/TextField";
import SelectField, {
  SelectOption,
} from "../../../../../atoms/Inputs/SelectField/SelectField";
import AddressField from "../../../../../atoms/Inputs/AddressField/AddressField";
import Button from "../../../../../atoms/Button/Button";
import getPhoneNumberValidator from "../../../../../../helpers/validators/phoneNumber.validator";
import InvalidAddressException from "../../../../../../helpers/errors/InvalidAddressException";
import StringValidatorBuilder from "../../../../../../helpers/validators/StringValidatorBuilder";
import { LegalFormCategory } from "../../../../../../definitions/types/models/LegalFormCategory";

export interface IBusinessAgentFormValues {
  company: CompanyCreate;
}

export interface IBusinessAgentFormProps {
  handleSubmit: (values: IBusinessAgentFormValues) => Promise<void>;
  legalFormCategories: LegalFormCategory[];
  values?: IBusinessAgentFormValues;
}

const BusinessAgentForm = ({
  handleSubmit,
  legalFormCategories,
  values,
}: IBusinessAgentFormProps) => {
  const { t } = useTranslation();

  const selectOptions: SelectOption[] = useMemo(() => {
    return legalFormCategories.map((legalForm) => ({
      value: legalForm.value,
      label: legalForm.text,
    }));
  }, [legalFormCategories]);

  const initialValues: IBusinessAgentFormValues = values || {
    company: {
      companyName: "",
      legalFormCategory: selectOptions[0].value,
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
    },
  };

  const validationSchema = Yup.object().shape({
    company: Yup.object().shape({
      phoneNumber: getPhoneNumberValidator(t),
      legalFormCategory: new StringValidatorBuilder(t)
        .validateOneOf(selectOptions.map((s) => s.value))
        .validateRequired()
        .build(),
    }),
  });

  const submit = async (
    data: IBusinessAgentFormValues,
    helpers: FormikHelpers<IBusinessAgentFormValues>
  ) => {
    try {
      await handleSubmit(data);
    } catch (err) {
      if (err instanceof InvalidAddressException) {
        helpers.setFieldError(
          "company.address",
          t("forms:validation.address.invalid")
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
      {(props: FormikProps<IBusinessAgentFormValues>) => (
        <Form>
          <div className="flex flex-col space-y-5">
            <TextField
              id="company-name-input"
              name="company.companyName"
              label={t("forms:fields.companyName")}
              required
            />
            <SelectField
              id="company-legal-form-category-input"
              name="company.legalFormCategory"
              label={t("forms:fields.legalFormCategory")}
              options={selectOptions}
              required
            />
            <PhoneNumberField
              id="company-phone-number-input"
              name="company.phoneNumber"
              label={t("forms:fields.phoneNumber")}
              placeholder="+41 31 917 53 80"
              required
            />
            <AddressField
              id="company-address-input"
              name="company.address"
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

export default BusinessAgentForm;
