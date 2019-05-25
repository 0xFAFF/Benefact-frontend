import React from "react";
import "./index.scss";

export const Segment = ({
  children,
  className = "",
  style = {},
  border,
  center,
  compact,
  margin,
  padding,
  morePadding
}) => {
  let segmentClassName = className;
  if (border) segmentClassName += " border";
  if (center) segmentClassName += " center";
  if (compact) segmentClassName += " compact";
  if (margin) segmentClassName += " margin";
  if (padding) segmentClassName += " padding10";
  if (morePadding) segmentClassName += "padding30";
  return (
    <div id="segment" className={segmentClassName} style={style}>
      {children}
    </div>
  );
};
