import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";
import SEO from "../components/utilities/SEO";
import Link from "../components/atoms/Link/Link";
import AutomaticLayout from "../components/templates/Layout/AutomaticLayout/AutomaticLayout";
import { useAuth } from "../contexts/AuthenticationContext/AuthenticationContext";
import Panel from "../components/atoms/Panel/Panel";

const NotFoundPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <AutomaticLayout title={t("common:notFound.title")}>
      <SEO title={t("common:notFound.title")} noIndex />
      <Panel>
        <div className="p-6 flex flex-col space-y-5 items-center">
          <Image
            className="object-contain"
            width={500}
            height={500}
            src="/images/not-found.png"
          />
          <h2 className="text-xl sm:text-3xl font-semibold">
            {t("common:notFound.text")}
          </h2>
          <nav>
            <p>
              <Trans
                i18nKey={
                  user
                    ? "common:notFound.toDashboard"
                    : "common:notFound.toLogin"
                }
                components={[<Link href={user ? "/dashboard" : "/login"} />]}
              />
            </p>
          </nav>
        </div>
      </Panel>
    </AutomaticLayout>
  );
};

export default NotFoundPage;
