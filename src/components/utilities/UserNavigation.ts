import { Translate } from "next-translate";
import { UserFullyDressed } from "../../definitions/types/models/User";
import { NavigationItem } from "../molecules/Navbar/NavbarItem";
import { useAuth } from "../../contexts/AuthenticationContext/AuthenticationContext";

export const getPrimaryNavigation = (
  t: Translate,
  user?: UserFullyDressed
): NavigationItem[] => {
  const navigationItems = [];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isAgent } = useAuth();

  if (user) {
    navigationItems.push({
      href: "/dashboard",
      text: t("navigation:dashboard"),
    });

    if (isAgent) {
      navigationItems.push({
        href: "/real-estates",
        text: t("navigation:realEstates"),
      });
    }
  } else {
    navigationItems.push({
      href: "/login",
      text: t("navigation:login"),
    });
  }

  return navigationItems;
};

export const getSecondaryNavigation = (
  t: Translate,
  user?: UserFullyDressed
): NavigationItem[] => {
  const navigationItems: NavigationItem[] = [];
  if (user) {
    navigationItems.push({
      text: t("navigation:profile"),
      href: "/profile",
    });
    navigationItems.push({
      text: t("navigation:logout"),
      href: "/logout",
    });
  }
  return navigationItems;
};
