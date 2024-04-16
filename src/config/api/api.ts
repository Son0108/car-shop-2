import axios from "axios";
import { AUTH_TOKEN_COOKIE, USER_LOCALE_COOKIE } from "../constants/cookies";
import CookieUtility from "../../utilities/CookieUtility";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
});

// Intercept every request and add authorization-header if a token is defined
api.interceptors.request.use((config) => {
  const customHeaders = {};

  const jwt = CookieUtility.get(AUTH_TOKEN_COOKIE);
  if (jwt) {
    Object.assign(customHeaders, { Authorization: `Bearer ${jwt}` });
  }

  const userLocale = CookieUtility.get(USER_LOCALE_COOKIE);
  if (userLocale) {
    Object.assign(customHeaders, {
      "Accept-Language": userLocale.split("-")[0],
    });
  }
  return {
    ...config,
    headers: {
      ...config.headers,
      ...customHeaders,
    },
  };
});

// return a fetcher based on the api constant to be used with the useSWR-hook.
export function fetcher<T>(url: string): Promise<T> {
  return api.get<T>(url).then((res) => res.data);
}

export default api;
