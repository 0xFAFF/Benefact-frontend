import React from "react";
import PropTypes from "prop-types";
import "./MatchWrapper.scss";

const MatchWrapper = props => {
  const { selectedMatch, onChangeFilterHandler } = props;
  const buttonConfigs = [
    {
      title: "All Filters",
      className: "button-all",
      id: "all"
    },
    {
      title: "Any Filter",
      className: "button-any",
      id: "any"
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
            onClick={e => onChangeFilterHandler(btn.id, "matchBy")}
          >
            {btn.title}
          </button>
        ))}
      </div>
    </div>
  );
};

MatchWrapper.propTypes = {
  selectedMatch: PropTypes.string,
  onChangeFilterHandler: PropTypes.func
};

export default MatchWrapper;
