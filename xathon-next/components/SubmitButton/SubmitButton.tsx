import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}
const SubmitButton: React.FC<Props> = ({ className, ...props }) => {
  return (
    <button
      className={`${className} button w-40 h-10 text-xl`}
      type="submit"
      {...props}
    >
      {props.children}
    </button>
  );
};

export default SubmitButton;
