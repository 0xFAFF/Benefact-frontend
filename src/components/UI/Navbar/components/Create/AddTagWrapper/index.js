import React from "react";
import { CreateTag } from "../../../../AddComponents/AddTag/components";

const AddTagWrapper = props => {
  return (
    <CreateTag
      onAcceptHandler={() => props.onClose()}
      addComponent={props.addComponent}
      onClose={props.onClose}
    />
  );
};

export default AddTagWrapper;
