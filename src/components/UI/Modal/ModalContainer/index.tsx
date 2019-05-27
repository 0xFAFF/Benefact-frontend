import React from "react";
import "./index.scss";

const ModalContainer = ({
  children,
  onClose,
  component: Component,
  componentHeader,
  modalStyle,
  ...compParams
}: {
  children?: React.ElementType;
  onClose?: void;
  component?: React.ElementType;
  componentHeader?: string;
  modalStyle?: any;
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
