import React from "react";
import PropTypes from "prop-types";
import "./ColumnWrapper.scss";

const ColumnWrapper = props => {
  const { columns = [], onChangeFilterHandler, selectedColumnId = "" } = props;
  return (
    <div id="column-wrapper-container">
      <div className="styled-select background-color semi-square">
        <select
          onChange={e => onChangeFilterHandler(e, "columnId")}
          value={selectedColumnId === null ? "" : selectedColumnId}
        >
          <option value={""}>No Column (default)</option>
          {columns.map(option => {
            return (
              <option key={option.id} value={option.id}>
                {option.title}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

ColumnWrapper.propTypes = {
  columns: PropTypes.array,
  onChangeFilterHandler: PropTypes.func,
  selectedColumnId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default ColumnWrapper;
