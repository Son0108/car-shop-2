import { Translate } from "next-translate";
import StringValidatorBuilder from "./StringValidatorBuilder";

/**
 * Returns a Yup validation schema to validate a firstname input
 * @param t function that returns translations
 */
export function getFirstNameValidator(t: Translate) {
  return new StringValidatorBuilder(t).validateRequired().build();
}

/**
 * Returns a Yup validation schema to validate a lastname input
 * @param t function that returns translations
 */
export function getLastNameValidator(t: Translate) {
  return new StringValidatorBuilder(t).validateRequired().build();
}
