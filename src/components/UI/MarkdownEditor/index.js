import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Editor from "./Editor";
import Preview from "./Preview";
import DeleteModal from "./DeleteModal";
import "./index.scss";

class MarkdownEditor extends React.Component {
  static propTypes = {
    columns: PropTypes.array,
    updateBoardContent: PropTypes.func,
    addComponent: PropTypes.func,
    onAcceptHandler: PropTypes.func,
    onClose: PropTypes.func,
    type: PropTypes.string,
    deleteComponent: PropTypes.func
  };

  state = {
    mode: "editor",
    newContent: {},
    openDeleteModal: false
  };

  componentDidMount() {
    const { columns = [], content } = this.props;
    const { index, ...rest } = content;
    const defaultColumnId = columns[0].id;
    this.setState({
      newContent: {
        title: "",
        description: "",
        tagIds: [],
        columnId: defaultColumnId,
        ...rest
      }
    });
  }

  handleCloseModal = () => this.setState({ openDeleteModal: false });

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
      let value = "";
      if (key === "columnId") {
        value = e.target.value === "" ? null : parseInt(e.target.value);
      } else {
        value = e.target.value;
      }
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
    const {
      columns,
      updateBoardContent,
      addComponent,
      onAcceptHandler,
      onClose,
      type,
      deleteComponent
    } = this.props;
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
          {this.props.showDeleteModal && (
            <button
              className={`button-delete-card`}
              onClick={() => this.setState({ openDeleteModal: true })}
            >
              <FontAwesomeIcon icon="trash" size="sm" />
            </button>
          )}
        </div>
        <div className="markdown-modes">
          {this.state.mode === "editor" && (
            <Editor
              content={this.state.newContent}
              columns={columns}
              onChangeHandler={this.onChangeHandler}
              updateBoardContent={updateBoardContent}
              addComponent={addComponent}
              onAcceptHandler={onAcceptHandler}
              onCancelHandler={this.resetContent}
              onClose={onClose}
              type={type}
            />
          )}
          {this.state.mode === "preview" && (
            <Preview content={this.state.newContent} />
          )}
        </div>
        <DeleteModal
          handleCloseModal={this.handleCloseModal}
          isOpen={this.state.openDeleteModal}
          deleteComponent={deleteComponent}
          cardId={this.state.newContent.id}
        />
      </div>
    );
  }
}

export default MarkdownEditor;
