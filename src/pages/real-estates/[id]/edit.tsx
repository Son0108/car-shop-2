import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import useTranslation from "next-translate/useTranslation";
import { useMemo } from "react";
import { FormikHelpers } from "formik";
import {
  RealEstate,
  RealEstateUpdate,
} from "../../../definitions/types/models/RealEstate";
import StackedLayout from "../../../components/templates/Layout/StackedLayout/StackedLayout";
import SEO from "../../../components/utilities/SEO";
import Panel from "../../../components/atoms/Panel/Panel";
import { useNotifier } from "../../../contexts/NotificationContext/NotificationContext";
import RealEstateService from "../../../services/RealEstateService";
import RealEstateForm, {
  RealEstateFormValues,
} from "../../../components/features/real-estate/RealEstateForm";
import validateAddress from "../../../components/utilities/validateAddress";
import { handleAPIErrorResponse } from "../../../helpers/errors/APIErrorHandler";
import { isAPIError } from "../../../config/api/api-error";
import InvalidAddressException from "../../../helpers/errors/InvalidAddressException";

const RealEstateEditPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation();
  const title = t("realEstates:headings.edit");
  const { notify } = useNotifier();

  const { data: realEstate, error: realEstateError } = useSWR<RealEstate>(
    `/real-estates/own/${id}`
  );

  const handleSubmit = async (
    values: RealEstateFormValues,
    helpers: FormikHelpers<RealEstateFormValues>
  ) => {
    try {
      if (!realEstate) return;
      const sanitizedAddress = await validateAddress(values.address);

      const updatedRealEstate: RealEstateUpdate = {
        id: realEstate.id,
        name: values.name,
        space: values.space,
        rooms: values.rooms,
        grossRent: values.grossRent,
        netRent: values.netRent,
        realEstateReferenceLink: values.realEstateReferenceLink,
        address: {
          id: realEstate.address.id,
          ...sanitizedAddress,
        },
        published: values.published,
      };

      const data = await RealEstateService().updateRealEstate(
        updatedRealEstate,
        values.image
      );

      notify({
        title: t("notifications:realEstateUpdated"),
        severity: "success",
      });

      await mutate(`/real-estates/${data.id}`);
      await router.push(`/real-estates/${data.id}`);
    } catch (err) {
      if (isAPIError(err)) {
        handleAPIErrorResponse(err, {
          notify,
          helpers,
        });
      } else if (err instanceof InvalidAddressException) {
        helpers.setFieldError("address", t("forms:validation.address.invalid"));
      }
    }
  };

  const defaultFormValues = useMemo(() => {
    if (!realEstate) return undefined;

    // Create a object containing the form values based on the real-estate
    // that should be updated
    const values: RealEstateFormValues = {
      name: realEstate.name,
      rooms: realEstate.rooms,
      space: realEstate.space,
      grossRent: realEstate.grossRent,
      netRent: realEstate.netRent,
      realEstateReferenceLink: realEstate.realEstateReferenceLink,
      image: undefined,
      address: {
        street: realEstate.address.street,
        postCode: realEstate.address.postCode,
        city: realEstate.address.city,
        country: realEstate.address.country,
      },
      published: realEstate.published,
    };
    return values;
  }, [realEstate]);

  return (
    <StackedLayout title={title}>
      <SEO noIndex title={title} />
      <Panel loading={!realEstate && !realEstateError}>
        <RealEstateForm
          realEstate={defaultFormValues}
          realEstateImage={realEstate && realEstate.realEstateImage}
          handleSubmit={handleSubmit}
        />
      </Panel>
    </StackedLayout>
  );
};

export default RealEstateEditPage;
