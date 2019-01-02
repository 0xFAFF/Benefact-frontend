import React from "react";
import Kanban from "../Kanban";
import List from "../List";

class Base extends React.Component {
  render() {
    const {
      view,
      cards,
      columns,
      tags,
      columnOrder,
      kanbanFunctions,
      listFunctions
    } = this.props;

    const kanbanState = {
      cards,
      columns,
      tags,
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
  }
}

export default Base;
