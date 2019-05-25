import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

const ModalContainer = ({
  children,
  onClose,
  component: Component,
  componentHeader,
  modalStyle,
  ...compParams
}) => (
  <div id="modal-container">
    {componentHeader ? (
      <div className="modal-header flex center">
        <h2>{componentHeader}</h2>
      </div>
    ) : null}
    {Component ? (
      <div style={{ ...modalStyle }}>
        <Component onClose={onClose} {...compParams} />
      </div>
    ) : null}
  </div>
);

export default ModalContainer;

ModalContainer.propTypes = {
  params: PropTypes.object,
  onClose: PropTypes.func,
  component: PropTypes.func
};
