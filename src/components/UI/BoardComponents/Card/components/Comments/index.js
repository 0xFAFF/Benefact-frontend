import React from "react";
import { UsersConsumer } from "../../../../../Users/UsersContext";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextArea from "react-textarea-autosize";
import "./index.scss";

class Comments extends React.Component {
  render() {
    const {
      comments = [],
      onUpdateComment,
      onChangeComment,
      editComment = {},
      onFocusEditComment
    } = this.props;
    return (
      <UsersConsumer>
        {users => {
          return (
            <div id="editor-activity-container">
              {comments.map(({ id, text, userId, createdTime, editedTime }) => {
                const userData = users.find(user => user.id === userId);
                const userName = userData["name"];
                const userEmail = userData["email"];
                return (
                  <div key={id} className="editor-activity">
                    <div className="editor-activity-header">
                      <div className="editor-activity-header-left">
                        <div className="editor-activity-name">
                          {userName ? (
                            <div>{userName}</div>
                          ) : (
                            <div>{userEmail}</div>
                          )}
                        </div>
                        <div className="editor-activity-time">
                          {editedTime ? (
                            <div>
                              <span>
                                {moment
                                  .unix(editedTime)
                                  .format("MMM D [at] h:mm A z")}
                              </span>
                              <span>(Edited)</span>
                            </div>
                          ) : (
                            moment
                              .unix(createdTime)
                              .format("MMM D [at] h:mm A z")
                          )}
                        </div>
                      </div>
                      <div className="editor-activity-header-right">
                        <FontAwesomeIcon
                          icon="minus-circle"
                          size="sm"
                          className="delete"
                          onClick={() => onUpdateComment("delete", id)}
                        />
                      </div>
                    </div>
                    <div className="editor-activity-text-container">
                      <TextArea
                        className="editor-activity-text"
                        minRows={1}
                        value={
                          editComment.id === id ? editComment.message : text
                        }
                        onFocus={() => onFocusEditComment(id, text)}
                        onChange={e => onChangeComment(e, "edit", id)}
                      />
                      {editComment.id === id && (
                        <button
                          className="editor-comments-save edit-comment-save"
                          onMouseDown={() => {
                            onUpdateComment("edit", id);
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
          );
        }}
      </UsersConsumer>
    );
  }
}

export default Comments;
