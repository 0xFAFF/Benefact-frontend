import React from "react";
import PropTypes from "prop-types";
import { Button } from "../";
import "./index.scss";

export const ButtonGroup = ({ btns, groupClassName, fluid, align }) => {
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

ButtonGroup.propTypes = {
  btns: PropTypes.array,
  groupClassName: PropTypes.string,
  fluid: PropTypes.bool,
  align: PropTypes.oneOf(["right", "left", "center"])
};
