import { Translate } from "next-translate";
import * as Yup from "yup";
import LibPhoneNumber from "google-libphonenumber";

/**
 * Returns a Yup validation schema to validate a phone-number input
 * @param t function that returns translations
 */
function getPhoneNumberValidator(t: Translate) {
  return Yup.object()
    .shape({
      phoneNumber: Yup.string(),
      countryCode: Yup.string(),
    })
    .test(
      "validatePhoneNumberAndRegion",
      t("forms:validation.phoneNumber.invalid"),
      (value) => {
        if (!value.phoneNumber || !value.countryCode) return false;
        try {
          const phoneNumberUtil = LibPhoneNumber.PhoneNumberUtil.getInstance();
          const region = phoneNumberUtil.getRegionCodeForCountryCode(
            parseInt(value.countryCode, 10)
          );
          const number = phoneNumberUtil.parse(value.phoneNumber, region);
          return (
            phoneNumberUtil.isValidNumber(number) &&
            phoneNumberUtil.isValidNumberForRegion(number, region)
          );
        } catch (e) {
          return false;
        }
      }
    );
}

export default getPhoneNumberValidator;
