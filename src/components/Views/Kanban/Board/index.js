import React from "react";
import { Column, TagsProvider } from "..";
import { AddColumn } from "../../../UI/AddComponent";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { getCards } from "../../../../utils";
import "./index.scss";

class InnerList extends React.PureComponent {
  render() {
    const { column, cardMap, ...rest } = this.props;
    const cards = getCards(cardMap, column.id);
    return <Column column={column} cards={cards} cardMap={cardMap} {...rest} />;
  }
}

class Board extends React.Component {
  render() {
    return (
      <div id="kanban-board">
        <div className="add-column-outer">
          <AddColumn addNewColumn={this.props.addNewColumn} />
        </div>
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
              <TagsProvider value={this.props.tags}>
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
                        cardMap={this.props.cards}
                        index={index}
                        updateCardContent={this.props.updateCardContent}
                        updateColumnContent={this.props.updateColumnContent}
                        addNewCard={this.props.addNewCard}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
              </TagsProvider>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default Board;
