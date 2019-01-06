import React from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Card } from "../../../UI/BoardComponents";
import { TagsProvider } from "../../../UI/BoardComponents/Tags/TagsContext";
import "./index.scss";

const InnerList = props => {
  const { cards, ...rest } = props;
  return cards.map((card, index) => (
    <Card key={card.id} card={card} index={index} {...rest} />
  ));
};

InnerList.propTypes = {
  cards: PropTypes.array,
  columns: PropTypes.array,
  updateBoardContent: PropTypes.func,
  deleteComponent: PropTypes.func
};

const Board = props => {
  const {
    cards,
    columns,
    tags,
    updateBoardContent,
    deleteComponent,
    listOnDragEnd
  } = props;
  return (
    <div id="list-board">
      <DragDropContext
        onDragEnd={res => listOnDragEnd(res)}
        // onDragStart={this.onDragStart}
        // onDragUpdate={this.onDragUpdate}
      >
        <Droppable droppableId={"column-droppable"} type="card">
          {(provided, snapshot) => (
            <TagsProvider value={tags}>
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
                  cards={cards}
                  columns={columns}
                  updateBoardContent={updateBoardContent}
                  deleteComponent={deleteComponent}
                />
                {provided.placeholder}
              </div>
            </TagsProvider>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

Board.propTypes = {
  cards: PropTypes.array,
  columns: PropTypes.array,
  tags: PropTypes.array,
  updateBoardContent: PropTypes.func,
  deleteComponent: PropTypes.func,
  listOnDragEnd: PropTypes.func
};

export default Board;
