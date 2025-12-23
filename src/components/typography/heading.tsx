import React from "react";
import {cn} from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Defines the heading level.
   * - `h1` through `h6`.
   */
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /**
   * The content of the heading.
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes for custom styling.
   */
  className?: string;
}

/**
 * A component for rendering headings (h1-h6) with a standardized
 * font size and font weight based on the variant prop.
 *
 * @param {Object} props
 * @prop {string} [variant=h1] - The heading level.
 * @prop {React.ReactNode} children - The content of the heading.
 * @prop {string} [className=""] - Additional CSS classes for custom styling.
 *
 * @example
 * <Heading variant="h2">Heading 2</Heading>
 */
const Heading = ({
  variant = "h2",
  children,
  className = "",
}: HeadingProps) => {
  const baseClasses = {
    h1: "text-[56px] font-bold",
    h2: "text-5xl font-semibold", // 48px
    h3: "text-4xl font-bold", // 36px
    h4: "",
    h5: "text-2xl font-bold", // 24px
    h6: "text-xl font-normal", // 20px
  };

  const Tag = variant; // Dynamically determines the tag (h1-h6)

  return (
    <Tag className={cn(baseClasses[variant], className)}>{children}</Tag>
  );
};

export default Heading;
