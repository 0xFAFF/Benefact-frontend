import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { COLORS } from "../../../../../../../constants";

const ColorOptions = ({ selectColorHandler, currColor }) => {
  let colorsList = COLORS();
  return (
    <ul className="create-tag-input-color-ul">
      {Object.keys(colorsList).map(color => {
        const displayedColor = colorsList[color];
        return (
          <li
            key={displayedColor}
            style={{ backgroundColor: displayedColor }}
            className="create-tag-input-color-tag"
            onClick={() => selectColorHandler(displayedColor)}
          >
            {displayedColor === currColor ? (
              <div className="create-tag-input-color-tag-selected">
                <FontAwesomeIcon icon="check" size="sm" />
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};

export default ColorOptions;
