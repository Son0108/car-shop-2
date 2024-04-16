import { useEffect } from "react";
import { useAuth } from "../contexts/AuthenticationContext/AuthenticationContext";

const LogoutPage = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return null;
};

export default LogoutPage;
