import React from "react";
import PropTypes from "prop-types";
import { Button } from "../";
import "./index.scss";

export const ButtonGroup = ({ btns, groupClassName, fluid, align }) => {
  const btnGroupClassName = `${groupClassName ? `${groupClassName} ` : ""}${
    fluid === true || align ? "flex " : ""
  }${
    align === "right"
      ? "pull-right center"
      : align === "left"
      ? "pull-left center"
      : align === "center"
      ? "center"
      : ""
  }`;
  return (
    <div id="button-group" className={btnGroupClassName}>
      {btns.map(({ BtnComp, className, ...btnProps }) => {
        if (BtnComp) return <BtnComp />;
        return (
          <Button className={`${className ? `${className} ` : ""}${fluid === true ? "grow " : ""}`} {...btnProps} />
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
