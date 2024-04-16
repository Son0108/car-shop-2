import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";
import React from "react";
import Link from "../../../../../atoms/Link/Link";
import SwitchField from "../../../../../atoms/Inputs/SwitchField/SwitchField";
import Button from "../../../../../atoms/Button/Button";

export interface IUserConsentFormValues {
  termsOfUse: boolean;
  privacyPolicy: boolean;
}

export interface IUserConsentFormProps {
  handleSubmit: (values: IUserConsentFormValues) => Promise<void>;
  values?: IUserConsentFormValues;
}

/**
 * This form allows the user to accept the terms of use as well as the privacy-policy.
 * Both documents are linked inside the page
 */
const UserConsentForm = ({ handleSubmit, values }: IUserConsentFormProps) => {
  const { t } = useTranslation();

  const initialValues: IUserConsentFormValues = values || {
    termsOfUse: false,
    privacyPolicy: false,
  };

  const validationSchema = Yup.object().shape({
    termsOfUse: Yup.boolean()
      .oneOf([true], t("signUp:userConsentForm.validation.termsOfUse"))
      .required(t("forms:validation.required")),
    privacyPolicy: Yup.boolean()
      .oneOf([true], t("signUp:userConsentForm.validation.privacyPolicy"))
      .required(t("forms:validation.required")),
  });

  const submit = async (
    data: IUserConsentFormValues,
    helpers: FormikHelpers<IUserConsentFormValues>
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
      {(props: FormikProps<IUserConsentFormValues>) => (
        <Form>
          <div className="flex flex-col space-y-5 mb-4">
            <p>{t("signUp:userConsentForm.text")}</p>
            <div className="flex space-x-4 items-center">
              <SwitchField
                id="terms-of-use-input"
                name="termsOfUse"
                required
                label={
                  <Trans
                    i18nKey="signUp:userConsentForm.fields.termsOfUse"
                    components={[
                      <p />,
                      <Link variant="text" href="/documents/agb.pdf" />,
                    ]}
                  />
                }
              />
            </div>
            <div className="flex space-x-4 items-center">
              <SwitchField
                id="privacy-policy-input"
                name="privacyPolicy"
                required
                label={
                  <Trans
                    i18nKey="signUp:userConsentForm.fields.privacyPolicy"
                    components={[
                      <p />,
                      <Link
                        variant="text"
                        href="/documents/privacyPolicy.pdf"
                      />,
                    ]}
                  />
                }
              />
            </div>
            <Button
              fill
              type="submit"
              disabled={(!props.dirty && !values) || !props.isValid}
              loading={props.isSubmitting}
            >
              {t("signUp:signUp")}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserConsentForm;
