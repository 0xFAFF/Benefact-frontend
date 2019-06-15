import React from "react";
import PropTypes from "prop-types";
import { Column } from "../../../UI/BoardComponents";
import { getCards } from "../../../../utils";
import "./Kanban.scss";
import { DragDropContext, Droppable } from "components/DND";

const Kanban = props => {
  const { columns, columnOrder, kanbanOnDragEnd, groupName, filterIndex, filtersActive } = props;
  return (
    <div id="kanban-board">
      <DragDropContext
        onDragEnd={res => kanbanOnDragEnd(res, groupName)}
        // onDragStart={this.onDragStart}
        // onDragUpdate={this.onDragUpdate}
      >
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {provided => (
            <div id="board-droppable" {...provided.droppableProps} ref={provided.innerRef}>
              <div className="views-group-name">
                <span
                  className="views-group-name-title"
                  style={!filtersActive ? { visibility: "hidden" } : null}
                >
                  Group {filterIndex + 1}
                </span>
              </div>
              {columnOrder.map((columnId, index) => {
                const column = columns.find(column => column.id === columnId);
                const colCards = getCards(props.cards, column.id);
                if(filtersActive && colCards.length === 0) return null;
                return <Column colCards={colCards} index={index} key={column.id} column={column} {...props} />;
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

Kanban.propTypes = {
  cards: PropTypes.array,
  columns: PropTypes.array,
  columnOrder: PropTypes.array,
  groupName: PropTypes.string,
  kanbanOnDragEnd: PropTypes.func,
  updateBoardContent: PropTypes.func,
  handleResetBoard: PropTypes.func,
  handleUpdate: PropTypes.func,
  filtersActive: PropTypes.bool
};

export default Kanban;
