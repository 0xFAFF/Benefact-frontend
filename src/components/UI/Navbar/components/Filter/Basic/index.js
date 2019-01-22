import React from "react";
import PropTypes from "prop-types";
import TagWrapper from "../TagWrapper";
import ColumnWrapper from "../ColumnWrapper";
import TitleWrapper from "../TitleWrapper";
import MatchWrapper from "../MatchWrapper";
import { AcceptCancelButtons } from "../../../../Popup";

const Basic = props => {
  const {
    tags,
    columns,
    filters,
    resetFilters,
    onChangeFilterHandler,
    onAcceptHandler
  } = props;
  const { filterBy, matchBy } = filters;

  return (
    <React.Fragment>
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
      <div>
        <AcceptCancelButtons
          onAcceptHandler={onAcceptHandler}
          onCancelHandler={resetFilters}
          acceptTitle={"Select"}
          cancelTitle={"Reset"}
        />
      </div>
    </React.Fragment>
  );
};

Basic.propTypes = {
  columns: PropTypes.array,
  tags: PropTypes.array,
  filters: PropTypes.shape({
    filterBy: PropTypes.object,
    matchBy: PropTypes.string
  }),
  resetFilters: PropTypes.func,
  onAcceptHandler: PropTypes.func,
  onChangeFilterHandler: PropTypes.func
};

export default Basic;
