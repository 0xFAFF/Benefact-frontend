import React from "react";
import PropTypes from "prop-types";
import Basic from "./Basic";
import "./Filter.scss";
import { PageProp } from "components/Pages/PageContext";

class Filter extends React.Component {
  state = {
    filters: {}
  };

  static propTypes = {
    resetFilters: PropTypes.func,
    onClose: PropTypes.func
  };

  createFilterGroup = () => {
    let filters = { ...this.props.page.filters };
    filters.groups.push({
      filterBy: {
        tags: [],
        columnId: "",
        title: ""
      },
      matchBy: "all"
    });
    this.props.page.updatePage({ filters });
  };

  updateFilterGroupIndex = index => {
    let filters = { ...this.props.page.filters };
    filters.currGroupIndex = index;
    this.props.page.updatePage({ filters });
  };

  onChangeFilterHandler = (e, key, groupIndex = 0) => {
    let filters = { ...this.props.page.filters };
    if (key === "matchBy") {
      filters.groups[groupIndex].matchBy = e;
    } else if (key === "tags") {
      let selectedTags = [...filters.groups[groupIndex].filterBy.tags];
      const selectedTagIndex = selectedTags.findIndex(tag => tag.id === e.id);
      if (selectedTagIndex > -1) {
        selectedTags.splice(selectedTagIndex, 1);
      } else {
        selectedTags.push(e);
      }
      filters.groups[groupIndex].filterBy.tags = selectedTags;
    } else if (key === "columnId") {
      e.persist();
      filters.groups[groupIndex].filterBy.columnId =
        e.target.value === "" ? null : parseInt(e.target.value);
    } else if (key === "title") {
      e.persist();
      let newData = { ...this.props.page.data };
      newData.filters.groups[groupIndex] = {
        ...newData.filters.groups[groupIndex],
        filterBy: {
          ...newData.filters.groups[groupIndex].filterBy,
          title: e.target.value
        }
      };
    }
    this.props.page.updatePage({ filters: filters });
  };

  onAcceptHandler = () => {
    let filters = { ...this.props.page.filters };
    filters.active = true;
    this.props.page.updatePage({ filters }, this.props.page.refreshData);
    this.props.onClose();
  };

  render() {
    const {
      page: {
        data: { columns, tags },
        filters
      },
      ...rest
    } = this.props;
    const basicProps = {
      onChangeFilterHandler: this.onChangeFilterHandler,
      updateFilterGroupIndex: this.updateFilterGroupIndex,
      createFilterGroup: this.createFilterGroup,
      columns,
      tags,
      filters
    };
    return (
      <>
        <h1>Filter Cards</h1>
        <div id="filter-container">
          <Basic {...rest} {...basicProps} onAcceptHandler={this.onAcceptHandler} />
        </div>
      </>
    );
  }
}

export default PageProp(Filter);
