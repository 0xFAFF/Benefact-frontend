import React from "react";
import { AcceptCancelButtons } from "../../Popup";
import "./index.scss";

const Confirm = props => {
  const {
    onAcceptHandler,
    onCancelHandler,
    confirmMessage = "Are you sure?"
  } = props;
  return (
    <div id="confirm-container">
      <div className="child-component">{props.children}</div>
      <div className="confirmation">{confirmMessage}</div>
      <AcceptCancelButtons
        onAcceptHandler={onAcceptHandler}
        onCancelHandler={onCancelHandler}
        acceptTitle={"Yes"}
        cancelTitle={"No"}
      />
    </div>
  );
};

export default Confirm;
