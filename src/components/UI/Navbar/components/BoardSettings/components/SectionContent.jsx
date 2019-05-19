import React from "react";

export const SectionContent = ({ uid, header, content }) => {
  return (
    <div id="section-content">
      <label>{header}</label>
      <div>{content}</div>
    </div>
  );
};
