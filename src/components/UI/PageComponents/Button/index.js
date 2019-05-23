import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

export const Button = ({ className, onClick, children, icon, round, size = "md" }) => {
  const btnClassName = `${className ? `${className} ` : ""}${round ? "btn-radius " : ""}${size}`;
  return (
    <button id="btn" className={btnClassName} onClick={onClick}>
      {children && <span>{children}</span>}
      {icon && (
        <span>
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  icon: PropTypes.string,
  round: PropTypes.bool,
  className: PropTypes.string
};
