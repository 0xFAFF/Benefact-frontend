import React from "react";
import PropTypes from "prop-types";
import { AcceptCancelButtons } from "components/UI/PageComponents";
import "./index.scss";

const Confirm = props => {
  const { onAccept, onCancel, confirmMessage = "Are you sure?", children } = props;
  return (
    <>
      <div className="section xlg">{confirmMessage}</div>
      {children}
      <AcceptCancelButtons
        onAcceptHandler={onAccept}
        onCancelHandler={onCancel}
        acceptTitle={"Yes"}
        cancelTitle={"No"}
      />
    </>
  );
};

Confirm.propTypes = {
  onAccept: PropTypes.func,
  onCancel: PropTypes.func,
  confirmMessage: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default Confirm;
