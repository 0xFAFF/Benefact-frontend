import React from "react";
import Categories from "../../Views/Kanban/Tags/Categories";

class Editor extends React.Component {
  render() {
    return (
      <div id="editor-mode">
        <div>ID: {this.props.content.id}</div>
        <div>
          <label>Title: </label>
          <input
            name="Title"
            type="text"
            defaultValue={this.props.content.title}
            onChange={e => this.props.onChangeHandler(e, "title")}
          />
        </div>
        <div className="description">
          <div>Description: </div>
          <textarea
            id="editor-text-area"
            defaultValue={this.props.content.description}
            onChange={e => this.props.onChangeHandler(e, "description")}
          />
        </div>
        <div>
          <div className="tag-label">
            <span>Tags:</span>
          </div>
          <Categories
            categories={this.props.content.categories}
            displayAddCategory={true}
            onChangeHandler={this.props.onChangeHandler}
          />
        </div>
        <div className="editor-button-group">
          <button
            className="editor-button-save"
            onClick={() => {
              this.props.updateContent(this.props.content);
              this.props.onClose();
            }}
          >
            Save
          </button>
          <button className="editor-button-cancel" onClick={this.props.onClose}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default Editor;
