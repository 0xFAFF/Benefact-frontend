import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextArea from "react-textarea-autosize";
import { Tags, Voting } from "../../BoardComponents";
import { Comments } from "../../BoardComponents/Card/components";
import { AcceptCancelButtons } from "../../Popup";
import DeleteModal from "../DeleteModal";
import "./index.scss";

class Editor extends React.Component {
  state = {
    addComment: "",
    editComment: {
      id: null,
      message: ""
    },
    openDeleteModal: false,
    showDeleteModal: true
  };

  handleCloseModal = () => this.setState({ openDeleteModal: false });

  handleError = message => {
    this.setState({ showError: true, errorMessage: message });
  };

  onFocusEditComment = (id, text) => {
    this.setState({
      editComment: { id, message: text }
    });
  };

  onChangeComment = (e, type) => {
    if (type === "add") this.setState({ addComment: e.target.value });
    if (type === "edit") {
      e.persist();
      this.setState(prevState => {
        return {
          ...prevState,
          editComment: {
            ...prevState.editComment,
            message: e.target.value
          }
        };
      });
    }
  };

  onUpdateComment = async (commentType, id) => {
    const {
      addComment,
      editComment: { message }
    } = this.state;
    let action = "";
    let text = "";
    const type = "comments";
    let queryParams = {};
    if (commentType === "add") {
      action = "ADD";
      text = addComment;
      queryParams = {
        cardId: id,
        text
      };
    } else if (commentType === "edit") {
      action = "UPDATE";
      text = message;
      queryParams = {
        id,
        text
      };
    } else if (commentType === "delete") {
      action = "DELETE";
      queryParams = {
        id
      };
    }

    await this.props.handleUpdate(type, action, queryParams);
    this.setState(prevState => {
      return {
        ...prevState,
        addComment: "",
        editComment: {
          ...prevState.editComment,
          id: null,
          message: ""
        }
      };
    });
  };

  onUpdateVote = async voteType => {
    let queryParams = {};
    if (voteType === "add") {
      queryParams = {
        cardId: this.props.content.id,
        count: 1
      };
    } else if (voteType === "subtract") {
      queryParams = {
        cardId: this.props.content.id,
        count: -1
      };
    }

    await this.props.handleUpdate("votes", "UPDATE", queryParams);
  };

  render() {
    const {
      content,
      columns,
      onChangeHandler,
      addComponent,
      updateBoardContent,
      onAcceptHandler,
      onCancelHandler
    } = this.props;
    const {
      id = "",
      title = "",
      description = "",
      tagIds = [],
      columnId,
      comments = [],
      votes = []
    } = content;
    const { addComment } = this.state;

    return (
      <div id="editor-mode">
        <div className="editor-container">
          <FontAwesomeIcon
            className="container-icon"
            icon={"outdent"}
            size="lg"
          />
          <TextArea
            className="editor-text-area"
            id="editor-title"
            spellCheck={false}
            minRows={1}
            value={title}
            onChange={e => onChangeHandler(e, "title")}
          />
          {this.state.showDeleteModal && (
            <div className="editor-delete-card">
              <FontAwesomeIcon
                icon="trash"
                size="lg"
                className="editor-delete-card-icon"
                onClick={() => this.setState({ openDeleteModal: true })}
              />
            </div>
          )}
        </div>
        <div className="editor-header flex-row row-margin">
          {id ? (
            <div id="editor-id" className="flex-row">
              <FontAwesomeIcon
                className="container-icon container-icon-padding"
                icon={"id-card"}
                size="lg"
              />
              <div>{id}</div>
            </div>
          ) : null}
          <div className="editor-vote">
            <Voting
              defaultDisplay={true}
              size="lg"
              votes={votes}
              onUpdateVote={this.onUpdateVote}
            />
          </div>
        </div>
        <div id="editor-column" className="flex-row row-margin">
          <FontAwesomeIcon
            className="container-icon container-icon-padding"
            icon={"columns"}
            size="lg"
          />
          <div className="styled-select background-color semi-square">
            <select
              onChange={e => onChangeHandler(e, "columnId")}
              value={columnId}
            >
              {columns.map(option => {
                return (
                  <option key={option.id} value={option.id}>
                    {option.title}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="editor-container">
          <FontAwesomeIcon
            className="container-icon"
            style={{ paddingTop: "5px" }}
            icon={"tag"}
            size="lg"
          />
          <Tags
            tagIds={tagIds}
            displayAddTag={true}
            onChangeHandler={onChangeHandler}
            addComponent={addComponent}
            updateBoardContent={updateBoardContent}
          />
        </div>
        <div className="editor-container">
          <FontAwesomeIcon
            className="container-icon"
            style={{ paddingTop: "10px" }}
            icon={"newspaper"}
            size="lg"
          />
          <TextArea
            className="editor-text-area"
            minRows={1}
            value={description}
            onChange={e => onChangeHandler(e, "description")}
          />
        </div>
        <div className="editor-container">
          <FontAwesomeIcon
            className="container-icon"
            style={{ paddingTop: "10px" }}
            icon={"comment"}
            size="lg"
          />
          <TextArea
            className="editor-text-area"
            minRows={1}
            value={addComment}
            onChange={e => this.onChangeComment(e, "add")}
          />
          <button
            className="editor-comments-save"
            disabled={!this.state.addComment}
            onMouseDown={() => {
              if (this.state.addComment)
                this.onUpdateComment("add", this.props.content.id);
            }}
          >
            Add
          </button>
        </div>
        <div className="editor-container">
          <FontAwesomeIcon
            className="container-icon"
            style={{ paddingTop: comments.length > 0 ? "10px" : "0px" }}
            icon={"comments"}
            size="lg"
          />
          <Comments
            comments={comments}
            onUpdateComment={this.onUpdateComment}
            onChangeComment={this.onChangeComment}
            editComment={this.state.editComment}
            onFocusEditComment={this.onFocusEditComment}
          />
        </div>
        <AcceptCancelButtons
          onAcceptHandler={() => {
            updateBoardContent(content, "cards");
            onAcceptHandler();
          }}
          onCancelHandler={() => {
            this.setState({ addComment: "" });
            onCancelHandler();
          }}
          acceptTitle={"Save"}
          cancelTitle={"Reset"}
        />
        <DeleteModal
          handleCloseModal={this.handleCloseModal}
          isOpen={this.state.openDeleteModal}
          deleteComponent={this.props.deleteComponent}
          cardId={this.props.content.id}
        />
      </div>
    );
  }
}

Editor.propTypes = {
  content: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    tagIds: PropTypes.array,
    columnId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }),
  columns: PropTypes.array,
  onChangeHandler: PropTypes.func,
  addComponent: PropTypes.func,
  updateBoardContent: PropTypes.func,
  onAcceptHandler: PropTypes.func,
  onCancelHandler: PropTypes.func,
  openDeleteModal: PropTypes.func,
  deleteComponent: PropTypes.func
};

export default Editor;
