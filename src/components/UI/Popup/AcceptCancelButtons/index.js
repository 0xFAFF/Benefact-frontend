import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

const AcceptCancelButtons = props => {
  const { onAcceptHandler, onCancelHandler, acceptTitle, cancelTitle } = props;
  return (
    <div id="accept-cancel-button-group">
      <button className="button-accept" onClick={onAcceptHandler}>
        {acceptTitle}
      </button>
      <button className="button-cancel" onClick={onCancelHandler}>
        {cancelTitle}
      </button>
    </div>
  );
};

AcceptCancelButtons.propTypes = {
  onAcceptHandler: PropTypes.func,
  onCancelHandler: PropTypes.func,
  acceptTitle: PropTypes.string,
  cancelTitle: PropTypes.string
};

export default AcceptCancelButtons;
