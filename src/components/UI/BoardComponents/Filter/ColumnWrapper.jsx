import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ColumnWrapper = props => {
  const { columns = [], onChangeFilterHandler, selectedColumns = [] } = props;
  return (
    <div id="column-wrapper-container">
      <ul className="selection-ul">
        {columns.map((column, index) => (
          <li key={index}>
            <div
              className="option-container"
              onClick={() => onChangeFilterHandler(column, "columns")}
            >
              <div className="option-label">
                {column.title}
              </div>
              {selectedColumns.find(selectedCol => selectedCol.id === column.id) && (
                <FontAwesomeIcon icon="check" size="sm" />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

ColumnWrapper.propTypes = {
  columns: PropTypes.array,
  onChangeFilterHandler: PropTypes.func,
  selectedColumn: PropTypes.array
};

export default ColumnWrapper;
