import React, { ComponentClass, Component } from "react";

export interface InputProps {
  id?: string;
  disabled?: boolean;
  defaultValue?: any;
  className?: string;
  label?: string;
  onChange?(e: React.SyntheticEvent): void;
}

export interface InputComponent {
  value(): any;
  reset(): void;
}

export const InputWrapper = (Child: ComponentClass<InputProps>) => {
  return React.forwardRef<InputComponent, any>((props, ref) => {
    return (
      <div id="input-container" className={props.className || "col"}>
        {props.label && <label htmlFor={props.id}>{props.label}</label>}
        <Child ref={ref} {...props} />
      </div>
    );
  });
};
