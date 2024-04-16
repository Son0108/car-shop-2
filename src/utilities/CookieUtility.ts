import Cookies, { CookieAttributes } from "js-cookie";

/**
 * CookieUtility is a wrapper class that can be used to interact with cookies.
 */
class CookieUtility {
  private static readonly defaultOptions: CookieAttributes = {
    secure: process.env.NEXT_PUBLIC_USE_HTTPS === "true",
    sameSite: "strict",
  };

  public static set(name: string, value: string, options?: CookieAttributes) {
    Cookies.set(name, value, this.combineOptions(options));
  }

  public static get(name: string): string | undefined {
    return Cookies.get(name);
  }

  public static remove(name: string) {
    Cookies.remove(name);
  }

  private static combineOptions(options?: CookieAttributes): CookieAttributes {
    return {
      ...CookieUtility.defaultOptions,
      ...options,
    };
  }
}

export default CookieUtility;
