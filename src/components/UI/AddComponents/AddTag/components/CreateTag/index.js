import React from "react";
import PropTypes from "prop-types";
import { Colors, Characters } from "./options";
import { Form, Input } from "components/UI/PageComponents";
import "./index.scss";
import DisplayTag from "components/UI/BoardComponents/Tags/DisplayTag";

class CreateTag extends React.Component {
  static propTypes = {
    handleUpdate: PropTypes.func,
    onAcceptHandler: PropTypes.func,
    updateBoardContent: PropTypes.func,
    currSelectedTag: PropTypes.object
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
          cancelBtnTitle={Boolean(currSelectedTag) && "Reset"}
          onSubmit={this.onAcceptHandler}
        >
          {({ attach, value }) => {
            return (
              <div className="section create-tag-inputs">
                <div className="input-container">
                  <label>Preview Tag</label>
                  <DisplayTag tag={value} />
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
