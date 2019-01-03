import React from "react";
import { Modal } from "../../../UI";
import { Confirm } from "../../Popup";
import "./index.scss";

const DeleteModal = props => {
  const { isOpen, handleCloseModal, deleteComponent, cardId } = props;

  const onAcceptHandler = () => {
    if (cardId) {
      deleteComponent("cards", { id: cardId });
      handleCloseModal();
    }
  };

  return (
    <div id="delete-modal">
      <Modal
        onClose={handleCloseModal}
        isOpen={isOpen}
        modalClassName="delete-modal-Modal"
        innerCnterClassName="delete-modal-inner-container"
        outerCnterClassName="delete-modal-outer-container"
      >
        <Confirm
          onAcceptHandler={onAcceptHandler}
          onCancelHandler={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default DeleteModal;
