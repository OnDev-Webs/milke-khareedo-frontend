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
        h1: "text-[1.875rem] font-bold", // 2.25rem
        h2: "md:text-3xl text-1.5 font-semibold", // 1.875rem
        h3: "text-2xl font-medium", // 1.5rem
        h4: "text-[14px] md:text-xl font-medium", // 1.25rem
        h5: "text-lg font-normal", // 1.125rem
        h6: "text-base font-normal", // 1rem
    };

    const Tag = variant; // Dynamically determines the tag (h1-h6)

    return (
        <Tag className={`${baseClasses[variant]} ${className}`}>{children}</Tag>
    );
};

export default Heading;