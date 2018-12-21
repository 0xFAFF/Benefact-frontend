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
    name: "",
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

  onChangeHandler = e => {
    this.setState({ name: e.target.value });
  };

  onResetHandler = () => {
    this.setState({ name: "", color: "", character: "" });
  };

  onAcceptHandler = () => {
    const {
      addNewTag,
      handleOptionSelect,
      currSelectedTag,
      updateBoardContent
    } = this.props;
    if (currSelectedTag) {
      updateBoardContent({ ...this.state, id: currSelectedTag.id }, "tags");
    } else {
      addNewTag({ ...this.state });
    }
    handleOptionSelect("select");
  };

  componentDidMount() {
    const { currSelectedTag } = this.props;
    if (currSelectedTag) {
      const { name = "", color = "", character = "" } = currSelectedTag;
      this.setState({ name, color, character });
    }
  }

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
            <input value={this.state.name} onChange={this.onChangeHandler} />
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
          <div>
            <label>Preview Tag</label>
            <div
              className="create-tag-preview-tag"
              style={{
                backgroundColor: this.state.color || "#dddddd",
                border: this.state.color ? "none" : "1px solid lightgray"
              }}
            >
              {this.state.character ? (
                <FontAwesomeIcon
                  icon={this.state.character}
                  size="lg"
                  color="#000"
                />
              ) : (
                this.state.name
              )}
            </div>
          </div>
        </div>
        <div className="create-tag-button-group">
          <button
            className="create-tag-button-create"
            onClick={this.onAcceptHandler}
          >
            {this.props.currSelectedTag ? "Update" : "Create"}
          </button>
          <button
            className="create-tag-button-reset"
            onClick={this.onResetHandler}
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default CreateTag;
