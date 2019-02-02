import React from "react";
import PropTypes from "prop-types";
import { Tags, Voting } from "../../BoardComponents";
import { AcceptCancelButtons } from "../../Popup";
import "./index.scss";

const Editor = props => {
  const {
    content,
    columns,
    onChangeHandler,
    addComponent,
    updateBoardContent,
    onAcceptHandler,
    onCancelHandler
  } = props;
  const {
    id = "",
    title = "",
    description = "",
    tagIds = [],
    columnId,
    comment = ""
  } = content;

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
        <div>Comment: </div>
        <textarea
          id="editor-text-area"
          value={comment}
          onChange={e => onChangeHandler(e, "comment")}
        />
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
        onCancelHandler={onCancelHandler}
        acceptTitle={"Save"}
        cancelTitle={"Reset"}
      />
    </div>
  );
};

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
