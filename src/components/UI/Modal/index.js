import React from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import TopDelete from "../Popup/TopDelete";
import "./index.scss";

ReactModal.setAppElement("#modal-root");

const Modal = props => {
  const {
    isOpen,
    onClose,
    modalClassName,
    overlayClassName,
    outerCnterClassName,
    outerCnterStyle = {},
    innerCnterClassName,
    innerCnterStyle = {},
    children
  } = props;
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      shouldFocusAfterRender={false}
      className={`${modalClassName ? modalClassName : "Modal"}`}
      overlayClassName={`${overlayClassName ? overlayClassName : "Overlay"}`}
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
