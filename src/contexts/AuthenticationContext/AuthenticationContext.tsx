import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import useSWR, { cache } from "swr";
import { UserFullyDressed } from "../../definitions/types/models/User";
import { Role } from "../../definitions/types/models/Role";
import { useNotifier } from "../NotificationContext/NotificationContext";
import JWTUtility from "../../utilities/JWTUtility/JWTUtility";
import AuthenticationService from "../../services/AuthenticationService";
import FileUtility from "../../utilities/FileUtility";
import { AUTH_TOKEN_COOKIE, USER_LOCALE_COOKIE } from "../../config/constants/cookies";
import CookieUtility from "../../utilities/CookieUtility";
import { DEFAULT_AVATAR } from "../../config/constants/placeholders";

/**
 * LoginOptions to remember the signed in user and an optional
 * redirect after successfully logging in
 */
interface LoginOptions {
  rememberMe?: boolean;
  redirect?: string;
}

/**
 * Values provided by the AuthenticationContext
 */
interface IAuthenticationContextValues {
  isTenant: boolean;
  isAgent: boolean;
  isIndividualAgent: boolean;
  isBusinessAgent: boolean;
  /**
   * state of the active-user context
   * the application is available for use as soon
   * as this has been resolved to true
   */
  loading?: boolean;
  /**
   * token used to authenticate the user
   */
  token: string | undefined;
  /**
   * data of the active-user
   */
  user: UserFullyDressed | undefined;
  mutate: (
    data?: UserFullyDressed,
    shouldRevalidate?: boolean
  ) => Promise<UserFullyDressed | undefined>;
  /**
   * roles of the active-user
   */
  roles: Role[];
  /**
   * callback to login a user based on the given credentials
   * @param email of the user
   * @param password of the user
   * @param loginOptions define if the user should be remembered or if the user should be redirected after login
   */
  login: (
    email: string,
    password: string,
    loginOptions: LoginOptions
  ) => Promise<void>;
  /**
   * callback to logout the active user
   */
  logout: () => Promise<void>;
  /**
   * URL to the avatar of the active user.
   */
  avatar: string;
}

/**
 * The AuthenticationContext holds information regarding the currently
 * active user and methods to update it.
 */
export const AuthenticationContext =
  createContext<IAuthenticationContextValues>(
    {} as IAuthenticationContextValues
  );

export const useAuth = () => {
  return useContext(AuthenticationContext);
};

interface IProps {
  /**
   * Child-elements wrapper by the provider
   */
  children?: ReactNode;
}

// TODO: Evaluate best behaviour if the user could not be loaded

/**
 * AuthenticationContextProvider holds the data of the currently active user
 * and provides methods to manipulate the user.
 */
const AuthenticationCTXProvider = ({ children }: IProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { notify } = useNotifier();
  const [initialized, setInitialized] = useState(false);
  const [token, setToken] = useState<string | undefined>();

  /**
   * Logout the currently active-user.
   */
  const logout = useCallback(async () => {
    CookieUtility.remove(AUTH_TOKEN_COOKIE);
    // Delete SWR cache
    // This prevents the showing of cached results for shared URLs.
    cache.clear();

    setToken(undefined);
    await router.push("/login");
  }, [router]);

  const {
    data: user,
    error: userError,
    mutate: mutateUser,
  } = useSWR<UserFullyDressed>(token ? "/users/own" : null, {
    // If there is an error while trying to fetch the user logout the session
    onError: () => {
      notify({
        title: t("notifications:logonError"),
        severity: "error",
      });
      logout();
    },
  });

  /**
   * Login a user
   * @param email credential
   * @param password credential
   * @param loginOptions option to remember the logged in user or to redirect
   * after a successful login
   */
  const login = async (
    email: string,
    password: string,
    loginOptions?: LoginOptions
  ) => {
    const { jwt, data: activeUser } = await AuthenticationService().login(
      email,
      password
    );

    await mutateUser(activeUser, false);
    let expiration: Date | undefined;
    if (loginOptions && loginOptions?.rememberMe) {
      expiration = JWTUtility.getExpirationDate(jwt);
    }

    CookieUtility.set(AUTH_TOKEN_COOKIE, jwt, {
      expires: expiration,
    });

    setToken(jwt);

    await router.push(
      loginOptions && loginOptions.redirect
        ? loginOptions.redirect
        : "/dashboard"
    );
    notify({
      title: t("notifications:loginSuccess"),
      severity: "success",
    });
  };

  /**
   * When the Provider is initialized check if a JWT is present in the storage.
   * If so set the token equal to the token component-state.
   * If not set the Provider as initialized.
   */
  useEffect(() => {
    if (!initialized && !token) {
      const jwt = CookieUtility.get(AUTH_TOKEN_COOKIE);
      // check if JWT is expired
      if (jwt && JWTUtility.checkIfIsExpired(jwt)) {
        notify({
          title: t("errors:SESSION_EXPIRED"),
          severity: "error",
        });
        logout().then(() => {
          router.push("/login");
        });
        return;
      }
      setToken(jwt);
    }
    setInitialized(true);
  }, [notify, initialized, logout, router, t, token]);

  /**
   * Update the user-locale cookie whenever the chosen local changes.
   */
  useEffect(() => {
    if (router.locale) {
      CookieUtility.set(USER_LOCALE_COOKIE, router.locale);
    } else {
      CookieUtility.remove(USER_LOCALE_COOKIE);
    }
  }, [router.locale]);

  // If an avatar is persisted return it's URL or else return the default avatar.
  const avatar = useMemo(() => {
    if (user && user.avatar) {
      return FileUtility.getImageURL(user.avatar.name);
    }
    return DEFAULT_AVATAR;
  }, [user]);

  const checkIfUserHasRole = (searchedRole: string, roles?: Role[]) => {
    if (!roles) {
      return false;
    }
    return roles.map((role) => role.name).includes(searchedRole);
  };

  const isTenant = useMemo(() => {
    return checkIfUserHasRole("TENANT", user?.roles);
  }, [user]);

  const isIndividualAgent = useMemo(() => {
    return checkIfUserHasRole("INDIVIDUAL_AGENT", user?.roles);
  }, [user]);

  const isBusinessAgent = useMemo(() => {
    return checkIfUserHasRole("BUSINESS_AGENT", user?.roles);
  }, [user]);

  return (
    <AuthenticationContext.Provider
      value={{
        isTenant,
        isBusinessAgent,
        isIndividualAgent,
        isAgent: isBusinessAgent || isIndividualAgent,
        // If the ctx is not initialized return loading=true
        // If initialized and no token return loading=false
        // If initialized and token is given return loading = !user || !error
        loading: !initialized || token ? !user && !userError : false,
        avatar,
        user,
        mutate: mutateUser,
        token,
        roles: user ? user.roles || [] : [],
        login,
        logout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationCTXProvider;
