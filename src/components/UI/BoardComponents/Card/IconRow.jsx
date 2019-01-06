import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconRow = card => {
  const { description } = card;
  return description ? (
    <div>
      <FontAwesomeIcon icon="stream" size="sm" color="#000" />
    </div>
  ) : null;
};

IconRow.propTypes = {
  card: PropTypes.shape({
    description: PropTypes.string
  })
};

export default IconRow;
