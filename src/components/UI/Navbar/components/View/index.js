import React from "react";
import PropTypes from "prop-types";
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
        {buttonConfigs.map(({title, className, view: btnView}) => (
          <button
            key={title}
            className={`${className} ${
              view === btnView ? "button-active" : ""
            }`}
            onClick={() => {
              handleBoardView(btnView);
              onClose();
            }}
          >
            {title}
          </button>
        ))}
      </div>
    </div>
  );
};

View.propTypes = {
  view: PropTypes.string,
  handleBoardView: PropTypes.func,
  onClose: PropTypes.func
};

export default View;
