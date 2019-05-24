import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TagWrapper from "./TagWrapper";
import ColumnWrapper from "./ColumnWrapper";
import TitleWrapper from "./TitleWrapper";
import { AcceptCancelButtons } from "components/UI/PageComponents";
import "./Basic.scss";

class Basic extends React.Component {
  render() {
    const {
      tags,
      columns,
      filters,
      resetFilters,
      onChangeFilterHandler,
      onAcceptHandler,
      createFilterGroup,
      updateFilterGroupIndex
    } = this.props;
    const { groups, currGroupIndex } = filters;
    const { filterBy } = [...groups][currGroupIndex];

    const onChangeFilterHandlerWrapper = (e, key) => {
      onChangeFilterHandler(e, key, currGroupIndex);
    };
    return (
      <div id="filters-basic">
        <div className="filters-group-buttons">
          {groups.map((group, index) => {
            return (
              <div
                key={index}
                className={`filters-group-button ${
                  currGroupIndex === index ? "filters-group-button-active" : null
                }`}
                onClick={() => updateFilterGroupIndex(index)}
              >
                <div>Group {index + 1}</div>
              </div>
            );
          })}
          <div
            className="filters-group-button filters-group-button-add"
            onClick={createFilterGroup}
          >
            <FontAwesomeIcon icon="plus-circle" size="lg" />
          </div>
        </div>
        <div className="filter-filters-inputs">
          <label>Title</label>
          <TitleWrapper
            selectedTitle={filterBy.title}
            onChangeFilterHandler={onChangeFilterHandlerWrapper}
          />
          <label>Tags</label>
          <TagWrapper
            tags={tags}
            onChangeFilterHandler={onChangeFilterHandlerWrapper}
            selectedTags={filterBy.tags}
          />
          <label>Column</label>
          <ColumnWrapper
            columns={columns}
            onChangeFilterHandler={onChangeFilterHandlerWrapper}
            selectedColumns={filterBy.columns}
          />
        </div>
        <AcceptCancelButtons
          onAcceptHandler={onAcceptHandler}
          onCancelHandler={resetFilters}
          acceptTitle={"Select"}
          cancelTitle={"Reset"}
        />
      </div>
    );
  }
}

Basic.propTypes = {
  columns: PropTypes.array,
  tags: PropTypes.array,
  filters: PropTypes.shape({
    groups: PropTypes.arrayOf(
      PropTypes.shape({
        filterBy: PropTypes.object,
        matchBy: PropTypes.string
      })
    )
  }),
  resetFilters: PropTypes.func,
  onAcceptHandler: PropTypes.func,
  createFilterGroup: PropTypes.func,
  onChangeFilterHandler: PropTypes.func
};

export default Basic;
