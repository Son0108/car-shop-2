import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import {
  CashIcon,
  CollectionIcon,
  DocumentIcon,
  KeyIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import { useEffect, useMemo } from "react";
import useSWR from "swr";
import { FormikHelpers } from "formik";
import StackedLayout from "../components/templates/Layout/StackedLayout/StackedLayout";
import Panel from "../components/atoms/Panel/Panel";
import { useAuth } from "../contexts/AuthenticationContext/AuthenticationContext";
import { User, UserFullyDressed } from "../definitions/types/models/User";
import SEO from "../components/utilities/SEO";
import UserService from "../services/UserService";
import UpdatePasswordForm, {
  UpdatePasswordFormValues,
} from "../components/organisms/UpdatePaswordForm/UpdatePasswordForm";
import Heading from "../components/atoms/Heading/Heading";
import { useNotifier } from "../contexts/NotificationContext/NotificationContext";
import VerticalNavigation from "../components/atoms/VerticalNavigation/VerticalNavigation";
import { VerticalNavigationItem } from "../components/atoms/VerticalNavigation/VerticalNavigationItem";
import { Gender } from "../definitions/types/models/Gender";
import { LegalFormCategory } from "../definitions/types/models/LegalFormCategory";
import ProfileForm, {
  ProfileFormValues,
} from "../components/features/profile/forms/ProfileForm";
import QuestionnaireTab from "../components/features/profile/tabs/QuestionnaireTab/QuestionnaireTab";
import { isAPIError } from "../config/api/api-error";
import { handleAPIErrorResponse } from "../helpers/errors/APIErrorHandler";
import validateAddress from "../components/utilities/validateAddress";
import InvalidAddressException from "../helpers/errors/InvalidAddressException";
import { FormikSubmitHandler } from "../helpers/FormikSubmitHandler";
import DocumentsTab from "../components/features/profile/tabs/DocumentsTab/DocumentsTab";
import PaymentsTab from "../components/features/profile/tabs/PaymentsTab/PaymentsTab";

const ProfilePage = () => {
  const router = useRouter();
  const { tab } = router.query;
  const { t } = useTranslation();
  const { avatar, user, mutate, isBusinessAgent, isTenant, isAgent } =
    useAuth();
  const { notify } = useNotifier();
  const { data: genders, error: gendersError } =
    useSWR<Gender[]>("/gender-categories");

  const { data: legalForms, error: legalFormsError } = useSWR<
    LegalFormCategory[]
  >("/legal-form-categories");

  // If the user enters the page the section query being set
  // set the query to 'profile' by updating the route
  useEffect(() => {
    if (tab === undefined || tab === "") {
      router.push({
        pathname: "/profile",
        query: {
          tab: "profile",
        },
      });
    }
  }, [router, tab]);

  const updateUser: FormikSubmitHandler<ProfileFormValues> = async (
    values: ProfileFormValues,
    helpers: FormikHelpers<ProfileFormValues>
  ) => {
    try {
      let sanitizedAddress;
      if (!isBusinessAgent && values.address) {
        sanitizedAddress = await validateAddress({
          street: values.address.street,
          postCode: values.address.postCode,
          city: values.address.city,
          country: values.address.country,
        });
      }

      const updatedUser = await UserService().updateOwnUser({
        ...values,
        phoneNumber: !isBusinessAgent ? values.phoneNumber : null,
        address:
          values.address && sanitizedAddress
            ? {
                id: values.address.id,
                ...sanitizedAddress,
              }
            : null,
      });

      const updatedFullyDressedUser: UserFullyDressed = {
        ...(user as UserFullyDressed),
        ...updatedUser,
      };

      // Force update of all SWR hooks that retrieve the active-user
      await mutate(updatedFullyDressedUser);

      notify({
        title: t("profile:messages.updateProfile.success"),
        severity: "success",
      });
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

  const updatePassword = async (
    values: UpdatePasswordFormValues,
    helpers: FormikHelpers<UpdatePasswordFormValues>
  ) => {
    try {
      await UserService().updateOwnPassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
      notify({
        title: t("profile:messages.updatePassword.success"),
        severity: "success",
      });
    } catch (err) {
      if (isAPIError(err)) {
        handleAPIErrorResponse(err, {
          notify,
          helpers,
        });
      }
    }
  };

  // Tab navigation
  const navigationItems: VerticalNavigationItem[] = useMemo(() => {
    const items: VerticalNavigationItem[] = [
      {
        icon: UserCircleIcon,
        href: "/profile?tab=profile",
        text: t("profile:tabs.profile"),
      },
    ];

    items.push({
      icon: KeyIcon,
      href: "/profile?tab=password",
      text: t("profile:tabs.password"),
    });

    if (isAgent) {
      items.push({
        icon: CashIcon,
        href: "/profile?tab=payments",
        text: t("profile:tabs.payments"),
      });
    }

    if (isTenant) {
      items.push({
        icon: CollectionIcon,
        href: "/profile?tab=questionnaire",
        text: t("profile:tabs.questionnaire"),
      });
      items.push({
        icon: DocumentIcon,
        href: "/profile?tab=documents",
        text: t("profile:tabs.documents"),
      });
    }

    return items;
  }, [isAgent, isTenant, t]);

  return (
    <StackedLayout title={t("profile:heading.title")}>
      <SEO title={t("profile:heading.title")} />
      <Panel
        loading={
          (!genders && !gendersError) || (!legalForms && !legalFormsError)
        }
      >
        <div className="grid gap-4 md:grid-cols-4">
          <VerticalNavigation items={navigationItems} />
          <div className="md:col-span-3">
            {tab === "profile" && (
              <div>
                <Heading className="mb-4" variant="h4" as="h2">
                  {t("profile:heading.yourProfile")}
                </Heading>
                {genders && legalForms && (
                  <ProfileForm
                    avatar={avatar}
                    isBusinessAgent={isBusinessAgent}
                    genders={genders}
                    legalFormCategories={legalForms}
                    user={
                      {
                        ...user,
                        activities: undefined,
                        roles: undefined,
                      } as User
                    }
                    handleSubmit={updateUser}
                  />
                )}
              </div>
            )}
            {tab === "password" && (
              <div>
                <Heading className="mb-4" variant="h4" as="h2">
                  {t("profile:heading.updatePassword")}
                </Heading>
                <UpdatePasswordForm handleSubmit={updatePassword} />
              </div>
            )}
            {isTenant && tab === "questionnaire" && <QuestionnaireTab />}
            {isTenant && tab === "documents" && <DocumentsTab />}
            {isAgent && tab === "payments" && <PaymentsTab />}
          </div>
        </div>
      </Panel>
    </StackedLayout>
  );
};

export default ProfilePage;
