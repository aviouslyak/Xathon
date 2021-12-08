import React, { HTMLAttributes } from "react";

const ErrorText: React.FC<HTMLAttributes<HTMLElement>> = ({
  className,
  ...props
}) => {
  return (
    <p {...props} className={`text-red-500 ${className ? className : ""}`}>
      {props.children}
    </p>
  );
};

export default ErrorText;
