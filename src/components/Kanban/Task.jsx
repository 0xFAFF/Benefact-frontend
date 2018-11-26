import React from "react";
import { Draggable } from "react-beautiful-dnd";
import TaskHandler from "./TaskHandler";
import { Modal, MarkdownEditor } from "../UI";
import marked from "marked";

class Task extends React.Component {
  state = { showModal: false };
  handleShowMessageClick = () => this.setState({ showModal: true });
  handleCloseModal = () => this.setState({ showModal: false });

  rawMarkup = () => {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false
      // highlight: function (code) {
      //     return hljs.highlightAuto(code).value
      // }
    });

    var rawMarkup = marked(this.props.task.content, { sanitize: true });
    return {
      __html: rawMarkup
    };
  };

  render() {
    const isDragDisabled = this.props.task.id === "task-1";
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => {
          const style = {
            border: "1px solid lightgrey",
            borderRadius: "2px",
            padding: "8px",
            marginBottom: "8px",
            height: "50px",
            backgroundColor: isDragDisabled
              ? "lightgrey"
              : snapshot.isDragging
              ? "lightgreen"
              : "white",

            display: "flex",
            ...provided.draggableProps.style
          };

          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              style={style}
            >
              <TaskHandler dragHandleProps={provided.dragHandleProps} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "90%"
                }}
              >
                <div dangerouslySetInnerHTML={this.rawMarkup()} />
                <button onClick={this.handleShowMessageClick}>Edit Task</button>
                {this.state.showModal ? (
                  <Modal onClose={this.handleCloseModal}>
                    <MarkdownEditor
                      id={this.props.task.id}
                      content={this.props.task.content}
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
