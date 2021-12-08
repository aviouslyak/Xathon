import React, { HTMLAttributes } from "react";

interface ErrorTextProps extends HTMLAttributes<HTMLElement> {
  text: string;
}
const ErrorText: React.FC<ErrorTextProps> = ({ text, className, ...props }) => {
  return <p className={`text-red-500 ${className ? className : ""}`}>{text}</p>;
};

export default ErrorText;
