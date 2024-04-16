import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import SEO from "../../components/utilities/SEO";
import Alert from "../../components/atoms/Alert/Alert";
import { useAuth } from "../../contexts/AuthenticationContext/AuthenticationContext";
import CardLayout from "../../components/templates/Layout/CardLayout/CardLayout";
import Panel from "../../components/atoms/Panel/Panel";
import VerificationService from "../../services/VerificationService";

const VerifyEmailPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    query: { verificationToken },
  } = useRouter();
  const { user } = useAuth();
  const [success, setSuccess] = useState<boolean | undefined>();
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    if (verificationToken && !success && !error) {
      VerificationService()
        .verifyEmail(
          Array.isArray(verificationToken)
            ? verificationToken.join() // join if token is a string array
            : verificationToken
        )
        .then(() => {
          setSuccess(true);
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, [error, success, verificationToken]);

  return (
    <CardLayout title={t("verifyEmail:heading")}>
      <SEO title={t("verifyEmail:heading")} noIndex />
      <Panel>
        {!success && !error && <p>{t("verifyEmail:verificationInProgress")}</p>}
        {!verificationToken && (
          <Alert
            title={t(
              !user
                ? "verifyEmail:invalidLink"
                : "verifyEmail:verificationRequired"
            )}
            severity="warning"
            actions={
              !user
                ? [
                    {
                      text: t("verifyEmail:backToLogin"),
                      onClick: () => router.push("/login"),
                    },
                  ]
                : undefined
            }
          />
        )}
        {error && (
          <Alert
            title={t("verifyEmail:verificationFailed")}
            severity="error"
            actions={[
              {
                text: t("verifyEmail:toLogin"),
                onClick: () => router.push("/login"),
              },
            ]}
          >
            <p>{t("verifyEmail:invalidToken")}</p>
          </Alert>
        )}
        {success && (
          <Alert
            title={t("verifyEmail:verificationSuccessful")}
            severity="success"
            actions={[
              user
                ? {
                    text: t("verifyEmail:toDashboard"),
                    onClick: () => router.push("/dashboard"),
                  }
                : {
                    text: t("verifyEmail:toLogin"),
                    onClick: () => router.push("/login"),
                  },
            ]}
          >
            <p>{t("verifyEmail:verifiedEmail")}</p>
          </Alert>
        )}
      </Panel>
    </CardLayout>
  );
};

export default VerifyEmailPage;
