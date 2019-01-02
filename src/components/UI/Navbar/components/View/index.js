import React from "react";
import "./index.scss";

const View = props => {
  const { view, handleBoardView, onClose } = props;
  const buttonConfigs = [
    {
      title: "Kanban",
      className: "button-kanban",
      view: "kanban"
    },
    {
      title: "List",
      className: "button-list",
      view: "list"
    }
  ];

  return (
    <div id="view-popup">
      <div className="title">Select View</div>
      <div className="view-button-group">
        {buttonConfigs.map(btn => (
          <button
            key={btn.title}
            className={`${btn.className} ${
              view === btn.view ? "button-active" : ""
            }`}
            onClick={() => {
              handleBoardView(btn.view);
              onClose();
            }}
          >
            {btn.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default View;
