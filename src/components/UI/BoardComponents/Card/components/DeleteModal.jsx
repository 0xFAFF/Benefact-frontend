import React from "react";
import PropTypes from "prop-types";
import "./DeleteModal.scss";
import { Modal } from "components/UI";
import { Confirm } from "components/UI/Popup";

const DeleteModal = props => {
  const { isOpen, handleCloseModal, deleteComponent, cardId } = props;

  const onAcceptHandler = () => {
    if (cardId) {
      deleteComponent("cards", { id: cardId })
      .then(() => handleCloseModal());
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
          confirmMessage={"Delete this card?"}
        />
      </Modal>
    </div>
  );
};

DeleteModal.propTypes = {
  isOpen: PropTypes.bool,
  handleCloseModal: PropTypes.func,
  deleteComponent: PropTypes.func,
  cardId: PropTypes.number
};

export default DeleteModal;
