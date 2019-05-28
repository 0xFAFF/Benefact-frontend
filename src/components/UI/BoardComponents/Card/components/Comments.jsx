import React from "react";
import { isEqual, sortBy, get } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Comments.scss";
import { MarkdownEditor } from "components/UI";
import EditorActivity from "components/UI/BoardComponents/Card/components/EditorActivity";
import { PageProp } from "components/Pages/PageContext";
import { formatTime } from "utils";
import { AcceptCancelButtons } from "components/UI/PageComponents";

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
      content: { id, authorId },
      comments = [],
      page: {
        hasPrivilege,
        data: { roles }
      }
    } = this.props;
    const editComment = this.state.editComment || {};
    const onFocusEditComment = (id, text) => {
      if (this.state.editComment.id !== id) this.setState({ editComment: { id, message: text } });
    };
    const onBlurEditComment = (id, text) => {
      if (this.state.editComment.id === id && text === this.state.editComment.message)
        this.setState({ editComment: { id: null, message: "" } });
    };
    return (
      <>
        {hasPrivilege("comment", authorId) && (
          <EditorActivity icon={"comment"} dataTip="Card Comment">
            <div id="comment-entry-container">
              <MarkdownEditor
                minRows={1}
                value={this.state.addComment}
                placeholder="Leave a comment"
                onChange={e => this.setState({ addComment: e.target.value })}
              />
              {this.state.addComment && (
                <AcceptCancelButtons
                  acceptTitle="Comment"
                  cancelTitle="Cancel"
                  onAcceptHandler={() => this.onUpdateComment("add", id)}
                  onCancelHandler={() => this.setState({ addComment: "" })}
                />
              )}
            </div>
          </EditorActivity>
        )}
        {!comments.length ? null : (
          <EditorActivity icon={"comments"} dataTip="Card Comments">
            <div id="comment-entry-container">
              {comments.map(({ id, text, userId, createdTime, editedTime }) => {
                const { user: { name = "", email = "" } = {} } = roles.find(
                  role => role.userId === userId
                );
                return (
                  <div key={id} className="comment-entry">
                    <div className="comment-entry-header">
                      <div className="comment-entry-header-left">
                        <div className="comment-entry-name">
                          {name ? <div>{name}</div> : <div>{email}</div>}
                        </div>
                        <div className="comment-entry-time">
                          {editedTime ? (
                            <div>
                              <span>{formatTime(editedTime)}</span>
                              <span>(Edited)</span>
                            </div>
                          ) : (
                            formatTime(createdTime)
                          )}
                        </div>
                      </div>
                      {hasPrivilege("developer", userId) && (
                        <div className="comment-entry-header-right">
                          <FontAwesomeIcon
                            icon={"trash"}
                            size="sm"
                            className="delete"
                            onClick={() => this.onUpdateComment("delete", id)}
                          />
                        </div>
                      )}
                    </div>
                    <div className="text-container col">
                      <MarkdownEditor
                        allowEdit={hasPrivilege("developer", userId)}
                        value={editComment.id === id ? editComment.message : text}
                        editing={editComment.id === id}
                        onFocus={() => onFocusEditComment(id, text)}
                        onBlur={() => onBlurEditComment(id, text)}
                        onChange={e => this.onChangeComment(e, "edit", id)}
                      />
                      {editComment.id === id && (
                        <AcceptCancelButtons
                          acceptTitle="Save"
                          cancelTitle="Cancel"
                          onAcceptHandler={() => this.onUpdateComment("edit", id)}
                          onCancelHandler={() =>
                            this.setState({ editComment: { id: null, message: "" } })
                          }
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </EditorActivity>
        )}
      </>
    );
  }
}

export default PageProp(Comments);
