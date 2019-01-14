import React from "react";
import "./index.scss";

const TitleWrapper = props => {
  const { selectedTitle, onSelectTitleHandler } = props;
  return (
    <div id="title-wrapper-container">
      <input
        name="Title"
        type="text"
        value={selectedTitle}
        onChange={e => onSelectTitleHandler(e)}
      />
    </div>
  );
};

export default TitleWrapper;
