import React from "react";
import PropTypes from "prop-types";
import { Card } from "../../../UI/BoardComponents";
import "./List.scss";
import { DragDropContext, Droppable } from "components/DND";

const List = props => {
  const {
    cards,
    columns,
    updateBoardContent,
    handleUpdate,
    listOnDragEnd,
    groupName,
    openCard
  } = props;
  const cardProps = { openCard, columns, updateBoardContent, handleUpdate };
  return (
    <div id="list-board">
      <DragDropContext onDragEnd={res => listOnDragEnd(res, groupName)}>
        <Droppable droppableId={"column-droppable"} type="card">
          {(provided, snapshot) => (
            <div
              id="column-droppable"
              ref={provided.innerRef}
              className={snapshot.isDraggingOver ? "list-col-is-dragging" : ""}
              {...provided.droppableProps}
            >
              {cards.map((card, index) => (
                <Card key={card.id} card={card} index={index} {...cardProps} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

List.propTypes = {
  cards: PropTypes.array,
  columns: PropTypes.array,
  tags: PropTypes.array,
  updateBoardContent: PropTypes.func,
  handleUpdate: PropTypes.func,
  listOnDragEnd: PropTypes.func,
  groupName: PropTypes.string
};

export default List;
