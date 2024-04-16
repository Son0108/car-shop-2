import { Translate } from "next-translate";
import { IPasswordCriteria } from "../../components/atoms/Inputs/PasswordField/PasswordCriteria";

/**
 * Return the password criteria as required by the application
 * @param translate
 */
function getPasswordCriteria(translate: Translate): IPasswordCriteria[] {
  return [
    {
      regex: /^.{8,}$/,
      message: translate("forms:validation.password.minLength", { amount: 8 }),
    },
    {
      regex: /^(?=(.*[A-Z])+).+$/,
      message: translate("forms:validation.password.minUpperCase", {
        amount: 1,
      }),
    },
    {
      regex: /^(?=(.*[0-9]){2,}).+$/,
      message: translate("forms:validation.password.minNumbers", { amount: 2 }),
    },
    {
      regex: /^(?=(.*[!@#$%^&*()\-_+.])+).+$/,
      message: translate("forms:validation.password.minSpecial", { amount: 1 }),
    },
  ];
}

export default getPasswordCriteria;
