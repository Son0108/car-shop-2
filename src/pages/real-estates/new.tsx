import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { FormikHelpers } from "formik";
import StackedLayout from "../../components/templates/Layout/StackedLayout/StackedLayout";
import SEO from "../../components/utilities/SEO";
import RealEstateForm, {
  RealEstateFormValues,
} from "../../components/features/real-estate/RealEstateForm";
import RealEstateService from "../../services/RealEstateService";
import { useNotifier } from "../../contexts/NotificationContext/NotificationContext";
import Panel from "../../components/atoms/Panel/Panel";
import validateAddress from "../../components/utilities/validateAddress";
import { RealEstateCreate } from "../../definitions/types/models/RealEstate";
import { isAPIError } from "../../config/api/api-error";
import { handleAPIErrorResponse } from "../../helpers/errors/APIErrorHandler";
import InvalidAddressException from "../../helpers/errors/InvalidAddressException";

const NewRealEstatePage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { notify } = useNotifier();

  const handleSubmit = async (
    values: RealEstateFormValues,
    helpers: FormikHelpers<RealEstateFormValues>
  ) => {
    try {
      const sanitizedAddress = await validateAddress(values.address);

      // Construct request-body that is used to create the real-estate
      const createRealEstate: RealEstateCreate = {
        name: values.name,
        space: values.space,
        rooms: values.rooms,
        grossRent: values.grossRent,
        netRent: values.netRent,
        realEstateReferenceLink: values.realEstateReferenceLink,
        address: sanitizedAddress,
        published: values.published,
      };

      const data = await RealEstateService().createRealEstate(
        createRealEstate,
        values.image
      );

      notify({
        title: t("notifications:realEstateCreated"),
        severity: "success",
      });

      await router.push(`/real-estates/${data.id}`);
    } catch (err) {
      if (isAPIError(err)) {
        handleAPIErrorResponse(err, {
          helpers,
          notify,
        });
      } else if (err instanceof InvalidAddressException) {
        helpers.setFieldError("address", t("forms:validation.address.invalid"));
      }
    }
  };

  return (
    <StackedLayout title={t("realEstates:headings.new")}>
      <SEO title={t("realEstates:headings.new")} noIndex />
      <Panel>
        <RealEstateForm handleSubmit={handleSubmit} />
      </Panel>
    </StackedLayout>
  );
};

export default NewRealEstatePage;
