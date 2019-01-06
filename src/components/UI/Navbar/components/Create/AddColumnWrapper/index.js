import React from "react";
import PropTypes from "prop-types";
import { AddColumn } from "../../../../AddComponents";
import "./index.scss";

const AddColumnWrapper = props => {
  const { addComponent, onClose } = props;
  return (
    <div id="add-column-outer">
      <AddColumn
        addComponent={addComponent}
        onAcceptHandler={() => onClose()}
      />
    </div>
  );
};

AddColumnWrapper.propTypes = {
  addComponent: PropTypes.func,
  onClose: PropTypes.func
};

export default AddColumnWrapper;
