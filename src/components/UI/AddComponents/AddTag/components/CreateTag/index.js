import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Colors, Characters } from "./options";
import { Form, Input } from "components/UI/PageComponents";
import "./index.scss";

class CreateTag extends React.Component {
  static propTypes = {
    handleUpdate: PropTypes.func,
    onAcceptHandler: PropTypes.func,
    updateBoardContent: PropTypes.func,
    currSelectedTag: PropTypes.object
  };

  state = {
    name: "",
    color: "",
    character: ""
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

  onAcceptHandler = form => {
    const { handleUpdate, onAcceptHandler, currSelectedTag, updateBoardContent } = this.props;
    if (currSelectedTag) {
      updateBoardContent({ ...form, id: currSelectedTag.id }, "tags");
    } else {
      handleUpdate("tags", "ADD", {
        name: form.name,
        color: form.color === "" ? null : form.color,
        character: form.character === "" ? null : form.character
      });
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
    const { currSelectedTag } = this.props;
    return (
      <div id="create-tag">
        <Form
          ref={this.formRef}
          defaults={currSelectedTag}
          onlyChanged={Boolean(currSelectedTag)}
          submitBtnTitle={Boolean(currSelectedTag) ? "Update" : "Add"}
          cancelBtnTitle="Cancel"
          onSubmit={this.onAcceptHandler}
        >
          {({ attach, value }) => {
            return (
              <div className="section create-tag-inputs">
                <div className="input-container">
                  <label>Preview Tag</label>
                  <div
                    className="create-tag-preview-tag"
                    style={{
                      backgroundColor: value.color || "#dddddd",
                      border: value.color ? "none" : "1px solid lightgray"
                    }}
                  >
                    {this.state.character ? (
                      <FontAwesomeIcon icon={this.state.character} size="lg" color="#000" />
                    ) : (
                      value.name
                    )}
                  </div>
                </div>
                <Input id="name" {...attach("name")} label="Tag Name" />
                <Colors id="color" {...attach("color")} label="Tag Color" />
                <Characters id="char" {...attach("character")} label="Tag Symbol" />
              </div>
            );
          }}
        </Form>
      </div>
    );
  }
}

export default CreateTag;
