import { Translate } from "next-translate";
import * as Yup from "yup";

/**
 * Returns a Yup validation schema to validate a birthdate input
 * @param t function that returns translations
 */
function getBirthdateValidator(t: Translate) {
  return Yup.date()
    .test(
      "age",
      t("forms:validation.18orOlder"),
      (birthDate: Date | undefined) => {
        const cutoff = new Date();
        cutoff.setFullYear(cutoff.getFullYear() - 18);
        return !birthDate || birthDate <= cutoff;
      }
    )
    .max(new Date(Date.now()), t("forms:validation.validDate"))
    .required(t("forms:validation.required"));
}

export default getBirthdateValidator;
