import React from "react";
import "./index.scss";

const AcceptCancelButtons = props => {
  return (
    <div id="accept-cancel-button-group">
      <button className="button-accept" onClick={props.onAcceptHandler}>
        {props.acceptTitle}
      </button>
      <button className="button-cancel" onClick={props.onCancelHandler}>
        {props.cancelTitle}
      </button>
    </div>
  );
};

export default AcceptCancelButtons;
