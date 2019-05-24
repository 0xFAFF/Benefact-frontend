import React from "react";
import PropTypes from "prop-types";
import { AcceptCancelButtons } from "components/UI/PageComponents";
import "./index.scss";

const Logout = props => {
  const { onClose, onLogoutHandler } = props;

  const onAcceptHandler = () => {
    onClose();
    onLogoutHandler();
  };

  return (
    <AcceptCancelButtons
      onAcceptHandler={onAcceptHandler}
      onCancelHandler={onClose}
      acceptTitle={"Yes"}
      cancelTitle={"No"}
    />
  );
};

Logout.propTypes = {
  onClose: PropTypes.func,
  onLogoutHandler: PropTypes.func
};

export default Logout;
