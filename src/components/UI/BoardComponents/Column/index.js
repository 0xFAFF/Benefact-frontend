import React from "react";
import PropTypes from "prop-types";
import { Card } from "../../BoardComponents";
import Header from "./Header";
import "./index.scss";
import { Draggable, Droppable } from "components/DND";
import { PageProp } from "components/Pages/PageContext";
import { cls } from "utils";

class Column extends React.Component {
  static propTypes = {
    column: PropTypes.object,
    columns: PropTypes.array,
    cards: PropTypes.array,
    colCards: PropTypes.array,
    index: PropTypes.number,
    updateBoardContent: PropTypes.func,
    handleResetBoard: PropTypes.func,
    handleUpdate: PropTypes.func
  };

  render() {
    const {
      column,
      columns,
      colCards,
      index,
      updateBoardContent,
      handleResetBoard,
      handleUpdate,
      openCard,
      page
    } = this.props;
    const cardProps = {
      columns,
      openCard,
      handleUpdate,
      handleResetBoard,
      updateBoardContent,
      colCards
    };
    const { hasPrivilege } = page;

    const dragDisabled = !hasPrivilege("admin");
    return (
      <Draggable type="column" id={column.id} index={index} isDragDisabled={dragDisabled}>
        {(provided, snapshot) => (
          <div
            id="column-draggable"
            className={
              (snapshot.isDragging ? "col-is-dragging" : "") + (dragDisabled ? "" : " draggable")
            }
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div className="column-container flex col">
              <Header
                dragHandleProps={provided.dragHandleProps}
                column={column}
                handleUpdate={handleUpdate}
                updateBoardContent={updateBoardContent}
                cardCount={colCards.length}
                columns={columns}
                page={page}
              />
              <Droppable id={`col-${column.id}`} type={page.shiftHeld ? "none" : "card"}>
                {(provided, snapshot) => (
                  <div
                    className={cls(
                      "column-droppable",
                      colCards.length && "column-empty",
                      snapshot.draggingOver && "dragging-over"
                    )}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {colCards.map((card, index) => (
                      <Card key={card.id} card={card} index={index} {...cardProps} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

export default PageProp(Column);
