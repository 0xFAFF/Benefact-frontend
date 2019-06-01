import React, { ReactNode } from "react";
import { Button, Props as ButtonProps } from "../Button";
import "./index.scss";

interface Props {
  btns?: Array<{ BtnComp?: React.ElementType } & ButtonProps>;
  className?: string;
  children?: ReactNode;
}

export const ButtonGroup = ({ btns, className, children }: Props) => {
  let cname = "button-group";
  if(className) cname += " " + className;
  return (
    <div className={cname}>
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
