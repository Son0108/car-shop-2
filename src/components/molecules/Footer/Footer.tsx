import useTranslation from "next-translate/useTranslation";
import { useState } from "react";

const Footer = () => {
  const { t } = useTranslation();
  const [date] = useState(new Date(Date.now()));

  return (
    <footer>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <div className="border-t border-gray-300 py-8 text-sm text-gray-600 text-center sm:text-left">
          <span className="block sm:inline">
            &copy; {date.getFullYear()} {`${t("common:title")} `} - All rights
            reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
