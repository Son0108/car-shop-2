import { ReactNode, useMemo } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../contexts/AuthenticationContext/AuthenticationContext";
import UnverifiedEmailPage from "./status-handler-pages/UnverifiedEmailPage";
import UnverifiedPhonePage from "./status-handler-pages/UnverifiedPhonePage";
import LoadingScreen from "../../templates/LoadingScreen/LoadingScreen";

const COMPLETE_SIGN_UP_ROUTE = "/sign-up/complete-profile";

interface VerificationGuardProps {
  children?: ReactNode;
}

/**
 * The UserStatusHandler component wraps the entire page and prevents a user from
 * accessing the page if his status isn't COMPLETE.
 */
const UserStatusHandler = ({ children }: VerificationGuardProps) => {
  const router = useRouter();
  const { user } = useAuth();

  const statusContent = useMemo(() => {
    if (user && user.status === "UNVERIFIED_EMAIL") {
      return <UnverifiedEmailPage />;
    }

    if (user && user.status === "UNVERIFIED_PHONE") {
      return <UnverifiedPhonePage />;
    }

    // If the users status is incomplete redirect the user
    // to the complete-sign-up route and show the loading screen while redirecting
    if (
      user &&
      user.status === "INCOMPLETE" &&
      router.pathname !== COMPLETE_SIGN_UP_ROUTE
    ) {
      router.push(COMPLETE_SIGN_UP_ROUTE);
      return <LoadingScreen />;
    }

    return null;
  }, [router, user]);

  if (statusContent) return <>{statusContent}</>;

  return <>{children}</>;
};

export default UserStatusHandler;
