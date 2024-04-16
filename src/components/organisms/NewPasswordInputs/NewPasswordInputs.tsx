import useTranslation from "next-translate/useTranslation";
import PasswordField from "../../atoms/Inputs/PasswordField/PasswordField";
import { IPasswordCriteria } from "../../atoms/Inputs/PasswordField/PasswordCriteria";
import getPasswordCriteria from "../../../helpers/validators/PasswordCriterias";

export type NewPasswordInputsProps = {
  passwordInputName: string;
  passwordConfirmationInputName: string;
};

const NewPasswordInputs = ({
  passwordInputName,
  passwordConfirmationInputName,
}: NewPasswordInputsProps) => {
  const { t } = useTranslation();

  const passwordCriteria: IPasswordCriteria[] = getPasswordCriteria(t);

  return (
    <>
      <PasswordField
        id="password-input"
        autoComplete="new-password"
        label={t("forms:fields.password")}
        name={passwordInputName}
        criteria={passwordCriteria}
        required
      />
      <PasswordField
        id="password-confirmation-input"
        autoComplete="new-password"
        label={t("forms:fields.passwordConfirm")}
        name={passwordConfirmationInputName}
        required
      />
    </>
  );
};

export default NewPasswordInputs;
