import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import useSWR from "swr";
import SEO from "../../components/utilities/SEO";
import SignUpForm from "../../components/features/sign-up/forms/SignUpForm/SignUpForm";
import { ICreateTenantDTO } from "../../definitions/types/DTOs/CreateTenantDTO";
import { ICreateIndividualAgentDTO } from "../../definitions/types/DTOs/CreateIndividualAgentDTO";
import { ICreateBusinessAgentDTO } from "../../definitions/types/DTOs/CreateBusinessAgentDTO";
import CardLayout from "../../components/templates/Layout/CardLayout/CardLayout";
import UserService from "../../services/UserService";
import { useNotifier } from "../../contexts/NotificationContext/NotificationContext";
import Panel from "../../components/atoms/Panel/Panel";
import { Gender } from "../../definitions/types/models/Gender";
import api from "../../config/api/api";
import { LegalFormCategory } from "../../definitions/types/models/LegalFormCategory";
import validateAddress from "../../components/utilities/validateAddress";
import { isAPIError } from "../../config/api/api-error";
import { handleAPIErrorResponse } from "../../helpers/errors/APIErrorHandler";

const SignUpPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { notify } = useNotifier();
  const { data: genders, error: gendersError } =
    useSWR<Gender[]>("/gender-categories");
  const { data: legalForms, error: legalFormsError } = useSWR<
    LegalFormCategory[]
  >("/legal-form-categories");

  const handleSignUpSuccess = async (email: string) => {
    notify({
      message: t("signUp:success.text.emailSent", { email }),
      title: t("signUp:success.heading"),
      severity: "success",
    });
    router.push("/login");
  };

  /**
   * validate that the email is not already registered
   * @param email that should be validated
   */
  const validateEmail = async (email: string) => {
    try {
      await api.get(`/users/checkEmail/${encodeURIComponent(email)}`);
    } catch (err) {
      if (isAPIError(err)) {
        handleAPIErrorResponse(err, {
          notify,
        });
        // Pass error to prevent continuation of sing-up
        throw err;
      }
    }
  };

  const createTenant = async (values: ICreateTenantDTO) => {
    try {
      await UserService().createTenant(values);
      await handleSignUpSuccess(values.email);
    } catch (e: any) {
      throw new Error(e);
    }
  };

  const createIndividualAgent = async (values: ICreateIndividualAgentDTO) => {
    try {
      await UserService().createIndividualAgent(values);
      await handleSignUpSuccess(values.email);
    } catch (e: any) {
      throw new Error(e);
    }
  };

  const createBusinessAgent = async (values: ICreateBusinessAgentDTO) => {
    try {
      await UserService().createBusinessAgent(values);
      await handleSignUpSuccess(values.email);
    } catch (e: any) {
      throw new Error(e);
    }
  };

  return (
    <CardLayout title={t("signUp:heading.credentials")}>
      <SEO title={t("signUp:heading.credentials")} />
      <Panel>
        {genders && !gendersError && legalForms && !legalFormsError && (
          <SignUpForm
            genders={genders}
            legalFormCategories={legalForms}
            handleAddressValidation={validateAddress}
            handleEmailValidation={validateEmail}
            createTenant={createTenant}
            createIndividualAgent={createIndividualAgent}
            createBusinessAgent={createBusinessAgent}
          />
        )}
      </Panel>
    </CardLayout>
  );
};

export default SignUpPage;
