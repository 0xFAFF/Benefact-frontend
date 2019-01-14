import React from "react";
import "./index.scss";

const ColumnWrapper = props => {
  const {
    columns = [],
    onSelectColumnIdHandler,
    selectedColumnId = ""
  } = props;
  return (
    <div id="column-wrapper-container">
      <div className="styled-select background-color semi-square">
        <select
          onChange={e => onSelectColumnIdHandler(e)}
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

export default ColumnWrapper;
