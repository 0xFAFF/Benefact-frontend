import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

const Back = props => {
  const { onClick } = props;
  return (
    <div id="back" onClick={onClick}>
      <div className="back-icon">
        <FontAwesomeIcon icon="chevron-left" size="sm" />
      </div>
      <div className="back-text">Back To Select</div>
    </div>
  );
};

export default Back;
