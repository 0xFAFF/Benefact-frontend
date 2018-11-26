import React from "react";

class Editor extends React.Component {
  render() {
    return (
      <div id="editor-mode">
        <div>Editor Mode</div>
        <textarea
          id="editor-text-area"
          defaultValue={this.props.content}
          onChange={this.props.onChangeHandler}
        />
        <div className="editor-button-group">
          <button
            onClick={() => {
              this.props.updateContent(this.props.id, this.props.content);
              this.props.onClose();
            }}
          >
            Accept
          </button>
          <button onClick={this.props.onClose}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default Editor;
