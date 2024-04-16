import NextLink from "next/link";
import { ReactNode } from "react";
import clsx from "clsx";

interface NavbarLinkProps {
  /**
   * content of the link
   */
  children?: ReactNode;
  /**
   * bool if the link leads to the current url
   */
  current?: boolean;
  /**
   * href of the link
   */
  href: string;
}

/**
 * Render a NavbarLink
 */
const NavbarLink = ({ children, current, href }: NavbarLinkProps) => {
  return (
    <NextLink href={href}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        aria-current={current && "page"}
        className={clsx(
          "px-3 py-2 block rounded-md font-medium text-base lg:text-sm",
          current && "bg-navbar-900 text-white",
          !current && "text-navbar-300 hover:bg-navbar-700 hover:text-white"
        )}
      >
        {children}
      </a>
    </NextLink>
  );
};

export default NavbarLink;
