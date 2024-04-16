import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { useMemo } from "react";

export interface ISEOProps {
  /**
   * meta description of the current page
   */
  description?: string;
  /**
   * defined if the current page should be followed or not.
   */
  noFollow?: boolean;
  /**
   * define if the current page should not be indexed
   */
  noIndex?: boolean;
  /**
   * title of the website
   */
  title?: string;
}

const SEO = ({
  description,
  noFollow = false,
  noIndex = false,
  title,
}: ISEOProps) => {
  const { pathname } = useRouter();
  const { t } = useTranslation();

  // canonicalURL of the current page
  const canonicalURL = useMemo(() => {
    if (!process.env.NEXT_PUBLIC_URL) return undefined;
    return process.env.NEXT_PUBLIC_URL + pathname;
  }, [pathname]);

  return (
    <NextSeo
      title={title || t("common:title")}
      titleTemplate={
        title && pathname !== "/" ? `%s | ${t("common:title")}` : undefined
      }
      canonical={canonicalURL}
      description={description}
      nofollow={noFollow}
      noindex={noIndex}
    />
  );
};

export default SEO;
