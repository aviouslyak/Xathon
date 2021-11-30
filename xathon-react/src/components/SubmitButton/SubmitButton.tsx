import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
const SubmitButton: React.FC<Props> = ({ className, ...props }) => {
  return (
    <input
      type="submit"
      className={`${className} accent-gradient rounded-full w-1/5 p-2 cursor-pointer`}
      {...props}
    />
  );
};

export default SubmitButton;
