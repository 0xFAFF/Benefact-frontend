import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

const AcceptCancelButtons = props => {
  const {
    onAcceptHandler,
    onCancelHandler,
    acceptTitle,
    cancelTitle,
    buttonClass = "grow"
  } = props;
  return (
    <div id="accept-cancel-button-group">
      {acceptTitle && (
        <button className={`button-accept ${buttonClass}`} onClick={onAcceptHandler}>
          {acceptTitle}
        </button>
      )}
      {cancelTitle && (
        <button className={`button-cancel ${buttonClass}`} onClick={onCancelHandler}>
          {cancelTitle}
        </button>
      )}
    </div>
  );
};

AcceptCancelButtons.propTypes = {
  onAcceptHandler: PropTypes.func,
  onCancelHandler: PropTypes.func,
  showAccept: PropTypes.bool,
  acceptTitle: PropTypes.string,
  cancelTitle: PropTypes.string,
  buttonClass: PropTypes.string
};

export default AcceptCancelButtons;
