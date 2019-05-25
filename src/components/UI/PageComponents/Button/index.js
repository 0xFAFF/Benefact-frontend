import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

export const Button = ({
  className,
  onClick,
  children,
  title,
  icon,
  round,
  size = "md",
  fluid
}) => {
  let btnClassName = className ? className : "";
  if (round) btnClassName += " btn-radius";
  if (size) btnClassName += ` ${size}`;
  if (fluid) btnClassName += " grow";

  const button = () => (
    <button id="btn" className={btnClassName} onClick={onClick}>
      {(children || title) && <span>{children || title}</span>}
      {icon && (
        <span>
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
    </button>
  );

  if (fluid) {
    return <div className="flex">{button()}</div>;
  }
  return button();
};

Button.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  icon: PropTypes.string,
  round: PropTypes.bool,
  className: PropTypes.string
};
