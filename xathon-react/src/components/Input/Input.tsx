import React, { InputHTMLAttributes } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

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
        <p className="text-xs text-red-500">{errorText}</p>
        <div data-testid="input-wrapper" className={`${width} h-10 relative`}>
          {icon && <Icon icon={icon} />}
          <input
            name={name}
            className={`${
              dropdownActive
                ? "rounded-t-lg border-b-2 responsive-border-color"
                : "rounded-lg"
            } dark:bg-gray-700 h-full w-full pl-2 ${
              icon ? "pr-10" : "pr-2"
            } bg-gray-200 ${className}`}
            ref={ref}
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
    <button className="absolute accent-gradient right-0 border-gray-300 dark:border-gray-800  hover:bg-gray-800 rounded-r-lg w-10 border-l-2 z-10 h-full text-xl ">
      {icon}
    </button>
  );
};

export default Input;
