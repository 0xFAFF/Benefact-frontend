import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

const TopDelete = props => {
  const { onClick } = props;
  return (
    <div id="delete-top-nav">
      <div style={{ cursor: "pointer" }}>
        <FontAwesomeIcon icon="times" size="lg" onClick={onClick} />
      </div>
    </div>
  );
};

export default TopDelete;
