import React from "react";
import PropTypes from "prop-types";
import Board from "./Board";

const Kanban = props => <Board {...props} />;

Kanban.propTypes = {
  cards: PropTypes.array,
  columns: PropTypes.array,
  columnOrder: PropTypes.array,
  kanbanOnDragEnd: PropTypes.func,
  updateBoardContent: PropTypes.func,
  addComponent: PropTypes.func,
  deleteComponent: PropTypes.func,
  groupName: PropTypes.string,
  handleResetBoard: PropTypes.func
};

export default Kanban;
export { default as Board } from "./Board";
