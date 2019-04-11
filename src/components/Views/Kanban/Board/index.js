import React from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Column } from "../../../UI/BoardComponents";
import { getCards } from "../../../../utils";
import "./index.scss";

class InnerList extends React.PureComponent {
  static propTypes = {
    cards: PropTypes.array,
    column: PropTypes.object,
    columns: PropTypes.array,
    columnOrder: PropTypes.array,
    kanbanOnDragEnd: PropTypes.func,
    updateBoardContent: PropTypes.func,
    addComponent: PropTypes.func,
    deleteComponent: PropTypes.func,
    handleResetBoard: PropTypes.func,
    handleUpdate: PropTypes.func
  };
  render() {
    const {
      column: { id },
      cards
    } = this.props;
    const colCards = getCards(cards, id);
    return <Column {...this.props} colCards={colCards} />;
  }
}

const Board = props => {
  const {
    columns,
    columnOrder,
    kanbanOnDragEnd,
    groupName,
    filterIndex,
    filtersActive
  } = props;
  return (
    <div id="kanban-board">
      <DragDropContext
        onDragEnd={res => kanbanOnDragEnd(res, groupName)}
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
                return (
                  <InnerList
                    index={index}
                    key={column.id}
                    column={column}
                    {...props}
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
};

Board.propTypes = {
  cards: PropTypes.array,
  columns: PropTypes.array,
  columnOrder: PropTypes.array,
  groupName: PropTypes.string,
  kanbanOnDragEnd: PropTypes.func,
  updateBoardContent: PropTypes.func,
  addComponent: PropTypes.func,
  deleteComponent: PropTypes.func,
  handleResetBoard: PropTypes.func,
  handleUpdate: PropTypes.func,
  filtersActive: PropTypes.bool
};

export default Board;
