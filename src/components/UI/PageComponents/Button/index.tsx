import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface Props {
  className?: string;
  onClick?: any;
  children?: React.ElementType | string;
  title?: string;
  icon?: IconProp;
}

export const Button = ({ className, onClick, children, title, icon }: Props) => {
  const button = () => (
    <button className={className} onClick={onClick}>
      {(children || title) && <span>{children || title}</span>}
      {icon && (
        <span>
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
    </button>
  );

  return button();
};
