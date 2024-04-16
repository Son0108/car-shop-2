import NextLink from "next/link";
import { ReactNode } from "react";
import clsx from "clsx";

export interface LinkProps {
  /**
   * content shown inside the link tags
   */
  children?: ReactNode;
  /**
   * additional css-classes that should be added to the link
   */
  className?: string;
  /**
   * external link
   */
  external?: boolean;
  /**
   * target of the link
   */
  href: string;
  /**
   * Locale of the URL to which the link points
   * next/link automatically sets the currently active locale for a link.
   * If you want to route do a different locale you can do this by setting this prop.
   */
  locale?: string;
  /**
   * define if the site should be opened in a new tab
   */
  openNewTab?: boolean;
  /**
   * available variants
   */
  variant?: "link" | "text";
}

/**
 * Link wraps a styled link tag with the next/link component
 */
const Link = ({
  children,
  className,
  external,
  href,
  locale,
  openNewTab,
  variant = !className ? "text" : undefined,
}: LinkProps) => (
  <NextLink href={href} locale={locale}>
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <a
      className={clsx(
        "font-semibold focus:outline-none",
        variant === "link" &&
          "text-link-700 hover:text-link-900 focus:text-link-900",
        variant === "text" && "text-gray-900 hover:text-black focus:text-black",
        className
      )}
      rel={external ? "noreferrer noopener" : undefined}
      target={openNewTab ? "_blank" : undefined}
    >
      {children}
    </a>
  </NextLink>
);

export default Link;
