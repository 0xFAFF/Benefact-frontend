import React from "react";
import PropTypes from "prop-types";
import Kanban from "./Kanban";
import List from "./List";
import "./index.scss";

const Views = props => {
  const {
    view,
    cards,
    columns,
    tags,
    columnOrder,
    kanbanFunctions,
    listFunctions,
    filtersActive
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
      {Object.entries(cards).map(([groupName, groupCards], index) => {
        return (
          <div id="views-base-container" key={index}>
            {view === "kanban" && (
              <Kanban
                {...kanbanState}
                {...kanbanFunctions}
                cards={groupCards}
                groupName={groupName}
                filterIndex={index}
                filtersActive={filtersActive}
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

Views.propTypes = {
  view: PropTypes.string,
  cards: PropTypes.object,
  columns: PropTypes.array,
  tags: PropTypes.array,
  columnOrder: PropTypes.array,
  kanbanFunctions: PropTypes.object,
  listFunctions: PropTypes.object
};

export default Views;