import * as Yup from "yup";
import { Translate } from "next-translate";
import FileUtility from "../../utilities/FileUtility";
import ValidatorBuilder from "./ValidatorBuilder";

/**
 * FileValidatorBuilder builds a YUP validation schema for a file input.
 */
class FileValidatorBuilder extends ValidatorBuilder<Yup.BaseSchema> {
  constructor(translate: Translate) {
    super(translate, Yup.mixed());
    this.validateAcceptableFile();
  }

  /**
   * Set a maximum size validation
   * @param maximumSize
   */
  public validateMaximumSize(maximumSize: number): FileValidatorBuilder {
    this.validator = this.validator.test(
      "fileSize",
      this.translate("forms:validation.file.size", {
        maximumSize: FileUtility.getReadableSize(maximumSize),
      }),
      (value: File) => !value || value.size <= maximumSize
    );
    return this;
  }

  /**
   * Set all accepted file format validation
   * @param acceptedFormats
   */
  public validateAcceptedFormats(
    acceptedFormats: string[]
  ): FileValidatorBuilder {
    this.validator = this.validator.test(
      "fileFormat",
      this.translate("forms:validation.file.badFormat"),
      (value) => !value || (value && acceptedFormats.includes(value.type))
    );
    return this;
  }

  /**
   * Add a validator that checks if the tested value is an actual file.
   */
  private validateAcceptableFile() {
    this.validator = this.validator.test(
      "isFile",
      this.translate("forms:validation.file.invalid"),
      (value) => !value || value instanceof File
    );
  }
}

export default FileValidatorBuilder;
