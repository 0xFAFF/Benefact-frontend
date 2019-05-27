import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import "./index.scss";

interface Props {
  name: string;
  icon?: IconProp;
  placeholder?: string;
  type?: string;
  onKeyPress(e: React.KeyboardEvent): void;
  value: string | number;
  onChange(e: React.SyntheticEvent): void;
}

export const Input = ({ name, icon, placeholder, type, onKeyPress, value, onChange }: Props) => {
  return (
    <div id="input-container">
      {icon && (
        <div className="input-icon">
          <FontAwesomeIcon icon={icon} size="sm" />
        </div>
      )}
      <input
        className="input-field"
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        type={type}
        onKeyPress={onKeyPress}
        onChange={onChange}
      />
    </div>
  );
};
