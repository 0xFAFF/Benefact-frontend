import React from "react";
import PropTypes from "prop-types";
import Kanban from "../Kanban";
import List from "../List";

const Base = props => {
  const {
    view,
    cards,
    columns,
    tags,
    columnOrder,
    kanbanFunctions,
    listFunctions
  } = props;

  const kanbanState = {
    cards,
    columns,
    columnOrder
  };
  const listState = {
    cards,
    columns,
    tags
  };

  return (
    <div id="views-base">
      {view === "kanban" && <Kanban {...kanbanState} {...kanbanFunctions} />}
      {view === "list" && <List {...listState} {...listFunctions} />}
    </div>
  );
};

Base.propTypes = {
  view: PropTypes.string,
  cards: PropTypes.array,
  columns: PropTypes.array,
  tags: PropTypes.array,
  columnOrder: PropTypes.array,
  kanbanFunctions: PropTypes.object,
  listFunctions: PropTypes.object
};

export default Base;
