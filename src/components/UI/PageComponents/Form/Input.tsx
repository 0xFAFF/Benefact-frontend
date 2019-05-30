import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import "./Form.scss";

interface Props {
  name: string;
  icon?: IconProp;
  placeholder?: string;
  type?: string;
  label?: string;
  onKeyPress?(e: React.KeyboardEvent): void;
  defaultValue?: string;
  onChange?(e: React.SyntheticEvent): void;
}

export const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { icon, label, ...childProps } = props;
  return (
    <div id="input-container" className="col">
      {label && <label htmlFor={childProps.name}>{label}</label>}
      <div className="row">
        {icon && (
          <div className="input-icon">
            <FontAwesomeIcon icon={icon} size="sm" />
          </div>
        )}
        <input ref={ref} className="input-field" id={childProps.name} {...childProps} />
      </div>
    </div>
  );
});

export default Input;
