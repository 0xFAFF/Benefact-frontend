import React from "react";
import { Tags } from "../BoardComponents";

class Editor extends React.Component {
  render() {
    return (
      <div id="editor-mode">
        <div>ID: {this.props.content.id}</div>
        <div>
          <label>Title: </label>
          <input
            name="Title"
            type="text"
            defaultValue={this.props.content.title}
            onChange={e => this.props.onChangeHandler(e, "title")}
          />
        </div>
        <div className="description">
          <div>Description: </div>
          <textarea
            id="editor-text-area"
            defaultValue={this.props.content.description}
            onChange={e => this.props.onChangeHandler(e, "description")}
          />
        </div>
        <div>
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
        <div className="editor-button-group">
          <button
            className="editor-button-save"
            onClick={() => {
              this.props.updateBoardContent(this.props.content, "cards");
              this.props.onClose();
            }}
          >
            Save
          </button>
          <button className="editor-button-cancel" onClick={this.props.onClose}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default Editor;
