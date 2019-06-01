import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { default as CHARACTERS } from "constants/CHARACTERS";
import { InputWrapper } from "components/UI/PageComponents/Form/InputWrapper";

export const CharacterOptions = InputWrapper(
  class extends React.Component {
    render = () => {
      return (
        <ul className="create-tag-input-character-ul">
          {Object.values(CHARACTERS()).map(character => {
            return (
              <li
                key={character}
                className="create-tag-input-character-tag"
                onClick={() => this.props.onChange(character)}
              >
                <div
                  className={
                    this.props.value === character ? "create-tag-input-character-tag-selected" : ""
                  }
                >
                  <FontAwesomeIcon icon={character} size="sm" />
                </div>
              </li>
            );
          })}
        </ul>
      );
    };
  }
);

export default CharacterOptions;
