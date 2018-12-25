import React from "react";
import "./index.scss";

const View = props => {
  const {
    params: { view, handleBoardView }
  } = props;
  return (
    <div id="view-popup">
      <div className="title">Select a view</div>
      <div className="view-button-group">
        <button
          className={`button-kanban ${
            view === "kanban" ? "button-active" : ""
          }`}
          onClick={() => handleBoardView("kanban")}
        >
          Kanban
        </button>
        <button
          className={`button-list ${view === "list" ? "button-active" : ""}`}
          onClick={() => handleBoardView("list")}
        >
          List
        </button>
      </div>
    </div>
  );
};

export default View;
