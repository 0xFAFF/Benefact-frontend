import React from "react";
import Kanban from "./Kanban";
import List from "./List";
import "./index.scss";

// interface Props {
//   view?: string;
//   cards: object;
//   columns?: Array<any>;
//   tags?: Array<any>;
//   columnOrder?: any;
//   kanbanFunctions?: object;
//   listFunctions?: object;
//   filtersActive?: any;
//   openCard?: boolean;
// }

const Views = (props) => {
  const {
    view,
    cards,
    columns,
    tags,
    columnOrder,
    kanbanFunctions,
    listFunctions,
    filtersActive,
    openCard
  } = props;

  const innerProps = {
    columns,
    columnOrder,
    tags,
    openCard
  };

  if (Object.keys(cards).length === 0) return null;

  return Object.entries(cards).map(([groupName, groupCards], index) => {
    return (
      <div id="views-base-container" className="flex grow" key={index}>
        {view === "kanban" && (
          <Kanban
            {...innerProps}
            {...kanbanFunctions}
            cards={groupCards}
            groupName={groupName}
            filterIndex={index}
            filtersActive={filtersActive}
          />
        )}
        {view === "list" && (
          <List {...innerProps} {...listFunctions} cards={groupCards} groupName={groupName} />
        )}
      </div>
    );
  });
};

export default Views;
