import { Translate } from "next-translate";
import StringValidatorBuilder from "./StringValidatorBuilder";

/**
 * Returns a Yup validation schema to validate an email input
 * @param t function that returns translations
 */
function getEmailValidator(t: Translate) {
  return new StringValidatorBuilder(t)
    .validateEmail()
    .validateRequired()
    .build();
}

export default getEmailValidator;
