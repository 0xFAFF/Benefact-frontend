import React from "react";
import Task from "./Task";
import { Droppable, Draggable } from "react-beautiful-dnd";

class InnerList extends React.Component {
  render() {
    return this.props.tasks.map((task, index) => (
      <Task key={task.id} task={task} index={index} />
    ));
  }
}

class Column extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.tasks === this.props.tasks) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={{
              margin: "8px",
              border: "1px solid lightgrey",
              backgroundColor: "white",
              borderRadius: "2px",
              width: "33%",

              display: "flex",
              flexDirection: "column",
              ...provided.draggableProps.style
            }}
          >
            <h3 {...provided.dragHandleProps} style={{ padding: "8px" }}>
              {this.props.column.title}
            </h3>
            <Droppable droppableId={this.props.column.id} type="task">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={{
                    padding: "8px",
                    transition: "background-color 0.2s ease",
                    backgroundColor: snapshot.isDraggingOver
                      ? "skyblue"
                      : "inherit",
                    flexGrow: 1,
                    minHeight: "100px"
                  }}
                  {...provided.droppableProps}
                >
                  <InnerList tasks={this.props.tasks} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    );
  }
}

export default Column;
