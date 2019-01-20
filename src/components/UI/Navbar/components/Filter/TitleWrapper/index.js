import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

const TitleWrapper = props => {
  const { selectedTitle, onChangeFilterHandler } = props;
  return (
    <div id="title-wrapper-container">
      <input
        name="Title"
        type="text"
        value={selectedTitle}
        onChange={e => onChangeFilterHandler(e, "title")}
      />
    </div>
  );
};

TitleWrapper.propTypes = {
  selectedTitle: PropTypes.string,
  onChangeFilterHandler: PropTypes.func
};

export default TitleWrapper;
