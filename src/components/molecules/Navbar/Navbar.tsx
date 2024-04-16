import { useRouter } from "next/router";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import useTranslation from "next-translate/useTranslation";
import NavbarLink from "../../atoms/NavbarLink/NavbarLink";
import { useAuth } from "../../../contexts/AuthenticationContext/AuthenticationContext";
import Heading from "../../atoms/Heading/Heading";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import { NavigationItem } from "./NavbarItem";
import Styles from "../../templates/Layout/LayoutStyles.module.css";

/**
 * Props definition for the Navbar component
 */
export interface NavbarProps {
  /**
   * profile navigation-items related to the active user
   */
  profile?: NavigationItem[];
  /**
   * primary-navigation items of the navbar
   */
  items?: NavigationItem[];
  /**
   * title of the current page shown below the navbar
   */
  title?: string;
}

/**
 * Render the navbar of the application. It consists of a primary and a
 * secondary navigation.
 */
const Navbar = ({ profile = [], items = [], title }: NavbarProps) => {
  const { t } = useTranslation();
  const { avatar, user } = useAuth();
  const router = useRouter();

  return (
    <div className={clsx("bg-navbar-800 pb-32", Styles.backgroundWithShapes)}>
      <Disclosure
        as="nav"
        className="bg-navbar-800 lg:bg-transparent border-b border-navbar-300 border-opacity-25 lg:border-none"
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link href="/">
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a>
                        <Image
                          className="h-full w-auto object-contain"
                          src="/logos/axara-white_horizontal.png"
                          loading="eager"
                          alt={t("common:title")}
                          height={40}
                          width={120}
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="hidden lg:block lg:ml-10">
                    <div className="flex space-x-4">
                      {items.map((item) => (
                        <NavbarLink
                          current={router.asPath === item.href}
                          href={item.href}
                          key={item.href}
                        >
                          {item.text}
                        </NavbarLink>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button
                    className={clsx(
                      "bg-navbar-800 inline-flex items-center justify-center",
                      "p-2 rounded-md text-navbar-400 hover:text-white hover:bg-navbar-700",
                      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navbar-800 focus:ring-white"
                    )}
                  >
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                {user && (
                  <div className="hidden lg:block lg:ml-4">
                    <div className="flex items-center">
                      {/* Profile dropdown */}
                      <ProfileDropdown
                        items={profile}
                        src={avatar}
                        user={user}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {items.map((item) => (
                  <NavbarLink
                    current={router.asPath === item.href}
                    href={item.href}
                    key={item.href}
                  >
                    {item.text}
                  </NavbarLink>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-navbar-700">
                {user && (
                  <div className="px-5 flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <Image
                          className="object-cover bg-white"
                          alt={`${user.firstName} ${user.lastName}`}
                          src={avatar}
                          height={64}
                          width={64}
                          unoptimized
                        />
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-white">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-sm font-medium text-navbar-300">
                        {user.email}
                      </div>
                    </div>
                  </div>
                )}
                <div className="mt-3 px-2 space-y-1">
                  {profile.map((item) => (
                    <NavbarLink
                      current={router.asPath === item.href}
                      href={item.href}
                      key={item.href}
                    >
                      {item.text}
                    </NavbarLink>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {/* Page-title section */}
      {title && (
        <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Heading variant="h3" as="h1" className="text-white mb-0">
              {title}
            </Heading>
          </div>
        </header>
      )}
    </div>
  );
};

export default Navbar;
