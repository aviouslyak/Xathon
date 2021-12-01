import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}
const SubmitButton: React.FC<Props> = ({ className, ...props }) => {
  return (
    <button
      className={`${className} accent-gradient rounded-full w-1/5 p-2 cursor-pointer`}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default SubmitButton;
