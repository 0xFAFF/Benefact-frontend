import React from "react";
import { Draggable } from "react-beautiful-dnd";

class Task extends React.Component {
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
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "red",
                  borderRadius: "4px",
                  marginRight: "8px"
                }}
                {...provided.dragHandleProps}
              />
              {this.props.task.content}
            </div>
          );
        }}
      </Draggable>
    );
  }
}

export default Task;
