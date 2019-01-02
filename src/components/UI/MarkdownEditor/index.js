import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Editor from "./Editor";
import Preview from "./Preview";
import "./index.scss";

class MarkdownEditor extends React.Component {
  state = {
    mode: "editor",
    newContent: {}
  };

  componentDidMount() {
    const { index, ...rest } = this.props.content;
    this.setState({
      newContent: {
        title: "",
        description: "",
        tagIds: [],
        columnId: "",
        ...rest
      }
    });
  }

  resetContent = () => {
    const updateKeys = ["title", "description", "tagIds"];
    const resetVals = { ...this.state.newContent };
    Object.entries(this.state.newContent).forEach(([key, value]) => {
      if (updateKeys.find(field => field === key)) {
        resetVals[key] =
          typeof value === "object" && Array.isArray(value)
            ? []
            : typeof value === "object"
            ? {}
            : "";
      }
    });
    this.setState({ newContent: resetVals });
  };

  toggleMode = mode => {
    if (mode !== this.state.mode) {
      this.setState({ mode });
    }
  };

  onChangeHandler = (e, key) => {
    let newState = {};
    if (key === "tag") {
      const tagIds = [...(this.state.newContent.tagIds || [])];
      const index = tagIds.findIndex(tag => tag === e);
      if (index !== -1) {
        tagIds.splice(index, 1);
      } else {
        tagIds.push(e);
      }
      newState = {
        newContent: {
          ...this.state.newContent,
          tagIds
        }
      };
    } else {
      const value =
        key === "columnId" ? parseInt(e.target.value) : e.target.value;
      newState = {
        newContent: {
          ...this.state.newContent,
          [key]: value
        }
      };
    }
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
          <button className={`button-delete-card`}>
            <div>
              <FontAwesomeIcon icon="trash" size="sm" />
              <span>Delete</span>
            </div>
          </button>
        </div>
        <div className="markdown-modes">
          {this.state.mode === "editor" && (
            <Editor
              content={this.state.newContent}
              columns={this.props.columns}
              onChangeHandler={this.onChangeHandler}
              updateBoardContent={this.props.updateBoardContent}
              addNewTag={this.props.addNewTag}
              onAcceptHandler={this.props.onAcceptHandler}
              onCancelHandler={this.resetContent}
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
