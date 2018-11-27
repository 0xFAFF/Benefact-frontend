import React from "react";
import Editor from "./Editor";
import Preview from "./Preview";
import "./index.scss";

class MarkdownEditor extends React.Component {
  state = {
    mode: "editor",
    newContent: this.props.content
  };

  toggleMode = mode => {
    if (mode !== this.state.mode) {
      this.setState({ mode });
    }
  };

  onChangeHandler = (e, key) => {
    const newState = {
      newContent: {
        ...this.state.newContent,
        [key]: e.target.value
      }
    };
    this.setState(newState);
  };

  render() {
    return (
      <div id="markdown-editor">
        <div className="button-group-modes">
          <button
            className={`button-editor ${
              this.state.mode === "editor" ? "button-active" : ""
            }`}
            onClick={() => this.toggleMode("editor")}
          >
            Editor
          </button>
          <button
            className={`button-preview ${
              this.state.mode === "preview" ? "button-active" : ""
            }`}
            onClick={() => this.toggleMode("preview")}
          >
            Preview
          </button>
        </div>
        <div className="markdown-modes">
          {this.state.mode === "editor" && (
            <Editor
              content={this.state.newContent}
              onChangeHandler={this.onChangeHandler}
              updateContent={this.props.updateContent}
              onClose={this.props.onClose}
              type={this.props.type}
            />
          )}
          {this.state.mode === "preview" && (
            <Preview content={this.state.newContent} />
          )}
        </div>
      </div>
    );
  }
}

export default MarkdownEditor;
