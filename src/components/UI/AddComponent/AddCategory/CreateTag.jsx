import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { COLORS, CHARACTERS } from "../../../../constants";

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

class CreateTag extends React.Component {
  state = {
    color: "",
    character: ""
  };

  selectColorHandler = color => {
    const newColor = color === this.state.color ? "" : color;
    this.setState({
      color: newColor
    });
  };

  selectCharacterHandler = character => {
    const newCharacter = character === this.state.character ? "" : character;
    this.setState({
      character: newCharacter
    });
  };

  render() {
    return (
      <div id="create-tag">
        <div
          className="create-tag-back"
          onClick={() => this.props.handleOptionSelect("select")}
        >
          <div className="create-tag-back-icon">
            <FontAwesomeIcon icon="chevron-left" size="sm" />
          </div>
          <div className="create-tag-back-text">Back To Select</div>
        </div>
        <div className="create-tag-inputs">
          <div className="create-tag-input-container">
            <label>Tag Name</label>
            <input />
          </div>
          <div className="create-tag-input-container">
            <label>Tag Color</label>
            <div className="create-tag-input-color">
              <ColorOptions
                selectColorHandler={this.selectColorHandler}
                currColor={this.state.color}
              />
            </div>
          </div>
          <div className="create-tag-input-container">
            <label>Tag Character</label>
            <div className="create-tag-input-color">
              <CharacterOptions
                selectCharacterHandler={this.selectCharacterHandler}
                currChar={this.state.character}
              />
            </div>
          </div>
          <div>Preview Tag</div>
        </div>
        <div>
          <button>Create</button>
          <button>Reset</button>
        </div>
      </div>
    );
  }
}

export default CreateTag;
