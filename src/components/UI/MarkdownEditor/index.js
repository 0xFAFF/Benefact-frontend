import React from "react";
import PropTypes from "prop-types";
import { isEqual, sortBy, get } from "lodash";
import Editor from "./Editor";
import "./index.scss";

class MarkdownEditor extends React.Component {
  static propTypes = {
    columns: PropTypes.array,
    updateBoardContent: PropTypes.func,
    addComponent: PropTypes.func,
    onAcceptHandler: PropTypes.func,
    onClose: PropTypes.func,
    type: PropTypes.string,
    deleteComponent: PropTypes.func,
    handleResetBoard: PropTypes.func,
    updateComment: PropTypes.func
  };

  state = {
    newContent: {}
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const prevComments = get(prevState, "newContent.comments", []);
    const nextComments = get(nextProps, "content.comments", []);
    if (!isEqual(sortBy(prevComments), sortBy(nextComments))) {
      return {
        ...prevState,
        newContent: {
          ...prevState.newContent,
          comments: nextComments
        }
      };
    }
    return prevState;
  }

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
      deleteComponent,
      handleResetBoard,
      updateComment
    } = this.props;
    return (
      <div id="markdown-editor">
        <div className="markdown-modes">
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
            handleResetBoard={handleResetBoard}
            deleteComponent={deleteComponent}
            updateComment={updateComment}
          />
        </div>
      </div>
    );
  }
}

export default MarkdownEditor;
