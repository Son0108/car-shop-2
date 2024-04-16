import * as Yup from "yup";
import { Translate } from "next-translate";
import ValidatorBuilder from "./ValidatorBuilder";

class StringValidatorBuilder extends ValidatorBuilder<Yup.StringSchema> {
  constructor(translate: Translate) {
    super(translate, Yup.string());
  }

  public validateEmail(): StringValidatorBuilder {
    this.validator = this.validator.email(
      this.translate("forms:validation.email")
    );
    return this;
  }

  public validateMinimumLength(amount: number): StringValidatorBuilder {
    this.validator = this.validator.min(
      amount,
      this.translate("forms:validation.string.minLength", { amount })
    );
    return this;
  }

  public validateMaximumLength(amount: number): StringValidatorBuilder {
    this.validator = this.validator.max(
      amount,
      this.translate("forms:validation.string.maxLength", { amount })
    );
    return this;
  }

  public validateRegex(regex: RegExp, error: string): StringValidatorBuilder {
    this.validator = this.validator.matches(regex, error);
    return this;
  }
}

export default StringValidatorBuilder;
