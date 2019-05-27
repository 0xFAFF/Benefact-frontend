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
  padding10,
  padding20,
  padding30
}: {
  children?: any;
  className?: string;
  style?: any;
  border?: boolean;
  center?: boolean;
  compact?: boolean;
  margin?: boolean;
  padding10?: boolean;
  padding20?: boolean;
  padding30?: boolean;
}) => {
  let segmentClassName = className;
  if (border) segmentClassName += " border";
  if (center) segmentClassName += " center";
  if (compact) segmentClassName += " compact";
  if (margin) segmentClassName += " margin";
  if (padding10) segmentClassName += " padding10";
  if (padding20) segmentClassName += " padding20";
  if (padding30) segmentClassName += " padding30";
  return (
    <div id="segment" className={segmentClassName} style={style}>
      {children}
    </div>
  );
};
