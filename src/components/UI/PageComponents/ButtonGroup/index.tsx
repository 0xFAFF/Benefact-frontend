import React from "react";
import { Button, Props as ButtonProps } from "../Button";
import "./index.scss";

interface Props {
  btns: Array<{ BtnComp?: React.ElementType; } & ButtonProps>;
  groupClassName?: string;
  fluid?: boolean;
  align?: "right" | "left" | "center";
}

export const ButtonGroup = ({ btns, groupClassName, fluid, align }: Props) => {
  let btnGroupClassName = groupClassName ? groupClassName : "";
  if (fluid === true || align) btnGroupClassName += " flex";
  if (align === "right") {
    btnGroupClassName += " pull-right center";
  } else if (align === "left") {
    btnGroupClassName += " pull-left center";
  } else if (align === "center") {
    btnGroupClassName += " center";
  }
  return (
    <div id="button-group" className={btnGroupClassName}>
      {btns.map(({ BtnComp, className, ...btnProps }, index) => {
        if (BtnComp) return <BtnComp key={index} />;
        return (
          <Button
            className={`${className ? `${className} ` : ""}${fluid === true ? "grow " : ""}`}
            {...btnProps}
            key={index}
          />
        );
      })}
    </div>
  );
};
