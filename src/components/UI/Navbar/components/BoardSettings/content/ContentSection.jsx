import React from "react";

export const ContentSection = ({ header, content }) => {
  return (
    <div id="section-content">
      <label>{header}</label>
      <div>{content}</div>
    </div>
  );
};
