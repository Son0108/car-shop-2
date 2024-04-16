import { ReactNode } from "react";
import clsx from "clsx";

// All available element-tags the heading can be rendered as
type HeadingTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

// All available variant for a heading
type HeadingVariants = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

// Definition of the available properties
export interface HeadingProps {
  /**
   * child-elements of the heading
   */
  children?: ReactNode;
  /**
   * classNames that should be added to the heading-style
   */
  className?: string;
  /**
   * element as which the component should be rendered
   * if no value is given, the variant is used to determine the tag.
   */
  as?: HeadingTags;
  /**
   * variant of the heading defining the styling
   */
  variant: HeadingVariants;
}

/**
 * UI-Component to render a heading.
 * The heading-variant has ot be given, but the heading can be rendered
 * using a specific element-tag if the "as" property is defined
 */
const Heading = ({
  children,
  className,
  variant,
  as: Tag = variant,
}: HeadingProps) => (
  <Tag
    className={clsx(
      className,
      variant === "h1" && "text-3xl md:text-5xl tracking-wide font-bold",
      variant === "h2" && "text-2xl md:text-4xl tracking-wide font-bold",
      variant === "h3" && "text-xl md:text-3xl tracking-wide font-bold",
      variant === "h4" && "text-lg md:text-2xl font-medium",
      variant === "h5" && "text-base md:text-lg font-medium",
      variant === "h6" && "text-sm md:text-base font-medium"
    )}
  >
    {children}
  </Tag>
);

export default Heading;
