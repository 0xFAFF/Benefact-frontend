import React from "react";
import { Column } from "../../../UI/BoardComponents";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { getCards } from "../../../../utils";
import "./index.scss";

class InnerList extends React.PureComponent {
  render() {
    const { column, cardMap } = this.props;
    const cards = getCards(cardMap, column.id);
    return <Column {...this.props} cards={cards} />;
  }
}

class Board extends React.Component {
  render() {
    return (
      <div id="kanban-board">
        <DragDropContext
          onDragEnd={res => this.props.kanbanOnDragEnd(res)}
          // onDragStart={this.onDragStart}
          // onDragUpdate={this.onDragUpdate}
        >
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {provided => (
              <div
                id="board-droppable"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {this.props.columnOrder.map((columnId, index) => {
                  const column = this.props.columns.find(
                    column => column.id === columnId
                  );
                  return (
                    <InnerList
                      key={column.id}
                      column={column}
                      columns={this.props.columns}
                      cardMap={this.props.cards}
                      index={index}
                      updateBoardContent={this.props.updateBoardContent}
                      addComponent={this.props.addComponent}
                      deleteComponent={this.props.deleteComponent}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default Board;
