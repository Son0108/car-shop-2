import useTranslation from "next-translate/useTranslation";
import React from "react";
import { useRouter } from "next/router";
import { FormikHelpers } from "formik";
import LoginForm, {
  LoginFormValues,
} from "../components/organisms/LoginForm/LoginForm";
import { useAuth } from "../contexts/AuthenticationContext/AuthenticationContext";
import SEO from "../components/utilities/SEO";
import CardLayout from "../components/templates/Layout/CardLayout/CardLayout";
import Panel from "../components/atoms/Panel/Panel";
import Link from "../components/atoms/Link/Link";
import { isAPIError } from "../config/api/api-error";
import { handleAPIErrorResponse } from "../helpers/errors/APIErrorHandler";
import { useNotifier } from "../contexts/NotificationContext/NotificationContext";

const LoginPage = () => {
  const {
    query: { redirect },
  } = useRouter();
  const { t } = useTranslation();
  const { notify } = useNotifier();
  const { login } = useAuth();

  const handleLogin = async (
    values: LoginFormValues,
    helpers: FormikHelpers<LoginFormValues>
  ) => {
    try {
      await login(values.email, values.password, {
        rememberMe: values.rememberMe,
        redirect: Array.isArray(redirect) ? redirect.join("") : redirect,
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

  return (
    <CardLayout title={t("login:heading")}>
      <SEO title={t("login:heading")} />
      <Panel>
        <LoginForm handleSubmit={handleLogin} />
        <div className="flex flex-col justify-between items-center flex-wrap mt-2">
          <Link href="/forgot-password" className="text-sm" variant="text">
            {t("login:forgotPassword")}
          </Link>
        </div>
        <div className="relative my-4">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 bg-white text-sm text-gray-500">
              {t("login:or")}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center flex-wrap mt-2">
          <p className="text-base inline-block text-center">
            {t("login:noAccountYet")}{" "}
            <Link href="/sign-up" variant="text">
              {t("login:signUpLink")}
            </Link>
          </p>
        </div>
      </Panel>
    </CardLayout>
  );
};

export default LoginPage;
