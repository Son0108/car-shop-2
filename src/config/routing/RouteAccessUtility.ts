export interface IRouteConfiguration {
  route: string;
  authenticated: boolean;
  anyRoles?: string[];
}

/**
 * check if the given route can be accessed with the given details
 * @param routingConfiguration which is searched for the route-guards
 * @param route that is wished to be accessed
 * @param token of the active user
 * @param roles of the active user
 */
export function checkRouteAccess(
  routingConfiguration: IRouteConfiguration[],
  route: string,
  token?: string,
  roles?: string[]
): boolean {
  // try to find a RouteGuard-configuration for the searched route
  const config: IRouteConfiguration | undefined = routingConfiguration.find(
    (routeConfig) => routeConfig.route === route
  );
  if (config) {
    // If the route requires a specific authentication state but the given authentication state is different
    if (config.authenticated !== Boolean(token)) {
      return false;
    }

    // If a role is required to access the page
    if (config.authenticated && config.anyRoles) {
      // If a role is required but no roles are given
      if (!roles) {
        return false;
      }
      // Iterate the needed and the given roles. If a match is found, allow access
      return config.anyRoles.some((neededRole) => {
        return roles.includes(neededRole);
      });
    }
  }

  return true;
}

const RouteAccessUtility = {
  checkRouteAccess,
};

export default RouteAccessUtility;
