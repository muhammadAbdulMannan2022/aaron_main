import React from "react";


const GradientText = ({
    children,
    className,
}) => {
    return (
        <span
            className={`gradient-text  ${className || ""}`}
        >
            {children}
        </span>
    );
};

export default GradientText;
