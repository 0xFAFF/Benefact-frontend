import React from "react";
import PropTypes from "prop-types";
import { FilterView } from "../../../UI";
import "./index.scss";

const Header = props => {
  const { filtersActive, resetFilters } = props;
  return (
    <div id="board-header">
      <FilterView active={filtersActive} resetFilters={resetFilters} />
    </div>
  );
};

Header.propTypes = {
  filtersActive: PropTypes.bool,
  resetFilters: PropTypes.func
};

export default Header;
