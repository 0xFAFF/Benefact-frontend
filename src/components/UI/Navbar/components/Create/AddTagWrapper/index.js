import React from "react";
import { CreateTag } from "../../../../AddComponents/AddTag/components";

const AddTagWrapper = props => {
  return (
    <CreateTag
      onAcceptHandler={() => props.onClose()}
      addNewTag={props.addNewTag}
      onClose={props.onClose}
    />
  );
};

export default AddTagWrapper;
