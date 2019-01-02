import React from "react";
import { AddColumn } from "../../../../AddComponents";
import "./index.scss";

const AddColumnWrapper = props => {
  return (
    <div id="add-column-outer">
      <AddColumn {...props} onAcceptHandler={() => props.onClose()} />
    </div>
  );
};
export default AddColumnWrapper;
