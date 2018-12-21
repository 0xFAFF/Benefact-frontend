import React from "react";
import Kanban from "../Kanban";
import List from "../List";
import "./Base.scss";

class Base extends React.Component {
  render() {
    const {
      view,
      cards,
      columns,
      tags,
      columnOrder,
      kanbanFunctions,
      listFunctions,
      handleBoardView
    } = this.props;

    const kanbanState = {
      cards,
      columns,
      tags,
      columnOrder
    };
    const listState = {
      cards,
      tags
    };

    return (
      <div id="views-base">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "10px"
          }}
        >
          <div className="base-button-group">
            <button
              className={`button-kanban ${
                view === "kanban" ? "button-active" : ""
              }`}
              onClick={() => handleBoardView("kanban")}
            >
              Kanban
            </button>
            <button
              className={`button-list ${
                view === "list" ? "button-active" : ""
              }`}
              onClick={() => handleBoardView("list")}
            >
              List
            </button>
          </div>
        </div>
        {view === "kanban" && <Kanban {...kanbanState} {...kanbanFunctions} />}
        {view === "list" && <List {...listState} {...listFunctions} />}
      </div>
    );
  }
}

export default Base;
