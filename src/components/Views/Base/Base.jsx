import React from "react";
import PropTypes from "prop-types";
import Kanban from "../Kanban";
import List from "../List";
import { Header } from "../../UI/BoardComponents";

const Base = props => {
  const {
    view,
    cards,
    columns,
    tags,
    columnOrder,
    kanbanFunctions,
    listFunctions,
    filtersActive,
    resetFilters
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
      <Header filtersActive={filtersActive} resetFilters={resetFilters} />
      {view === "kanban" && <Kanban {...kanbanState} {...kanbanFunctions} />}
      {view === "list" && <List {...listState} {...listFunctions} />}
    </div>
  );
};

Base.propTypes = {
  view: PropTypes.string,
  cards: PropTypes.object,
  columns: PropTypes.array,
  tags: PropTypes.array,
  columnOrder: PropTypes.array,
  kanbanFunctions: PropTypes.object,
  listFunctions: PropTypes.object,
  filtersActive: PropTypes.bool,
  resetFilters: PropTypes.func
};

export default Base;
