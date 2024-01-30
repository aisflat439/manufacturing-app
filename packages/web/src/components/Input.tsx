import React from "react";

type InputProps = {
  placeholder?: string;
  type?: "text" | "number" | "password" | "email";
  step?: number;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        type={props.type}
        step={props.step}
        placeholder={props.placeholder}
        className="p-2 mx-2 border-2 border-black rounded focus:outline-purple-400"
      />
    );
  }
);
