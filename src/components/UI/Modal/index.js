import React from "react";
import TopDelete from "../Popup/TopDelete";
import ReactModal from "react-modal";
import "./index.scss";

ReactModal.setAppElement("#modal-root");

class Modal extends React.Component {
  render() {
    const {
      isOpen,
      onClose,
      modalClassName,
      overlayClassName,
      outerCnterClassName,
      outerCnterStyle = {},
      innerCnterClassName,
      innerCnterStyle = {}
    } = this.props;
    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
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
              <TopDelete onClick={onClose} />
              <div className="inner-content">{this.props.children}</div>
            </div>
          </div>
        </div>
      </ReactModal>
    );
  }
}

export default Modal;
