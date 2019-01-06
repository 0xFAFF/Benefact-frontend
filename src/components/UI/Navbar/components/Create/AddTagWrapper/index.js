import React from "react";
import PropTypes from "prop-types";
import { CreateTag } from "../../../../AddComponents/AddTag/components";

const AddTagWrapper = props => {
  const { onClose, addComponent } = props;
  return (
    <CreateTag
      onAcceptHandler={() => onClose()}
      addComponent={addComponent}
      onClose={onClose}
    />
  );
};

AddTagWrapper.propTypes = {
  onClose: PropTypes.func,
  addComponent: PropTypes.func
};

export default AddTagWrapper;
