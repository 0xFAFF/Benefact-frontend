import React from "react";
import { Card, TagsProvider } from "../../Kanban";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "./index.scss";

class InnerList extends React.Component {
  render() {
    return this.props.cards.map((card, index) => (
      <Card
        key={card.id}
        card={card}
        index={index}
        updateCardContent={this.props.updateCardContent}
      />
    ));
  }
}

class Board extends React.Component {
  render() {
    return (
      <div id="list-board">
        <DragDropContext
          onDragEnd={res => this.props.listOnDragEnd(res)}
          // onDragStart={this.onDragStart}
          // onDragUpdate={this.onDragUpdate}
        >
          <Droppable droppableId={"column-droppable"} type="card">
            {(provided, snapshot) => (
              <TagsProvider value={this.props.tags}>
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
                    cards={this.props.cards}
                    updateCardContent={this.props.updateCardContent}
                  />
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
