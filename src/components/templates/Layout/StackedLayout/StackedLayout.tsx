import { ReactNode } from "react";
import useTranslation from "next-translate/useTranslation";
import Footer from "../../../molecules/Footer/Footer";
import {
  getPrimaryNavigation,
  getSecondaryNavigation,
} from "../../../utilities/UserNavigation";
import Navbar from "../../../molecules/Navbar/Navbar";
import { useAuth } from "../../../../contexts/AuthenticationContext/AuthenticationContext";

/**
 * Props definition of the StackedLayout
 */
export interface StackedLayoutProps {
  /**
   * Items rendered as the main content
   */
  children?: ReactNode;
  /**
   * Title of the current page
   */
  title?: string;
}

/**
 * Stacked layout for the page.
 * Based on: https://tailwindui.com/components/application-ui/application-shells/stacked#component-2c220920c5e70d33aeaa56deb4df3f0e
 */
const StackedLayout = ({ children, title }: StackedLayoutProps) => {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        items={getPrimaryNavigation(t, user)}
        profile={getSecondaryNavigation(t, user)}
        title={title}
      />
      <main className="-mt-32 flex-grow">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StackedLayout;
