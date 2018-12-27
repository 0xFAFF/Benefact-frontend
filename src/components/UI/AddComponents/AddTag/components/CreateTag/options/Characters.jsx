import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CHARACTERS } from "../../../../../../../constants";

const CharacterOptions = ({ selectCharacterHandler, currChar }) => {
  let charactersList = CHARACTERS();
  return (
    <ul className="create-tag-input-character-ul">
      {Object.keys(charactersList).map(character => {
        const displayedCharacter = CHARACTERS()[character];
        return (
          <li
            key={displayedCharacter}
            className="create-tag-input-character-tag"
            onClick={() => selectCharacterHandler(displayedCharacter)}
          >
            <div
              className={
                currChar === displayedCharacter
                  ? "create-tag-input-character-tag-selected"
                  : ""
              }
            >
              <FontAwesomeIcon icon={displayedCharacter} size="sm" />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CharacterOptions;
