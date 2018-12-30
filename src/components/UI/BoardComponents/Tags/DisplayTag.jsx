import React from "react";
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

export default DisplayTag;
