import React from "react";
import PropTypes from "prop-types";
import { Tags, Voting } from "../../BoardComponents";
import { AcceptCancelButtons } from "../../Popup";
import { AuthConsumer } from "../../../Auth/AuthContext";
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
      columnId
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
        <div className="editor-header">
          {id ? <div className="editor-id">ID: {id}</div> : null}
          <div className="editor-vote">
            <Voting />
          </div>
        </div>
        <div className="editor-title">
          <label>Title: </label>
          <input
            name="Title"
            type="text"
            value={title}
            onChange={e => onChangeHandler(e, "title")}
          />
        </div>
        <div className="editor-column">
          <label>Column: </label>
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
        <div className="editor-description">
          <div>Description: </div>
          <textarea
            id="editor-text-area"
            value={description}
            onChange={e => onChangeHandler(e, "description")}
          />
        </div>
        <div className="editor-comments">
          <div>Add Comment: </div>
          <textarea
            id="editor-text-area"
            value={addComment}
            onChange={onChangeComment}
          />
          <AuthConsumer>
            {token => (
              <button
                className="editor-comments-save"
                onMouseDown={() => {
                  if (this.state.addComment) onAddComment(token);
                }}
              >
                Save
              </button>
            )}
          </AuthConsumer>
        </div>
        <div className="tag-container">
          <div className="tag-label">
            <span>Tags:</span>
          </div>
          <Tags
            tagIds={tagIds}
            displayAddTag={true}
            onChangeHandler={onChangeHandler}
            addComponent={addComponent}
            updateBoardContent={updateBoardContent}
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
