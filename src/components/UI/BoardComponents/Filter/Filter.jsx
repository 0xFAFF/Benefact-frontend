import React from "react";
import PropTypes from "prop-types";
import Basic from "./Basic";
import { PageProp } from "components/Pages/PageContext";
import "./Filter.scss";

const DefaultGroup = () => {
  return {
    filterBy: {
      tags: [],
      columns: [],
      title: ""
    }
  };
};

const Default = () => {
  return {
    filters: {
      currGroupIndex: 0,
      groups: [DefaultGroup()]
    }
  };
};

class Filter extends React.Component {
  static propTypes = {
    onClose: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      filters: props.page.filters || Default().filters
    };
  }

  createFilterGroup = () => {
    let filters = { ...this.state.filters };
    filters.groups.push(DefaultGroup());
    this.setState({ filters });
  };

  updateFilterGroupIndex = index => {
    let filters = { ...this.state.filters };
    filters.currGroupIndex = index;
    this.setState({ filters });
  };

  updateArray(item, array) {
    const foundIndex = array.findIndex(testItem => testItem.id === item.id);
    if (foundIndex > -1) {
      array.splice(foundIndex, 1);
    } else {
      array.push(item);
    }
    return array;
  }
  onChangeFilterHandler = (item, key, groupIndex = 0) => {
    let filters = { ...this.state.filters };
    let filterBy = filters.groups[groupIndex].filterBy;
    if (key === "tags") this.updateArray(item, filterBy.tags);
    else if (key === "columns") this.updateArray(item, filterBy.columns);
    else if (key === "title") filterBy.title = item;
    this.setState({ filters: filters });
  };

  onAcceptHandler = () => {
    this.props.page.updatePage({ filters: this.state.filters }, this.props.page.refreshData);
    this.props.onClose();
  };

  resetFilters = () => {
    this.setState({ ...Default() });
  };

  render() {
    const {
      page: {
        data: { columns, tags }
      },
      ...rest
    } = this.props;
    const filters = this.state.filters;
    const basicProps = {
      onChangeFilterHandler: this.onChangeFilterHandler,
      updateFilterGroupIndex: this.updateFilterGroupIndex,
      createFilterGroup: this.createFilterGroup,
      columns,
      tags,
      filters
    };
    return (
      <div id="filter-container" className="section">
        <Basic
          {...rest}
          {...basicProps}
          onAcceptHandler={this.onAcceptHandler}
          resetFilters={this.resetFilters}
        />
      </div>
    );
  }
}

export default PageProp(Filter);
export { Default, DefaultGroup };
