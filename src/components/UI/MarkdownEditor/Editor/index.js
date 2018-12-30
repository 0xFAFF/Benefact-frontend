import React from "react";
import { Tags } from "../../BoardComponents";
import { AcceptCancelButtons } from "../../Popup";
import "./index.scss";

const Editor = props => {
  const {
    content,
    onChangeHandler,
    addNewTag,
    updateBoardContent,
    onAcceptHandler,
    onCancelHandler
  } = props;
  const { id = "", title = "", description = "", tagIds = [] } = content;
  return (
    <div id="editor-mode">
      <div className="editor-id">ID: {id}</div>
      <div className="editor-title">
        <label>Title: </label>
        <input
          name="Title"
          type="text"
          value={title}
          onChange={e => onChangeHandler(e, "title")}
        />
      </div>
      <div className="editor-description">
        <div>Description: </div>
        <textarea
          id="editor-text-area"
          value={description}
          onChange={e => onChangeHandler(e, "description")}
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
          addNewTag={addNewTag}
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

export default Editor;
