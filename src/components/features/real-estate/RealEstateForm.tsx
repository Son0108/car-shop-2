import { Form, Formik, FormikProps } from "formik";
import useTranslation from "next-translate/useTranslation";
import * as Yup from "yup";
import React from "react";
import { RealEstateCreate } from "../../../definitions/types/models/RealEstate";
import TextField from "../../atoms/Inputs/TextField/TextField";
import AddressField from "../../atoms/Inputs/AddressField/AddressField";
import PriceField from "../../atoms/Inputs/PriceField/PriceField";
import NumberField from "../../atoms/Inputs/NumberField/NumberField";
import Button from "../../atoms/Button/Button";
import ImageField from "../../atoms/Inputs/ImageField/ImageField";
import FileValidatorBuilder from "../../../helpers/validators/FileValidatorBuilder";
import {
  ACCEPTED_IMAGE_FORMATS,
  MAXIMUM_FILE_SIZE,
} from "../../../config/constants/file-config";
import { IFile } from "../../../definitions/types/models/File";
import NumberValidatorBuilder from "../../../helpers/validators/NumberValidatorBuilder";
import { FormikSubmitHandler } from "../../../helpers/FormikSubmitHandler";
import SwitchField from "../../atoms/Inputs/SwitchField/SwitchField";

export interface RealEstateFormValues extends RealEstateCreate {
  image?: File;
}

export interface RealEstateFormProps {
  /**
   * Persisted image for the current real-estate
   */
  realEstateImage?: IFile;
  /**
   * default value for the form based on an existing real-estate
   */
  realEstate?: RealEstateFormValues;
  /**
   * submit handler for the real-estate form
   * @param values
   */
  handleSubmit: FormikSubmitHandler<RealEstateFormValues>;
}

const RealEstateForm = ({
  realEstateImage,
  realEstate,
  handleSubmit,
}: RealEstateFormProps) => {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t("forms:validation.required")),
    rooms: new NumberValidatorBuilder(t)
      .validatePositiveValue()
      .validateMultipleOf(0.5)
      .validateRequired()
      .build(),
    space: Yup.number()
      .positive(t("realEstates:validation.positiveNumericValue"))
      .required(t("forms:validation.required")),
    grossRent: Yup.number()
      .positive(t("realEstates:validation.positiveNumericValue"))
      .required(t("forms:validation.required")),
    netRent: Yup.number()
      .positive(t("realEstates:validation.positiveNumericValue"))
      .test(
        "test netRent is less than grossRent",
        t("realEstates:validation.largerThanGross"),
        (value, { parent: { grossRent } }) => {
          if (value && grossRent) {
            return value <= grossRent;
          }
          return true;
        }
      )
      .required(t("forms:validation.required")),
    realEstateReferenceLink: Yup.string()
      .url(t("forms:validation.url"))
      .matches(
        /^(https?:\/\/(.+?\.)?(homegate\.ch|immoscout24\.ch)(\/[A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=]*)?)$/,
        t("realEstates:validation.referenceLink")
      ),
    image: new FileValidatorBuilder(t)
      .validateMaximumSize(MAXIMUM_FILE_SIZE)
      .validateAcceptedFormats(ACCEPTED_IMAGE_FORMATS)
      // If no real-estate image is present require a file to be set
      .validateRequired(realEstateImage === undefined)
      .build(),
  });

  return (
    <Formik
      initialValues={
        realEstate || {
          name: "",
          rooms: 0,
          space: 0,
          grossRent: 0.0,
          netRent: 0.0,
          address: {
            street: "",
            city: "",
            postCode: "",
            country: "",
          },
          realEstateReferenceLink: "",
          image: undefined,
          published: false,
        }
      }
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(props: FormikProps<RealEstateFormValues>) => (
        <Form>
          <div className="grid lg:grid-cols-2 gap-5">
            <div className="flex flex-col space-y-5">
              <TextField
                label={t("realEstates:fields.name")}
                name="name"
                required
              />
              <AddressField
                label={t("forms:fields.address")}
                name="address"
                required
                placeholder={{
                  street: t("forms:fields.street"),
                  postCode: t("forms:fields.postCode"),
                  city: t("forms:fields.city"),
                  country: t("forms:fields.country"),
                }}
                subLabels={{
                  street: t("forms:fields.street"),
                  postCode: t("forms:fields.postCode"),
                  city: t("forms:fields.city"),
                  country: t("forms:fields.country"),
                }}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <NumberField
                  label={t("realEstates:fields.rooms")}
                  name="rooms"
                  required
                />
                <NumberField
                  label={t("realEstates:fields.space")}
                  name="space"
                  required
                  unit="m²"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PriceField
                  label={t("realEstates:fields.grossRent")}
                  name="grossRent"
                  currency="CHF"
                  required
                />
                <PriceField
                  label={t("realEstates:fields.netRent")}
                  name="netRent"
                  currency="CHF"
                  required
                />
              </div>
              <TextField
                label={t("realEstates:fields.referenceLink")}
                name="realEstateReferenceLink"
                type="url"
              />
              <div className="py-2">
                <SwitchField
                  id="publishedInput"
                  name="published"
                  label={t("realEstates:fields.published")}
                />
              </div>
            </div>
            <div className="sm:min-h-screen-30 space-y-5">
              <ImageField
                acceptedFormats={ACCEPTED_IMAGE_FORMATS}
                id="real-estate-image-input"
                maximumSize={MAXIMUM_FILE_SIZE}
                name="image"
                label={t("realEstates:fields.image")}
                required={realEstateImage === undefined}
                persistedValue={realEstateImage}
              />
            </div>
            <div>
              <Button
                disabled={!props.dirty || !props.isValid}
                loading={props.isSubmitting}
                type="submit"
              >
                {t(
                  realEstate ? "forms:actions.update" : "forms:actions.create"
                )}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RealEstateForm;
