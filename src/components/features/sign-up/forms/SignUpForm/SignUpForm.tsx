import { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import UserInformationForm, {
  IUserInformationFormValues,
} from "./Subforms/UserInformationForm";
import UserConsentForm, {
  IUserConsentFormValues,
} from "./Subforms/UserConsentForm";
import UserTypeForm, { IUserTypeFormValues } from "./Subforms/UserTypeForm";
import TenantForm, { ITenantFormValues } from "./Subforms/TenantForm";
import IndividualAgentForm, {
  IIndividualAgentFormValues,
} from "./Subforms/IndividualAgentForm";
import BusinessAgentForm, {
  IBusinessAgentFormValues,
} from "./Subforms/BusinessAgentForm";
import { IRadioOption } from "../../../../atoms/Inputs/RadioField/RadioField";
import { ICreateTenantDTO } from "../../../../../definitions/types/DTOs/CreateTenantDTO";
import { ICreateIndividualAgentDTO } from "../../../../../definitions/types/DTOs/CreateIndividualAgentDTO";
import { ICreateBusinessAgentDTO } from "../../../../../definitions/types/DTOs/CreateBusinessAgentDTO";
import { IAddressCreate } from "../../../../../definitions/types/models/Address";
import Stepper from "../../../../atoms/Stepper/Stepper";
import { Gender } from "../../../../../definitions/types/models/Gender";
import { LegalFormCategory } from "../../../../../definitions/types/models/LegalFormCategory";

export const USER_TYPE_TENANT = "TENANT";
export const USER_TYPE_AGENT = "AGENT";
export const USER_TYPE_BUSINESS_AGENT = "BUSINESS_AGENT";

export interface SignUpFormProps {
  chosenUserType?: string;
  createTenant: (values: ICreateTenantDTO) => Promise<void>;
  createIndividualAgent: (values: ICreateIndividualAgentDTO) => Promise<void>;
  createBusinessAgent: (values: ICreateBusinessAgentDTO) => Promise<void>;
  genders: Gender[];
  legalFormCategories: LegalFormCategory[];
  handleAddressValidation: (address: IAddressCreate) => Promise<IAddressCreate>;
  handleEmailValidation: (email: string) => Promise<void>;
}

const SignUpForm = ({
  chosenUserType,
  createTenant,
  createIndividualAgent,
  createBusinessAgent,
  genders,
  legalFormCategories,
  handleAddressValidation,
  handleEmailValidation,
}: SignUpFormProps) => {
  const { t } = useTranslation();
  // Available user-types in the userTypeForm
  const [availableUserTypes] = useState<IRadioOption[]>([
    {
      value: USER_TYPE_TENANT,
      name: t("signUp:userTypeForm.options.tenant.name"),
      description: t("signUp:userTypeForm.options.tenant.description"),
    },
    {
      value: USER_TYPE_AGENT,
      name: t("signUp:userTypeForm.options.agent.name"),
      description: t("signUp:userTypeForm.options.agent.description"),
    },
    {
      value: USER_TYPE_BUSINESS_AGENT,
      name: t("signUp:userTypeForm.options.businessAgent.name"),
      description: t("signUp:userTypeForm.options.businessAgent.description"),
    },
  ]);

  // Form progress- & data
  const [step, setStep] = useState(1);
  const [currentStep, setCurrentStep] = useState(1);

  const [userInformation, setUserInformation] = useState<
    IUserInformationFormValues | undefined
  >();
  const [userType, setUserType] = useState<string | undefined>();
  const [tenantData, setTenantData] = useState<ITenantFormValues | undefined>();
  const [individualAgentData, setIndividualAgentData] = useState<
    IIndividualAgentFormValues | undefined
  >();
  const [businessAgentData, setBusinessAgentData] = useState<
    IBusinessAgentFormValues | undefined
  >();
  const [userConsentData, setUserConsentData] = useState<
    IUserConsentFormValues | undefined
  >();

  const updateStep = (newStep: number) => {
    if (newStep > step) {
      setStep(newStep);
    }
    setCurrentStep(newStep);
  };

  const handleCredentialsForm = async (values: IUserInformationFormValues) => {
    try {
      await handleEmailValidation(values.email);
      setUserInformation(values);
      // If the SearchParam defining the user-type is set,
      // skip step 3 of the form.
      if (chosenUserType && chosenUserType === userType) {
        updateStep(3);
      } else {
        updateStep(2);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUserTypeForm = async (values: IUserTypeFormValues) => {
    setUserType(values.userType);
    updateStep(3);
  };

  const handleTenantForm = async (values: ITenantFormValues) => {
    const validatedAddress = await handleAddressValidation(values.address);
    setTenantData({
      ...values,
      address: validatedAddress,
    });
    updateStep(4);
  };

  const handleAgentForm = async (values: IIndividualAgentFormValues) => {
    const validatedAddress = await handleAddressValidation(values.address);
    setIndividualAgentData({
      ...values,
      address: validatedAddress,
    });
    updateStep(4);
  };

  const handleBusinessAgentForm = async (values: IBusinessAgentFormValues) => {
    const validatedAddress = await handleAddressValidation(
      values.company.address
    );
    setBusinessAgentData({
      ...values,
      company: {
        ...values.company,
        address: validatedAddress,
      },
    });
    updateStep(4);
  };

  const handleConsentForm = async (values: IUserConsentFormValues) => {
    setUserConsentData(values);

    if (userType === USER_TYPE_TENANT && userInformation && tenantData) {
      await createTenant({
        email: userInformation.email,
        password: userInformation.password,
        firstName: userInformation.firstName,
        lastName: userInformation.lastName,
        gender: userInformation.gender,
        birthDate: tenantData.birthDate,
        address: tenantData.address,
        phoneNumber: tenantData.phoneNumber,
      });
    } else if (
      userType === USER_TYPE_AGENT &&
      userInformation &&
      individualAgentData
    ) {
      await createIndividualAgent({
        email: userInformation.email,
        password: userInformation.password,
        firstName: userInformation.firstName,
        lastName: userInformation.lastName,
        gender: userInformation.gender,
        address: individualAgentData.address,
        phoneNumber: individualAgentData.phoneNumber,
      });
    } else if (
      userType === USER_TYPE_BUSINESS_AGENT &&
      userInformation &&
      businessAgentData
    ) {
      await createBusinessAgent({
        email: userInformation.email,
        password: userInformation.password,
        firstName: userInformation.firstName,
        lastName: userInformation.lastName,
        gender: userInformation.gender,
        company: businessAgentData.company,
      });
    } else {
      await alert("An error occurred");
    }
  };

  return (
    <div className="flex flex-col space-y-5">
      {currentStep === 1 && (
        <UserInformationForm
          genders={genders}
          handleSubmit={handleCredentialsForm}
          values={userInformation}
        />
      )}
      {currentStep === 2 && (
        <UserTypeForm
          userTypes={availableUserTypes}
          handleSubmit={handleUserTypeForm}
          values={userType ? { userType } : undefined}
        />
      )}
      {currentStep === 3 && userType === USER_TYPE_TENANT && (
        <TenantForm handleSubmit={handleTenantForm} values={tenantData} />
      )}
      {currentStep === 3 && userType === USER_TYPE_AGENT && (
        <IndividualAgentForm
          handleSubmit={handleAgentForm}
          values={individualAgentData}
        />
      )}
      {currentStep === 3 && userType === USER_TYPE_BUSINESS_AGENT && (
        <BusinessAgentForm
          handleSubmit={handleBusinessAgentForm}
          legalFormCategories={legalFormCategories}
          values={businessAgentData}
        />
      )}
      {currentStep === 4 && (
        <UserConsentForm
          handleSubmit={handleConsentForm}
          values={userConsentData}
        />
      )}
      <Stepper
        available={step}
        current={currentStep}
        setCurrentStep={setCurrentStep}
        steps={4}
      />
    </div>
  );
};

export default SignUpForm;
