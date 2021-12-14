import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}
const SubmitButton: React.FC<Props> = ({ className, ...props }) => {
  return (
    <button
      className={`${className} group w-40 h-10 text-xl font-semibold flex items-center justify-center rounded-lg transition-shadow shadow-md hover:shadow-lg shadow-pink-900 hover:shadow-pink-900 bg-orange-400`}
      type="submit"
      {...props}
    >
      {props.children}
    </button>
  );
};

export default SubmitButton;
