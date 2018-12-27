import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Colors, Characters } from "./options";
import { AcceptCancelButtons } from "../../../../Popup";
import "./index.scss";

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
      onAcceptHandler,
      currSelectedTag,
      updateBoardContent
    } = this.props;
    if (currSelectedTag) {
      updateBoardContent({ ...this.state, id: currSelectedTag.id }, "tags");
    } else {
      addNewTag({ ...this.state });
    }
    if (onAcceptHandler) {
      onAcceptHandler();
    }
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
        <div className="create-tag-inputs">
          <div className="create-tag-input-container">
            <label>Tag Name</label>
            <input value={this.state.name} onChange={this.onChangeHandler} />
          </div>
          <div className="create-tag-input-container">
            <label>Tag Color</label>
            <div className="create-tag-input-color">
              <Colors
                selectColorHandler={this.selectColorHandler}
                currColor={this.state.color}
              />
            </div>
          </div>
          <div className="create-tag-input-container">
            <label>Tag Character</label>
            <div className="create-tag-input-color">
              <Characters
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
        <AcceptCancelButtons
          onAcceptHandler={this.onAcceptHandler}
          onCancelHandler={this.onResetHandler}
          acceptTitle={`${this.props.currSelectedTag ? "Update" : "Create"}`}
          cancelTitle={"Reset"}
        />
      </div>
    );
  }
}

export default CreateTag;
