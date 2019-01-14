import React from "react";
import "./index.scss";

const MatchWrapper = props => {
  const { selectedMatch, onMatchHandler } = props;
  const buttonConfigs = [
    {
      title: "Any Filter",
      className: "button-any",
      id: "any"
    },
    {
      title: "All Filters",
      className: "button-all",
      id: "all"
    }
  ];
  return (
    <div className="matches">
      <div className="matches-button-group">
        {buttonConfigs.map(btn => (
          <button
            key={btn.id}
            className={`${btn.className} ${
              selectedMatch === btn.id ? "button-active" : ""
            }`}
            onClick={e => onMatchHandler(btn.id)}
          >
            {btn.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MatchWrapper;
