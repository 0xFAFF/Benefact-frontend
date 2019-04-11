import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

const FilterView = props => {
  const { resetFilters } = props;
  return (
    <div id="filter-view">
      <span className="message">Filter Active</span>
      <span className="reset-filters">
        <FontAwesomeIcon icon="times" size="lg" onClick={resetFilters} />
      </span>
    </div>
  );
};

FilterView.propTypes = {
  resetFilters: PropTypes.func
};

export default FilterView;
