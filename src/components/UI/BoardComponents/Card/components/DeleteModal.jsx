import React from "react";
import PropTypes from "prop-types";
import "./DeleteModal.scss";
import { Modal } from "components/UI";
import { Confirm } from "components/UI/Popup";

const DeleteModal = props => {
  const { isOpen, handleCloseModal, handleUpdate, cardId, onDelete } = props;

  const onAcceptHandler = () => {
    if (cardId) {
      onDelete && onDelete();
      handleUpdate("cards", "ARCHIVE", { cardId }).then(() => {
        handleCloseModal();
      });
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
        title="Archive Card"
      >
        <Confirm
          onAcceptHandler={onAcceptHandler}
          onCancelHandler={handleCloseModal}
          confirmMessage={"Are you sure you want to archive this card?"}
        />
      </Modal>
    </div>
  );
};

DeleteModal.propTypes = {
  isOpen: PropTypes.bool,
  handleCloseModal: PropTypes.func,
  handleUpdate: PropTypes.func,
  cardId: PropTypes.number
};

export default DeleteModal;
