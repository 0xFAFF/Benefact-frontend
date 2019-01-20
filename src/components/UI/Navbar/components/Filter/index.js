import React from "react";
import PropTypes from "prop-types";
import TagWrapper from "./TagWrapper";
import ColumnWrapper from "./ColumnWrapper";
import TitleWrapper from "./TitleWrapper";
import MatchWrapper from "./MatchWrapper";
import SelectedFilters from "./SelectedFilters";
import { AcceptCancelButtons } from "../../../Popup";
import "./index.scss";

class Filter extends React.Component {
  static propTypes = {
    setPopupStyle: PropTypes.func,
    columns: PropTypes.array,
    tags: PropTypes.array,
    filters: PropTypes.bject,
    resetFilters: PropTypes.func,
    onChangeFilterHandler: PropTypes.func,
    selectFilters: PropTypes.func
  };

  componentDidMount() {
    this.props.setPopupStyle({ width: "400px" });
  }
  componentWillUnmount() {
    this.props.setPopupStyle({ width: "300px" });
  }

  render() {
    const {
      tags,
      columns,
      filters,
      resetFilters,
      onChangeFilterHandler,
      selectFilters
    } = this.props;
    const { filterBy, matchBy } = filters;

    return (
      <div id="filter-container">
        <div className="title">Filter Cards</div>
        <div className="filter-filters-inputs">
          <label>Tags</label>
          <TagWrapper
            tags={tags}
            onChangeFilterHandler={onChangeFilterHandler}
            selectedTags={filterBy.tags}
          />
          <label>Column</label>
          <ColumnWrapper
            columns={columns}
            onChangeFilterHandler={onChangeFilterHandler}
            selectedColumnId={filterBy.columnId}
          />
          <label>Title</label>
          <TitleWrapper
            selectedTitle={filterBy.title}
            onChangeFilterHandler={onChangeFilterHandler}
          />
          <label>Match By</label>
          <MatchWrapper
            selectedMatch={matchBy}
            onChangeFilterHandler={onChangeFilterHandler}
          />
        </div>
        {/* <div className="filter-selected-filters">
          <label>Selected Filters</label>
          <SelectedFilters
            tags={this.state.filters.tags}
            columnId={this.state.filters.columnId}
          />
        </div> */}
        <div>
          <AcceptCancelButtons
            onAcceptHandler={selectFilters}
            onCancelHandler={resetFilters}
            acceptTitle={"Select"}
            cancelTitle={"Reset"}
          />
        </div>
      </div>
    );
  }
}

export default Filter;
