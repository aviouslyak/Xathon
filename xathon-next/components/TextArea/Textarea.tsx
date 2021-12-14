import React, { TextareaHTMLAttributes } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";
import ErrorText from "../ErrorText/ErrorText";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  name: string;
  errorText?: string;
  showLabel?: boolean;
  labelText?: string;
}

type MakeOptional<Type> = {
  [Property in keyof Type]: boolean;
};

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaProps & MakeOptional<UseFormRegister<FieldValues>>
>(
  (
    { className = "", name, errorText, showLabel = true, labelText, ...props },
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

        <ErrorText className="text-xs">{errorText}</ErrorText>
        <textarea
          className={`
          resize-none rounded-lg block px-2 bg-pink-200 focus:outline-none focus:border-2 border-pink-500 shadow-md shadow-pink-800 ${className}`}
          {...props}
          name={name}
          ref={ref}
          id={name}
        />
      </>
    );
  }
);

export default Textarea;
