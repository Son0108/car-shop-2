import * as Yup from "yup";
import { Translate } from "next-translate";
import ValidatorBuilder from "./ValidatorBuilder";

class NumberValidatorBuilder extends ValidatorBuilder<Yup.NumberSchema> {
  constructor(translate: Translate) {
    super(translate, Yup.number());
  }

  public validatePositiveValue(): NumberValidatorBuilder {
    this.validator = this.validator.moreThan(
      0,
      this.translate("forms:validation.number.positive")
    );
    return this;
  }

  public validateMinValue(value: number): NumberValidatorBuilder {
    this.validator = this.validator.min(
      value,
      this.translate("forms:validation.number.min", { value })
    );
    return this;
  }

  public validateMaxValue(value: number): NumberValidatorBuilder {
    this.validator = this.validator.max(
      value,
      this.translate("forms:validation.number.max", { value })
    );
    return this;
  }

  public validateMultipleOf(base: number): NumberValidatorBuilder {
    this.validator = this.validator.test(
      "multipleOf",
      this.translate("forms:validation.number.multipleOf", { value: base }),
      (value) => !value || value % base === 0
    );
    return this;
  }
}

export default NumberValidatorBuilder;
