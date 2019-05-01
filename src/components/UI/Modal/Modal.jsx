import React from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import { isEmpty } from "lodash";
import "./index.scss";

ReactModal.setAppElement("#root");

const Modal = props => {
  function getParent() {
    return document.querySelector("#root");
  }

  const {
    isOpen,
    onClose,
    modalClassName,
    modalStyle = {},
    overlayClassName,
    outerCnterClassName,
    outerCnterStyle = {},
    innerCnterClassName,
    innerCnterStyle = {},
    children
  } = props;
  return (
    <ReactModal
      parentSelector={getParent}
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      shouldFocusAfterRender={false}
      defaultStyles={{}}
      className={`${
        modalClassName && isEmpty(modalStyle)
          ? modalClassName
          : isEmpty(modalStyle) && !modalClassName
          ? "Modal"
          : ""
      }`}
      // className={`${modalClassName ? modalClassName : "Modal"}`}
      overlayClassName={`${
        overlayClassName && isEmpty(modalStyle)
          ? overlayClassName
          : isEmpty(modalStyle) && !overlayClassName
          ? "Overlay"
          : ""
      }`}
      // overlayClassName={`${overlayClassName ? overlayClassName : "Overlay"}`}
      style={modalStyle}
    >
      <div
        style={outerCnterStyle}
        className={`${
          outerCnterClassName ? outerCnterClassName : "outer-container"
        }`}
      >
        <div
          style={innerCnterStyle}
          className={`${
            innerCnterClassName ? innerCnterClassName : "inner-container"
          }`}
        >
          <div id="modal-container">
            <div className="inner-content">{children}</div>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  modalClassName: PropTypes.string,
  overlayClassName: PropTypes.string,
  outerCnterClassName: PropTypes.string,
  outerCnterStyle: PropTypes.object,
  innerCnterClassName: PropTypes.string,
  innerCnterStyle: PropTypes.object,
  children: PropTypes.object
};

export default Modal;
