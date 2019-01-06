import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

const TopDelete = props => {
  const { onClick } = props;
  return (
    <div id="delete-top-nav">
      <div id="icon-container">
        <FontAwesomeIcon icon="times" size="lg" onClick={onClick} />
      </div>
    </div>
  );
};

TopDelete.propTypes = {
  onClick: PropTypes.func
};

export default TopDelete;
