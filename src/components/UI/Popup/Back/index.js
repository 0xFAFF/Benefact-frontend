import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

const Back = props => {
  const { onClick, title = "Back" } = props;
  return (
    <div id="back">
      <div onClick={onClick} className="back-container">
        <div className="back-icon">
          <FontAwesomeIcon icon="chevron-left" size="sm" />
        </div>
        <div className="back-text">{title}</div>
      </div>
    </div>
  );
};

export default Back;
