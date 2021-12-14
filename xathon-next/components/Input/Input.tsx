import React, { InputHTMLAttributes } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";
import ErrorText from "../ErrorText/ErrorText";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  dropdownActive?: boolean;
  icon?: React.ReactNode;
  width?: string;
  name: string;
  errorText?: string;
  showLabel?: boolean;
  labelText?: string;
}

type MakeOptional<Type> = {
  [Property in keyof Type]: boolean;
};

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & MakeOptional<UseFormRegister<FieldValues>>
>(
  (
    {
      dropdownActive = false,
      icon,
      width,
      name,
      errorText,
      showLabel = true,
      className,
      labelText,
      ...props
    },
    ref
  ) => {
    const capitalizeFirstLetter = (s: string): string => {
      return s.charAt(0).toUpperCase() + s.slice(1);
    };
    return (
      <>
        {showLabel && (
          <label className="font-semibold" htmlFor={name}>
            {labelText || capitalizeFirstLetter(name)}
          </label>
        )}
        <ErrorText className="text-md">{errorText}</ErrorText>
        <div data-testid="input-wrapper" className={`${width} h-10 relative`}>
          {icon && <Icon icon={icon} />}
          <input
            name={name}
            className={`${
              dropdownActive
                ? "rounded-t-lg border-b-2 responsive-border-color"
                : "rounded-lg"
            } bg-pink-200 focus:outline-none focus:border-2 border-pink-500 shadow-md shadow-pink-800  h-full w-full pl-2 ${
              icon ? "pr-10" : "pr-2"
            }  ${className ? className : ""}`}
            ref={ref}
            id={name}
            {...props}
          />
        </div>
      </>
    );
  }
);

interface IconProps {
  icon: React.ReactNode;
}

const Icon: React.FC<IconProps> = ({ icon }) => {
  return (
    <div className="absolute font-bold bg-orange-400 flex items-center justify-center accent-gradient right-0 border-slate-800  rounded-r-lg w-10 border-l-2 z-10 h-full text-xl ">
      {icon}
    </div>
  );
};

export default Input;
