import React, { ComponentClass } from "react";

export interface InputProps {
  id?: string;
  disabled?: boolean;
  value?: any;
  defaultValue?: any;
  className?: string;
  label?: string;
  onChange?(newValue: any): void;
}

export const InputWrapper = (Child: ComponentClass<InputProps>) => {
  return React.forwardRef<any, any>((props, ref) => {
    return (
      <div className={"input-container " + (props.className || "col")}>
        {props.label && <label htmlFor={props.id}>{props.label}</label>}
        <Child ref={ref} {...props} />
      </div>
    );
  });
};
