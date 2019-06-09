import React from "react";
import ReactModal from "react-modal";
import "./index.scss";

ReactModal.setAppElement("#root");

const Modal: React.SFC<{
  isOpen?: boolean;
  onClose: () => void;
  modalClassName?: string;
  shouldCloseOnOverlayClick?: boolean;
  title?: string;
}> = props => {
  const {
    isOpen,
    onClose,
    modalClassName,
    shouldCloseOnOverlayClick = true,
    title,
    children
  } = props;
  return (
    <ReactModal
      isOpen={Boolean(isOpen)}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      shouldCloseOnEsc={true}
      shouldFocusAfterRender={false}
      className={`Modal ${modalClassName || ""}`}
      overlayClassName="Overlay"
    >
      <div className="inner-content">
        {title && (
          <div className="modal-header flex center">
            <h2>{title}</h2>
          </div>
        )}
        <div className="section-container col">{children}</div>
      </div>
    </ReactModal>
  );
};

export default Modal;
