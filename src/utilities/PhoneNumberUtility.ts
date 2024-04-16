import LibPhoneNumber, { PhoneNumberFormat } from "google-libphonenumber";
import { SelectOption } from "../components/atoms/Inputs/SelectField/SelectField";
import { PhoneNumber } from "../definitions/types/models/PhoneNumber";

// Return SelectOptions for all available country codes
export function getCountryCodeSelectOptions(): SelectOption[] {
  const phoneNumberUtil = LibPhoneNumber.PhoneNumberUtil.getInstance();
  return phoneNumberUtil.getSupportedRegions().map((region) => ({
    label: region,
    value: phoneNumberUtil.getCountryCodeForRegion(region).toString(),
  }));
}

// Transform a PhoneNumber object to a string
export function getPhoneNumberString(phoneNumber: PhoneNumber): string {
  const util = LibPhoneNumber.PhoneNumberUtil.getInstance();
  const region = util.getRegionCodeForCountryCode(
    parseInt(phoneNumber.countryCode, 10)
  );
  const number = util.parse(phoneNumber.phoneNumber, region);
  return util.format(number, PhoneNumberFormat.INTERNATIONAL);
}

const PhoneNumberUtility = {
  getCountryCodeSelectOptions,
  getPhoneNumberString,
};

export default PhoneNumberUtility;
