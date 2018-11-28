import React from "react";
import { data } from "../../../initial-data";
import { Column } from "..";
import AddColumn from "./AddColumn";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "./index.scss";

class InnerList extends React.PureComponent {
  render() {
    const {
      column,
      cardMap,
      index,
      updateCardContent,
      addNewCard
    } = this.props;
    const cards = column.cardIds.map(cardId =>
      cardMap.find(card => card.ID === cardId)
    );
    return (
      <Column
        column={column}
        cards={cards}
        index={index}
        updateCardContent={updateCardContent}
        addNewCard={addNewCard}
        cardMap={cardMap}
      />
    );
  }
}

class Board extends React.Component {
  state = data;

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
    const start = this.state.columns.find(
      column => column.ID === source.droppableId
    );
    // new column of droppable
    const finish = this.state.columns.find(
      column => column.ID === destination.droppableId
    );

    // Moving within one column
    if (start === finish) {
      // new cards nonmutated array
      const newCardIds = Array.from(start.cardIds);
      // Orders array for inserting droppable in new spot
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        cardIds: newCardIds
      };

      let oldColumns = this.state.columns;
      oldColumns[
        oldColumns.findIndex(column => column.ID === newColumn.ID)
      ] = newColumn;
      const newState = {
        ...this.state,
        columns: oldColumns
      };
      this.setState(newState);
      return;
      // Call endpoint here to API endpoint to connect to backend as well
    }

    // Moving card from one column to another
    const startCardIds = Array.from(start.cardIds);
    startCardIds.splice(source.index, 1);
    const newStart = {
      ...start,
      cardIds: startCardIds
    };

    const finishCardIds = Array.from(finish.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      cardIds: finishCardIds
    };

    let oldColumns = this.state.columns;
    oldColumns[
      oldColumns.findIndex(column => column.ID === newStart.ID)
    ] = newStart;
    oldColumns[
      oldColumns.findIndex(column => column.ID === newFinish.ID)
    ] = newFinish;
    const newState = {
      ...this.state,
      columns: oldColumns
    };
    this.setState(newState);
  };

  updateCardContent = newContent => {
    const card = Object.entries(this.state.cards).find(
      ([k, v]) => v.ID === newContent.ID
    );
    let [newCardKey, newCardValue] = card;
    newCardValue = newContent;
    const newState = {
      ...this.state,
      cards: {
        ...this.state.cards,
        [newCardKey]: newCardValue
      }
    };
    this.setState(newState);
  };

  addNewCard = (newContent, columnID) => {
    const newId = Object.keys(this.state.cards).length + 1;
    const newCard = {
      [newId]: {
        ID: newId,
        Title: newContent.Title || "",
        Description: newContent.Description || "",
        Categories: newContent.Categories || null
      }
    };
    const newState = {
      ...this.state,
      cards: {
        ...this.state.cards,
        ...newCard
      },
      columns: {
        ...this.state.columns,
        [columnID]: {
          ...this.state.columns[columnID],
          cardIds: [...this.state.columns[columnID].cardIds, newId]
        }
      }
    };
    this.setState(newState);
  };

  addNewColumn = title => {
    const newId = Object.keys(this.state.columns).length + 1;
    const columnID = `column-${newId}`;
    const newColumn = {
      [columnID]: {
        ID: columnID,
        title,
        cardIds: []
      }
    };
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        ...newColumn
      },
      columnOrder: [...this.state.columnOrder, columnID]
    };
    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
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
              {this.state.columnOrder.map((columnId, index) => {
                const column = this.state.columns.find(
                  column => column.ID === columnId
                );
                return (
                  <InnerList
                    key={column.ID}
                    column={column}
                    cardMap={this.state.cards}
                    index={index}
                    updateCardContent={this.updateCardContent}
                    addNewCard={this.addNewCard}
                  />
                );
              })}{" "}
              {provided.placeholder}
              <AddColumn addNewColumn={this.addNewColumn} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default Board;
