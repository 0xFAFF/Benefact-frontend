import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DisplayTag = props => {
  const {
    tag: { name, color, character }
  } = props;
  const display = (
    <div>
      {character ? (
        <FontAwesomeIcon icon={character} size="lg" color="#000" />
      ) : (
        name
      )}
    </div>
  );
  return (
    <li
      style={{
        backgroundColor: color || "#dddddd",
        border: color ? "none" : "1px solid lightgray"
      }}
    >
      {display}
    </li>
  );
};

DisplayTag.propTypes = {
  tag: PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string,
    character: PropTypes.string
  })
};

export default DisplayTag;
