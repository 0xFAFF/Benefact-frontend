import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

export const Button = ({ className, onClick, children, title, icon, round, size = "md" }) => {
  let btnClassName = className ? className : "";
  if (round) btnClassName += " btn-radius";
  if (size) btnClassName += ` ${size}`;
  return (
    <button id="btn" className={btnClassName} onClick={onClick}>
      {(children || title) && <span>{children || title}</span>}
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
