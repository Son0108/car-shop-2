import { Form, Formik, FormikProps } from "formik";
import React, { useMemo } from "react";
import useTranslation from "next-translate/useTranslation";
import * as Yup from "yup";
import { User, UserUpdate } from "../../../../definitions/types/models/User";
import TextField from "../../../atoms/Inputs/TextField/TextField";
import AddressField from "../../../atoms/Inputs/AddressField/AddressField";
import PhoneNumberField from "../../../atoms/Inputs/PhoneNumberField/PhoneNumberField";
import SelectField from "../../../atoms/Inputs/SelectField/SelectField";
import DateField from "../../../atoms/Inputs/DateField/DateField";
import Button from "../../../atoms/Button/Button";
import AvatarField from "../../../atoms/Inputs/AvatarField/AvatarField";
import getEmailValidator from "../../../../helpers/validators/email.validator";
import {
  getFirstNameValidator,
  getLastNameValidator,
} from "../../../../helpers/validators/name.validator";
import getBirthdateValidator from "../../../../helpers/validators/date.validators";
import getPhoneNumberValidator from "../../../../helpers/validators/phoneNumber.validator";
import FileValidatorBuilder from "../../../../helpers/validators/FileValidatorBuilder";
import { Gender } from "../../../../definitions/types/models/Gender";
import StringValidatorBuilder from "../../../../helpers/validators/StringValidatorBuilder";
import {
  ACCEPTED_IMAGE_FORMATS,
  MAXIMUM_FILE_SIZE,
} from "../../../../config/constants/file-config";
import Heading from "../../../atoms/Heading/Heading";
import { LegalFormCategory } from "../../../../definitions/types/models/LegalFormCategory";
import { FormikSubmitHandler } from "../../../../helpers/FormikSubmitHandler";

export type ProfileFormValues = UserUpdate;

interface ProfilFormProps {
  avatar: string;
  isBusinessAgent?: boolean;
  genders: Gender[];
  legalFormCategories: LegalFormCategory[];
  user: User;
  handleSubmit: FormikSubmitHandler<ProfileFormValues>;
}

const ProfileForm = ({
  avatar,
  isBusinessAgent,
  genders,
  legalFormCategories,
  user,
  handleSubmit,
}: ProfilFormProps) => {
  const { t } = useTranslation();

  const initialValue: ProfileFormValues = useMemo(
    () => ({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      avatar: null,
      gender: user.gender.value,
      address: user.address || null,
      phoneNumber: user.phoneNumber || null,
      company: user.company,
    }),
    [user]
  );

  return (
    <Formik
      enableReinitialize
      initialValues={initialValue}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({
        avatar: new FileValidatorBuilder(t)
          .validateMaximumSize(MAXIMUM_FILE_SIZE)
          .validateAcceptedFormats(ACCEPTED_IMAGE_FORMATS)
          .build(),
        gender: new StringValidatorBuilder(t)
          .validateOneOf(genders.map((g) => g.value))
          .validateRequired()
          .build(),
        firstName: getFirstNameValidator(t),
        lastName: getLastNameValidator(t),
        birthDate: getBirthdateValidator(t),
        email: getEmailValidator(t),
        phoneNumber: Yup.object().when("isNotBusinessAgent", {
          is: () => !isBusinessAgent,
          then: getPhoneNumberValidator(t),
          otherwise: Yup.object().nullable(),
        }),
      })}
    >
      {(props: FormikProps<ProfileFormValues>) => (
        <Form className="space-y-4" onSubmit={props.handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-5 mb-4">
            <div className="space-y-5 lg:col-span-2">
              <div className="block lg:hidden">
                <AvatarField
                  id="avatar-input-mobile"
                  name="avatar"
                  label={t("forms:fields.avatar")}
                  src={avatar}
                />
              </div>
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
              <div className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-4">
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
              <DateField
                label={t("forms:fields.birthDate")}
                name="birthDate"
                required
              />
            </div>
            <div className="hidden lg:block h-full">
              <AvatarField
                id="avatar-input-desktop"
                name="avatar"
                label={t("forms:fields.avatar")}
                src={avatar}
              />
            </div>
            <div className="lg:col-span-3 space-y-5">
              <TextField
                id="email-input"
                autoComplete="email"
                label={t("forms:fields.email")}
                name="email"
                type="email"
                required
              />

              {!isBusinessAgent && (
                <>
                  <PhoneNumberField
                    label={t("forms:fields.phoneNumber")}
                    name="phoneNumber"
                    required
                  />

                  <AddressField
                    label={t("forms:fields.address")}
                    name="address"
                    required
                  />
                </>
              )}
            </div>
            {isBusinessAgent && (
              <div className="lg:col-span-3 space-y-5 mt-3">
                <Heading variant="h4" as="h3" className="mb-4">
                  {t("profile:forms.yourCompany")}
                </Heading>
                <TextField
                  id="company-name-input"
                  name="company.companyName"
                  label={t("forms:fields.companyName")}
                  disabled
                />
                <SelectField
                  id="company-legal-form-category-input"
                  name="company.legalFormCategory"
                  label={t("forms:fields.legalFormCategory")}
                  options={legalFormCategories.map((legalForm) => ({
                    value: legalForm.value,
                    label: legalForm.text,
                  }))}
                  disabled
                />
                <PhoneNumberField
                  id="company-phone-number-input"
                  name="company.phoneNumber"
                  label={t("forms:fields.phoneNumber")}
                  placeholder="+41 31 917 53 80"
                  disabled
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
                  disabled
                />
              </div>
            )}
            <div className="flex space-x-4">
              <Button
                disabled={!props.dirty || !props.isValid}
                loading={props.isSubmitting}
                type="submit"
              >
                {t("forms:actions.update")}
              </Button>
              <Button
                variant="text"
                disabled={!props.dirty || !props.isValid || props.isSubmitting}
                type="reset"
              >
                {t("forms:actions.cancel")}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileForm;
