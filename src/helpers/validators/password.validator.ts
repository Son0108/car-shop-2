import { Translate } from "next-translate";
import * as Yup from "yup";
import { PASSWORD_REGEX } from "../../components/atoms/Inputs/PasswordField/PasswordField";
import StringValidatorBuilder from "./StringValidatorBuilder";

/**
 * Returns a Yup validation schema to validate a password input
 * @param t function that returns translations
 */
export function getPasswordValidator(t: Translate) {
  return new StringValidatorBuilder(t)
    .validateRegex(PASSWORD_REGEX, t("forms:validation.password.secure"))
    .validateRequired()
    .build();
}

/**
 * Returns a Yup validation schema to validate a password-confirmation input
 * @param t function that returns translations
 * @param passwordKey name of the password-input inside the form
 */
export function getPasswordConfirmationValidator(
  t: Translate,
  passwordKey: string
) {
  return new StringValidatorBuilder(t)
    .validateOneOf(
      [Yup.ref(passwordKey)],
      t("forms:validation.password.mustMatch")
    )
    .validateRequired()
    .build();
}
