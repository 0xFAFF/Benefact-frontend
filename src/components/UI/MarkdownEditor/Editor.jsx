import React from "react";

class Editor extends React.Component {
  render() {
    return (
      <div id="editor-mode">
        <div>ID: {this.props.content.ID}</div>
        <div>
          <label>Title: </label>
          <input
            name="Title"
            type="text"
            defaultValue={this.props.content.Title}
            onChange={e => this.props.onChangeHandler(e, "Title")}
          />
        </div>
        <div>Description: </div>
        <textarea
          id="editor-text-area"
          defaultValue={this.props.content.Description}
          onChange={e => this.props.onChangeHandler(e, "Description")}
        />
        <div className="editor-button-group">
          <button
            className="editor-button-save"
            onClick={() => {
              this.props.updateContent(this.props.content);
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
