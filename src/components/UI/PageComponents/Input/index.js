import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

export const Input = ({ name, icon, placeholder, type, onKeyPress, value, onChange }) => {
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

Input.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onKeyPress: PropTypes.func,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
