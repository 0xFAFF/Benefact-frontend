import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextArea from "react-textarea-autosize";
import { Tags, Voting } from "../../BoardComponents";
import { AcceptCancelButtons } from "../../Popup";
import { AuthConsumer } from "../../../Auth/AuthContext";
import { UsersConsumer } from "../../../Users/UsersContext";
import { URLS } from "../../../../constants";
import { fetching, camelCase } from "../../../../utils";
import "./index.scss";

class Editor extends React.Component {
  state = {
    addComment: ""
  };

  render() {
    const {
      content,
      columns,
      onChangeHandler,
      addComponent,
      updateBoardContent,
      onAcceptHandler,
      onCancelHandler,
      handleResetBoard
    } = this.props;
    const {
      id = "",
      title = "",
      description = "",
      tagIds = [],
      columnId,
      comments = []
    } = content;
    const { addComment } = this.state;

    const onChangeComment = e => {
      this.setState({ addComment: e.target.value });
    };

    const onAddComment = async token => {
      const url = URLS("comments", "ADD");
      const queryParams = {
        cardId: id,
        text: this.state.addComment
      };
      this.setState({ addComment: "" });
      await fetching(url, "POST", queryParams, token)
        .then(result => {
          if (result.hasError) {
            this.handleError(result.message);
          }
        })
        .then(async result => {
          const url = URLS("cards", "GET");
          await fetching(url, "GET").then(result => {
            let formattedData = camelCase(result.data);
            handleResetBoard(formattedData);
          });
        });
    };

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
            <Voting defaultDisplay={true} size="lg" />
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
            // onFocus={() =>
            //   onChangeHandler({ target: { value: "hello" } }, "description")
            // }
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
            // onFocus={() =>
            //   onChangeHandler({ target: { value: "hello" } }, "description")
            // }
            onChange={onChangeComment}
          />
          <AuthConsumer>
            {token => (
              <button
                className="editor-comments-save"
                disabled={!this.state.addComment}
                onMouseDown={() => {
                  if (this.state.addComment) onAddComment(token);
                }}
              >
                Save
              </button>
            )}
          </AuthConsumer>
        </div>
        <div className="editor-container">
          <FontAwesomeIcon
            className="container-icon"
            style={{ paddingTop: comments.length > 0 ? "10px" : "0px" }}
            icon={"comments"}
            size="lg"
          />
          <UsersConsumer>
            {users => {
              return (
                <div>
                  {comments.map(
                    ({ id, text, userId, createdTime, editedTime }) => {
                      const userData = users.find(user => user.id === userId);
                      const userName = userData["name"];
                      const userEmail = userData["email"];
                      return (
                        <div key={id} className="editor-activity">
                          <div className="editor-activity-header">
                            <div className="editor-activity-name">
                              {userName ? (
                                <div>{userName}</div>
                              ) : (
                                <div>{userEmail}</div>
                              )}
                            </div>
                            <div className="editor-activity-time">
                              {editedTime
                                ? moment
                                    .unix(editedTime)
                                    .format("MMM D [at] h:mm A z")
                                : moment
                                    .unix(createdTime)
                                    .format("MMM D [at] h:mm A z")}
                            </div>
                          </div>
                          <div className="editor-activity-text">{text}</div>
                          <div className="editor-activity-actions">
                            <div className="editor-activity-edit">Edit</div>
                            <div className="editor-activity-delete">Delete</div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              );
            }}
          </UsersConsumer>
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
  onCancelHandler: PropTypes.func
};

export default Editor;
