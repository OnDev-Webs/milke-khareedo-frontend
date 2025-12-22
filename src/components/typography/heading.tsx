import React from "react";

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
    h2: "font-semibold",
    h3: "font-medium",
    h4: "font-medium",
    h5: "font-normal",
    h6: "font-normal",
  };

  const Tag = variant; // Dynamically determines the tag (h1-h6)

  return (
    <Tag className={`${baseClasses[variant]} ${className}`}>{children}</Tag>
  );
};

export default Heading;
