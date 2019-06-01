import React, { ReactNode } from "react";
import { Button, Props as ButtonProps } from "../Button";
import "./index.scss";

interface Props {
  btns?: Array<{ BtnComp?: React.ElementType } & ButtonProps>;
  groupClassName?: string;
  align?: "right" | "left" | "center";
  children?: ReactNode;
}

export const ButtonGroup = ({ btns, groupClassName, align, children }: Props) => {
  let btnGroupClassName = groupClassName ? groupClassName : "";
  if (align === "right") {
    btnGroupClassName += " pull-right center";
  } else if (align === "left") {
    btnGroupClassName += " pull-left center";
  } else if (align === "center") {
    btnGroupClassName += " center";
  }
  return (
    <div id="button-group" className={btnGroupClassName}>
      {children}
      {btns &&
        btns.map(({ BtnComp, className, ...btnProps }, index) => {
          if (BtnComp) return <BtnComp key={index} />;
          return (
            <Button className={`${className ? `${className} ` : ""}`} {...btnProps} key={index} />
          );
        })}
    </div>
  );
};
