import { useRouter } from "next/router";
import clsx from "clsx";
import Link from "../Link/Link";
import { VerticalNavigationItem } from "./VerticalNavigationItem";

/**
 * Props definition for the VerticalNavigation component
 */
export interface VerticalNavigationProps {
  /**
   * Navigable items
   */
  items?: VerticalNavigationItem[];
}

/**
 * Render a vertical navigation of links
 */
const VerticalNavigation = ({ items = [] }: VerticalNavigationProps) => {
  const router = useRouter();

  return (
    <nav className="space-y-1" aria-label="Sidebar">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              router.asPath === item.href
                ? "bg-gray-200 text-gray-900"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              "flex items-center px-3 py-2 text-sm font-medium rounded-md"
            )}
            aria-current={router.asPath === item.href ? "page" : undefined}
          >
            {Icon && (
              <Icon
                className={clsx(
                  router.asPath === item.href
                    ? "text-gray-500"
                    : "text-gray-400",
                  "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                )}
                aria-hidden="true"
              />
            )}
            <span className="truncate">{item.text}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default VerticalNavigation;
