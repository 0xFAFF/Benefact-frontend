import React from "react";
import PropTypes from "prop-types";
import Kanban from "../Kanban";
import List from "../List";
import { Header } from "../../UI/BoardComponents";
import "./Base.scss";

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
      {Object.entries(cards).map(([groupName, groupCards], index) => {
        return (
          <div key={index}>
            {filtersActive && (
              <div className="views-group-name">
                <span className="views-group-name-title">
                  Group {index + 1}
                </span>
              </div>
            )}
            {view === "kanban" && (
              <Kanban
                {...kanbanState}
                {...kanbanFunctions}
                cards={groupCards}
                groupName={groupName}
              />
            )}
            {view === "list" && (
              <List
                {...listState}
                {...listFunctions}
                cards={groupCards}
                groupName={groupName}
              />
            )}
          </div>
        );
      })}
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
