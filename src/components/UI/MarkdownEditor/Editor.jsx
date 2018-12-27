import React from "react";
import { Tags } from "../BoardComponents";
import { AcceptCancelButtons } from "../Popup";

class Editor extends React.Component {
  render() {
    return (
      <div id="editor-mode">
        <div className="editor-id">ID: {this.props.content.id}</div>
        <div className="editor-title">
          <label>Title: </label>
          <input
            name="Title"
            type="text"
            defaultValue={this.props.content.title}
            onChange={e => this.props.onChangeHandler(e, "title")}
          />
        </div>
        <div className="editor-description">
          <div>Description: </div>
          <textarea
            id="editor-text-area"
            defaultValue={this.props.content.description}
            onChange={e => this.props.onChangeHandler(e, "description")}
          />
        </div>
        <div className="tag-container">
          <div className="tag-label">
            <span>Tags:</span>
          </div>
          <Tags
            tagIds={this.props.content.tagIds}
            displayAddTag={true}
            onChangeHandler={this.props.onChangeHandler}
            addNewTag={this.props.addNewTag}
            updateBoardContent={this.props.updateBoardContent}
          />
        </div>
        <AcceptCancelButtons
          onAcceptHandler={() => {
            this.props.updateBoardContent(this.props.content, "cards");
            this.props.onAcceptHandler();
          }}
          onCancelHandler={this.props.onClose}
          acceptTitle={"Save"}
          cancelTitle={"Cancel"}
        />
      </div>
    );
  }
}

export default Editor;
