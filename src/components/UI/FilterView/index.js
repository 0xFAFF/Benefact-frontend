import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

const FilterView = props => {
  const { active = false, resetFilters } = props;
  return (
    <div id="filter-view" style={!active ? { visibility: "hidden" } : null}>
      <FontAwesomeIcon icon="filter" size="lg" />
      <span className="message">Card Filters Active</span>
      <span className="reset-filters">
        <FontAwesomeIcon icon="times" size="lg" onClick={resetFilters} />
      </span>
    </div>
  );
};

FilterView.propTypes = {
  active: PropTypes.bool,
  resetFilters: PropTypes.func
};

export default FilterView;
