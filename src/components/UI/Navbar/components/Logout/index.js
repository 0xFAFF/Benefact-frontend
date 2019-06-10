import React from "react";
import PropTypes from "prop-types";
import "./index.scss";
import { Confirm } from "components/UI/Popup";

const Logout = props => {
  const { onClose, onLogoutHandler } = props;

  const onAcceptHandler = () => {
    onClose();
    onLogoutHandler();
  };

  return (
    <Confirm
      onAccept={onAcceptHandler}
      onCancel={onClose}
      confirmMessage="Are you sure you want to logout?"
    />
  );
};

Logout.propTypes = {
  onClose: PropTypes.func,
  onLogoutHandler: PropTypes.func
};

export default Logout;
