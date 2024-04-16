import useTranslation from "next-translate/useTranslation";
import Heading from "../../../../atoms/Heading/Heading";

const PaymentsTab = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Heading variant="h4" as="h2">
        {t("profile:heading.payments")}
      </Heading>
    </div>
  );
};

export default PaymentsTab;
