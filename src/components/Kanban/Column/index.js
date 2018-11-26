import React from "react";
import { Task } from "..";
import { Droppable, Draggable } from "react-beautiful-dnd";
import "./index.scss";

class InnerList extends React.Component {
  render() {
    return this.props.tasks.map((task, index) => (
      <Task
        key={task.ID}
        task={task}
        index={index}
        updateTaskContent={this.props.updateTaskContent}
      />
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
      <Draggable draggableId={this.props.column.ID} index={this.props.index}>
        {provided => (
          <div
            id="column-draggable"
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={{ ...provided.draggableProps.style }}
          >
            <h3 {...provided.dragHandleProps}>{this.props.column.title}</h3>
            <Droppable droppableId={this.props.column.ID} type="task">
              {(provided, snapshot) => (
                <div
                  id="column-droppable"
                  ref={provided.innerRef}
                  style={{
                    backgroundColor: snapshot.isDraggingOver
                      ? "skyblue"
                      : "inherit"
                  }}
                  {...provided.droppableProps}
                >
                  <InnerList
                    tasks={this.props.tasks}
                    updateTaskContent={this.props.updateTaskContent}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div className="column-card">+ Add another card</div>
          </div>
        )}
      </Draggable>
    );
  }
}

export default Column;
