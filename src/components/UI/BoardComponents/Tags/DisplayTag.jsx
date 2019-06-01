import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DisplayTag = props => {
  const {
    tag: { name, color, character },
    className: providedClass
  } = props;
  let className = "tag";
  if (providedClass) className += " " + providedClass;
  return (
    <div
      className={className}
      style={{
        backgroundColor: color || "#dddddd",
        border: color ? "none" : "1px solid lightgray"
      }}
    >
      <div>{character ? <FontAwesomeIcon icon={character} size="lg" color="#000" /> : name}</div>
    </div>
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
