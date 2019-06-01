import React from "react";
import PropTypes from "prop-types";
import { AcceptCancelButtons } from "components/UI/PageComponents";
import "./index.scss";

const Confirm = props => {
  const { onAcceptHandler, onCancelHandler, confirmMessage = "Are you sure?", children } = props;
  return (
    <>
      <div id="confirm-container" class="section">
        <div className="child-component">{children}</div>
        <div className="confirmation">{confirmMessage}</div>
      </div>
      <AcceptCancelButtons
        onAcceptHandler={onAcceptHandler}
        onCancelHandler={onCancelHandler}
        acceptTitle={"Yes"}
        cancelTitle={"No"}
      />
    </>
  );
};

Confirm.propTypes = {
  onAcceptHandler: PropTypes.func,
  onCancelHandler: PropTypes.func,
  confirmMessage: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default Confirm;
