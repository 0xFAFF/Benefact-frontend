import React from "react";
import { Draggable } from "react-beautiful-dnd";
import TaskHandler from "../TaskHandler";
import { Modal, MarkdownEditor } from "../../UI";
import marked from "marked";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

class Task extends React.Component {
  state = { showModal: false };
  handleShowMessageClick = () => this.setState({ showModal: true });
  handleCloseModal = () => this.setState({ showModal: false });

  rawMarkup = () => {
    const { ID = "N/A", Title = "N/A" } = this.props.task;
    const taskDescription = "ID: " + ID + "\nTitle: " + Title;
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false
      // highlight: function (code) {
      //     return hljs.highlightAuto(code).value
      // }
    });

    let rawMarkup = marked(taskDescription, { sanitize: true });
    return {
      __html: rawMarkup
    };
  };

  render() {
    const isDragDisabled = this.props.task.ID === "task-1";
    return (
      <Draggable draggableId={this.props.task.ID} index={this.props.index}>
        {(provided, snapshot) => {
          return (
            <div
              id="task-draggable"
              className={snapshot.isDragging ? "isDragging" : ""}
              ref={provided.innerRef}
              {...provided.draggableProps}
              style={{ ...provided.draggableProps.style }}
            >
              <TaskHandler dragHandleProps={provided.dragHandleProps} />
              <div className="task-description">
                <div dangerouslySetInnerHTML={this.rawMarkup()} />
                <div style={{ cursor: "pointer" }}>
                  <FontAwesomeIcon
                    icon="edit"
                    size="lg"
                    onClick={this.handleShowMessageClick}
                  />
                </div>
                {this.state.showModal ? (
                  <Modal onClose={this.handleCloseModal}>
                    <MarkdownEditor
                      content={this.props.task}
                      updateContent={this.props.updateTaskContent}
                      onClose={this.handleCloseModal}
                    />
                  </Modal>
                ) : null}
              </div>
            </div>
          );
        }}
      </Draggable>
    );
  }
}

export default Task;
