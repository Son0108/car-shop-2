import { useMemo } from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { useAuth } from "../../../contexts/AuthenticationContext/AuthenticationContext";
import Link from "../../atoms/Link/Link";
import SEO from "../../utilities/SEO";
import StackedLayout from "../Layout/StackedLayout/StackedLayout";
import Panel from "../../atoms/Panel/Panel";

const UnauthorizedScreen = () => {
  const { t } = useTranslation();
  const { token } = useAuth();

  const navigation = useMemo(
    () => (
      <nav>
        {!token && (
          <p>
            <Link href="/login">Login</Link> to access this page.
          </p>
        )}
        {token && (
          <p>
            Go to the <Link href="/dashboard">Dashboard</Link>.
          </p>
        )}
      </nav>
    ),
    [token]
  );

  return (
    <>
      <SEO noIndex />
      <StackedLayout title={t("common:unauthorized.title")}>
        <Panel noPadding>
          <div className="p-6 flex flex-col space-y-5 items-center">
            <Image
              className="object-contain"
              src="/images/unauthorized.png"
              width={600}
              height={600}
              loading="eager"
            />
            <h2 className="text-xl sm:text-3xl font-semibold">
              Scheint als hättest du dich verirrt
            </h2>
            {navigation}
          </div>
        </Panel>
      </StackedLayout>
    </>
  );
};

export default UnauthorizedScreen;
