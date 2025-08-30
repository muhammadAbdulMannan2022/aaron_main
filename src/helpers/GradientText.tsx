import React from "react";

interface GradientTextProps {
    children: React.ReactNode;
    from: string; // Tailwind color class e.g. "from-white"
    to: string;   // Tailwind color class e.g. "to-gray-600"
    direction?: string; // gradient direction, default "to-r"
    className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({
    children,
    from,
    to,
    direction = "to-r",
    className,
}) => {
    return (
        <span
            className={`bg-gradient-${direction} ${from} ${to} bg-clip-text text-transparent inline-block ${className}`}
        >
            {children}
        </span>
    );
};

export default GradientText;
