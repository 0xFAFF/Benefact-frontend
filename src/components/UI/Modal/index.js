import React from "react";
import TopDelete from "../Popup/TopDelete";
import ReactModal from "react-modal";
import "./index.scss";

ReactModal.setAppElement("#modal-root");
class Modal extends React.Component {
  render() {
    return (
      <ReactModal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onClose}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="outer-container">
          <div className="inner-container">
            <div id="modal-container">
              <TopDelete onClick={this.props.onClose} />
              <div className="inner-content">{this.props.children}</div>
            </div>
          </div>
        </div>
      </ReactModal>
    );
  }
}

export default Modal;
