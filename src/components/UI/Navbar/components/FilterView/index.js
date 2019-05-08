import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

const FilterView = ({ resetFilters }) => {
  const onClick = e => {
    e.stopPropagation();
    resetFilters();
  };
  return (
    <div id="filter-view">
      <span className="message">Active</span>
      <span className="reset-filters">
        <FontAwesomeIcon icon="times" size="lg" onClick={onClick} />
      </span>
    </div>
  );
};

FilterView.propTypes = {
  resetFilters: PropTypes.func
};

export default FilterView;
