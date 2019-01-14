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
  state = {
    filters: {
      tags: [],
      columnId: "",
      title: "",
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
        title: "",
        match: "any"
      }
    });
  };

  selectFilters = () => {
    // let tagsQueryParam = this.state.tags.length > 0 ? this.state.tags
    // const queryParams = {
    //   Groups: {
    //     GroupName: [
    //       {
    //         tags: this.state.tags
    //       }
    //     ]
    //   }
    // };
    // this.props.handleFilters(queryParams);
  };

  onMatchHandler = match => {
    this.setState({
      filters: {
        ...this.state.filters,
        match
      }
    });
  };

  onSelectTitleHandler = e => {
    this.setState({
      filters: {
        ...this.state.filters,
        title: e.target.valie
      }
    });
  };

  onSelectColumnIdHandler = e => {
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
            onSelectColumnIdHandler={this.onSelectColumnIdHandler}
            selectedColumnId={this.state.filters.columnId}
          />
          <label>Title</label>
          <TitleWrapper
            selectedTitle={this.state.filters.title}
            onSelectTitleHandler={this.onSelectTitleHandler}
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
  columns: PropTypes.array
};

export default Filter;
