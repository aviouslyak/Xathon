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
          resize-none dark:bg-gray-700 rounded-lg block pl-2 pr-10 bg-gray-200 ${className}`}
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
