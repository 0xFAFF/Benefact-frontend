import React from "react";
import initialData from "../../initial-data";
import { Column } from ".";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

class InnerList extends React.PureComponent {
  render() {
    const { column, taskMap, index, updateTaskContent } = this.props;
    const tasks = column.taskIds.map(taskId => taskMap[taskId]);
    return (
      <Column
        column={column}
        tasks={tasks}
        index={index}
        updateTaskContent={updateTaskContent}
      />
    );
  }
}

class Board extends React.Component {
  state = initialData;

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    // check if there is a destination
    if (!destination) return;

    // check if droppable has moved
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Move columns around
    if (type === "column") {
      const newColumnOrder = Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        columnOrder: newColumnOrder
      };
      this.setState(newState);
      return;
    }

    // current column of droppable
    const start = this.state.columns[source.droppableId];
    // new column of droppable
    const finish = this.state.columns[destination.droppableId];

    // Moving within one column
    if (start === finish) {
      // new tasks nonmutated array
      const newTaskIds = Array.from(start.taskIds);
      // Orders array for inserting droppable in new spot
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };

      this.setState(newState);
      return;
      // Call endpoint here to API endpoint to connect to backend as well
    }

    // Moving task from one column to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    this.setState(newState);
  };

  updateTaskContent = (id, newContent) => {
    const task = Object.entries(this.state.tasks).find(([k, v]) => v.id === id);
    let [newTaskKey, newTaskValue] = task;
    newTaskValue["content"] = newContent;
    const newState = {
      ...this.state,
      tasks: {
        ...this.state.tasks,
        [newTaskKey]: newTaskValue
      }
    };
    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
      >
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {provided => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly"
              }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {this.state.columnOrder.map((columnId, index) => {
                const column = this.state.columns[columnId];
                return (
                  <InnerList
                    key={column.id}
                    column={column}
                    taskMap={this.state.tasks}
                    index={index}
                    updateTaskContent={this.updateTaskContent}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default Board;
