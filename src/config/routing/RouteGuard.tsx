import { ReactNode, useMemo } from "react";
import { useRouter } from "next/router";
import { checkRouteAccess, IRouteConfiguration } from "./RouteAccessUtility";
import routingConfiguration from "../../../routing.json";
import { useAuth } from "../../contexts/AuthenticationContext/AuthenticationContext";
import LoadingScreen from "../../components/templates/LoadingScreen/LoadingScreen";
import UnauthorizedScreen from "../../components/templates/UnauthorizedScreen/UnauthorizedScreen";

interface RouteGuardProps {
  children: ReactNode;
}

const RouteGuard = ({ children }: RouteGuardProps) => {
  const { loading, roles, token, user } = useAuth();
  const router = useRouter();

  // Return a routing configuration for the current path
  const routeConfig = useMemo(() => {
    return routingConfiguration.find(
      (config: IRouteConfiguration) => config.route === router.pathname
    );
  }, [router.pathname]);

  const routeAccessGranted = useMemo(() => {
    // If no routeConfig is found for the current route assume one can enter it.
    if (!routeConfig) return true;
    return checkRouteAccess(
      routingConfiguration,
      router.pathname,
      token,
      roles.map((r) => r.name)
    );
  }, [roles, routeConfig, router.pathname, token]);

  // Show a loading-screen if a given route has a
  // configuration that requires the user to be authenticated
  if (routeConfig && routeConfig.authenticated && loading) {
    return <LoadingScreen />;
  }

  // Show unauthorized-screen if not authorized
  if (!routeAccessGranted) {
    // Show unauthorized if user is logged in
    if (user) {
      return <UnauthorizedScreen />;
    }
    // Prevent recursion if this occurs on /login
    if (router.pathname !== "/login") {
      router.push("/login");
    }
    return <LoadingScreen />;
  }

  return <>{children}</>;
};

export default RouteGuard;
