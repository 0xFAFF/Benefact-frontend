import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

export interface Props {
  className?: string;
  onClick?: any;
  children?: React.ElementType | string;
  title?: string;
  icon?: IconProp;
  round?: boolean;
  size?: "sm" | "md" | "lg";
  fluid?: boolean;
}

export const Button = ({
  className,
  onClick,
  children,
  title,
  icon,
  round,
  size = "md",
  fluid
}: Props) => {
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
