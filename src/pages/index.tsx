import useTranslation from "next-translate/useTranslation";
import { GetServerSideProps } from "next";
import Heading from "../components/atoms/Heading/Heading";
import { AUTH_TOKEN_COOKIE } from "../config/constants/cookies";

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <Heading variant="h1">
      {t("home:welcome", { title: t("common:title") })}
    </Heading>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req: { cookies },
}) => {
  if (cookies && cookies[AUTH_TOKEN_COOKIE]) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};

export default IndexPage;
