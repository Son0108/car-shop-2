import { checkRouteAccess, IRouteConfiguration } from "./RouteAccessUtility";

describe("route-access", () => {
  it("should allow access when given an empty configuration", () => {
    expect(checkRouteAccess([], "/", undefined, [])).toBeTruthy();
  });

  it("should allow access to routes that require being authenticated, when a token is given", () => {
    const config: IRouteConfiguration[] = [
      {
        route: "/",
        authenticated: true,
      },
    ];
    expect(checkRouteAccess(config, "/", "token", [])).toBeTruthy();
  });

  it("should not allow access when no token is given", () => {
    const config: IRouteConfiguration[] = [
      {
        route: "/",
        authenticated: true,
      },
    ];
    expect(checkRouteAccess(config, "/", undefined, [])).toBeFalsy();
  });

  it("should not allow access when a role is required but no role is given", () => {
    const config: IRouteConfiguration[] = [
      {
        route: "/",
        authenticated: true,
        anyRoles: ["admin"],
      },
    ];
    expect(checkRouteAccess(config, "/", "token")).toBeFalsy();
  });

  it("should not allow access when a role is required and not present in given roles", () => {
    const config: IRouteConfiguration[] = [
      {
        route: "/",
        authenticated: true,
        anyRoles: ["admin"],
      },
    ];
    expect(
      checkRouteAccess(config, "/", "token", ["moderator", "user"])
    ).toBeFalsy();
  });

  it("should allow access when a role is required and given", () => {
    const config: IRouteConfiguration[] = [
      {
        route: "/",
        authenticated: true,
        anyRoles: ["admin"],
      },
    ];
    expect(
      checkRouteAccess(config, "/", "token", ["user", "moderator", "admin"])
    ).toBeTruthy();
  });

  it("should not check for role when unauthenticated", () => {
    const config: IRouteConfiguration[] = [
      {
        route: "/",
        authenticated: false,
        anyRoles: ["admin"],
      },
    ];
    expect(checkRouteAccess(config, "/")).toBeTruthy();
  });
});
