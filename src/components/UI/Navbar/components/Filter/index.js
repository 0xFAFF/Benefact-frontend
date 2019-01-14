import React from "react";
import PropTypes from "prop-types";
import TagWrapper from "./TagWrapper";
import ColumnWrapper from "./ColumnWrapper";
import MatchWrapper from "./MatchWrapper";
import SelectedFilters from "./SelectedFilters";
import { AcceptCancelButtons } from "../../../Popup";
import "./index.scss";

class Filter extends React.Component {
  state = {
    filters: {
      tags: [],
      columnId: "",
      match: "any"
    }
  };

  componentDidMount() {
    this.props.setPopupStyle({ width: "400px" });
  }
  componentWillUnmount() {
    this.props.setPopupStyle({ width: "300px" });
  }

  resetFilters = () => {
    this.setState({
      filters: {
        tags: [],
        columnId: "",
        match: "any"
      }
    });
  };

  // selectFilters = () => {
  //   let tagsQueryParam = this.state.tags.length > 0 ? this.state.tags

  //   const queryParams = {
  //     Groups: {
  //       GroupName: [
  //         {
  //           tags: this.state.tags
  //         }
  //       ]
  //     }
  //   };
  //   this.props.handleFilters(queryParams);
  // };

  onMatchHandler = match => {
    this.setState({
      filters: {
        ...this.state.filters,
        match
      }
    });
  };

  onSelectedColumnIdHandler = e => {
    this.setState({
      filters: {
        ...this.state.filters,
        columnId: e.target.value === "" ? null : parseInt(e.target.value)
      }
    });
  };

  onSelectTagHandler = selectedTag => {
    let selectedTags = [...this.state.filters.tags];
    const selectedTagIndex = selectedTags.findIndex(
      tag => tag.id === selectedTag.id
    );
    if (selectedTagIndex > -1) {
      selectedTags.splice(selectedTagIndex, 1);
    } else {
      selectedTags.push(selectedTag);
    }
    this.setState({
      filters: {
        ...this.state.filters,
        tags: selectedTags
      }
    });
  };

  render() {
    const { tags, columns } = this.props;
    return (
      <div id="filter-container">
        <div className="title">Filter Cards</div>
        <div className="filter-filters-inputs">
          <label>Tags</label>
          <TagWrapper
            tags={tags}
            onSelectTagHandler={this.onSelectTagHandler}
            selectedTags={this.state.filters.tags}
          />
          <label>Column</label>
          <ColumnWrapper
            columns={columns}
            onSelectedColumnIdHandler={this.onSelectedColumnIdHandler}
            selectedColumnId={this.state.filters.columnId}
          />
          <label>Match By</label>
          <MatchWrapper
            selectedMatch={this.state.filters.match}
            onMatchHandler={this.onMatchHandler}
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
            onAcceptHandler={this.selectFilters}
            onCancelHandler={this.resetFilters}
            acceptTitle={"Select"}
            cancelTitle={"Reset"}
          />
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  setPopupStyle: PropTypes.func,
  addComponent: PropTypes.func,
  columns: PropTypes.array,
  cards: PropTypes.array,
  onClose: PropTypes.func
};

export default Filter;
