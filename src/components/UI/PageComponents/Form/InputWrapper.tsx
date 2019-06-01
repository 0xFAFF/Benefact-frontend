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

export const InputWrapper = <T extends InputProps = InputProps>(Child: ComponentClass<T>) => {
  return (props: T) => (
    <div className={"input-container " + (props.className || "col")}>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <Child {...props} />
    </div>
  );
};
