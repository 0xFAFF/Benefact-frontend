import React from "react";
import PropTypes from "prop-types";
import Basic from "./Basic";
import "./index.scss";

class Filter extends React.Component {
  static propTypes = {
    setPopupStyle: PropTypes.func,
    columns: PropTypes.array,
    tags: PropTypes.array,
    filters: PropTypes.object,
    resetFilters: PropTypes.func,
    onChangeFilterHandler: PropTypes.func,
    selectFilters: PropTypes.func,
    createFilterGroup: PropTypes.func,
    updateFilterGroupIndex: PropTypes.func,
    onClose: PropTypes.func
  };

  onAcceptHandler = () => {
    this.props.selectFilters();
    this.props.onClose();
  };

  render() {
    return (
      <>
        <h1>Filter Cards</h1>
        <div id="filter-container">
          <Basic {...this.props} onAcceptHandler={this.onAcceptHandler} />
        </div>
      </>
    );
  }
}

export default Filter;
