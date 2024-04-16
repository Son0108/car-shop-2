import { Translate } from "next-translate";
import * as Yup from "yup";
import { Maybe } from "yup/lib/types";
import Reference from "yup/lib/Reference";

/**
 * Base class for all validator builders
 */
abstract class ValidatorBuilder<T extends Yup.AnySchema> {
  protected validator: T;

  protected readonly translate: Translate;

  protected constructor(translate: Translate, validator: T) {
    this.translate = translate;
    this.validator = validator;
  }

  public validateRequired(value = true): this {
    if (!value) return this;
    this.validator = this.validator.required(
      this.translate("forms:validation.required")
    );
    return this;
  }

  public build(): T {
    return this.validator;
  }

  public validateOneOf<U>(
    values: Array<Maybe<U> | Reference>,
    error: string = this.translate("forms:validation.selectAvailableValue")
  ): this {
    // Null and undefined are added to return true if no value is given.
    // If there must be a value .validateRequired must be chained.
    this.validator = this.validator.oneOf([...values, null, undefined], error);
    return this;
  }
}

export default ValidatorBuilder;
