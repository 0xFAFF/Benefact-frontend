import React from "react";
import moment from "moment";
import { isEqual, sortBy, get } from "lodash";
import { UsersConsumer } from "components/Users/UsersContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Comments.scss";
import MarkdownEditor from "components/UI/MarkdownEditor/MarkdownEditor";
import EditorActivity from "components/UI/BoardComponents/Card/components/EditorActivity";

class Comments extends React.Component {
  state = {
    addComment: "",
    editComment: {
      id: null,
      message: ""
    }
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

  onChangeComment = e => {
    e.persist();
    this.setState(prevState => {
      return {
        editComment: {
          ...prevState.editComment,
          message: e.target.value
        }
      };
    });
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
        addComment: "",
        editComment: {
          ...prevState.editComment,
          id: null,
          message: ""
        }
      };
    });
  };

  render() {
    const {
      content: { id },
      comments = []
    } = this.props;
    const editComment = this.state.editComment || {};
    const onFocusEditComment = (id, text) =>
      this.setState({
        editComment: { id, message: text }
      });
    return (
      <UsersConsumer>
        {users => {
          return (
            <>
              <EditorActivity icon={"comment"}>
                <div id="comment-entry-container">
                  <MarkdownEditor
                    minRows={1}
                    value={this.state.addComment}
                    onChange={e => this.setState({ addComment: e.target.value })}
                  />
                </div>
                <button
                  className="editor-comments-save"
                  disabled={!this.state.addComment}
                  onMouseDown={() => {
                    if (this.state.addComment) this.onUpdateComment("add", id);
                  }}
                >
                  Add
                </button>
              </EditorActivity>
              {!comments.length ? null : <EditorActivity icon={"comments"}>
                <div id="comment-entry-container">
                  {comments.map(({ id, text, userId, createdTime, editedTime }) => {
                    const userData = users.find(user => user.id === userId) || { name: "", email: "" };
                    const userName = userData["name"];
                    const userEmail = userData["email"];
                    return (
                      <div key={id} className="comment-entry">
                        <div className="comment-entry-header">
                          <div className="comment-entry-header-left">
                            <div className="comment-entry-name">
                              {userName ? <div>{userName}</div> : <div>{userEmail}</div>}
                            </div>
                            <div className="comment-entry-time">
                              {editedTime ? (
                                <div>
                                  <span>{moment.unix(editedTime).format("MMM D [at] h:mm A z")}</span>
                                  <span>(Edited)</span>
                                </div>
                              ) : (
                                moment.unix(createdTime).format("MMM D [at] h:mm A z")
                              )}
                            </div>
                          </div>
                          <div className="comment-entry-header-right">
                            <FontAwesomeIcon
                              icon={"trash"}
                              size="sm"
                              className="delete"
                              onClick={() => this.onUpdateComment("delete", id)}
                            />
                          </div>
                        </div>
                        <div className="comment-entry-text-container">
                          <MarkdownEditor
                            value={editComment.id === id ? editComment.message : text}
                            onFocus={() => onFocusEditComment(id, text)}
                            onChange={e => this.onChangeComment(e, "edit", id)}
                          />
                          {editComment.id === id && (
                            <button
                              className="editor-comments-save edit-comment-save"
                              onMouseDown={() => {
                                this.onUpdateComment("edit", id);
                              }}
                            >
                              Save
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </EditorActivity>}
            </>
          );
        }}
      </UsersConsumer>
    );
  }
}

export default Comments;
