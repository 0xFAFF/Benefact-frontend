import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, MarkdownEditor } from "../../../UI";

const AddCard = props => {
  const {
    useModal = true,
    showModal,
    showDeleteModal = true,
    handleOpenModal,
    handleCloseModal,
    addComponent,
    columns,
    cards,
    columnId,
    onAcceptHandler,
    onClose
  } = props;
  return (
    <React.Fragment>
      {useModal && (
        <div
          className="add-card"
          onClick={() => {
            handleOpenModal();
          }}
        >
          <FontAwesomeIcon icon="plus" size="sm" />
        </div>
      )}
      {useModal ? (
        <Modal isOpen={showModal} onClose={() => handleCloseModal()}>
          <MarkdownEditor
            content={{ id: cards.length + 1, columnId: columnId }}
            columns={columns}
            updateBoardContent={({ title, description, tagIds, columnId }) =>
              addComponent("cards", {
                title: title || "",
                description: description || "",
                tagIds: tagIds || [],
                columnId: columnId
              })
            }
            showDeleteModal={showDeleteModal}
            onAcceptHandler={() => handleCloseModal()}
            onClose={() => handleCloseModal()}
          />
        </Modal>
      ) : (
        <MarkdownEditor
          content={{}}
          columns={columns}
          updateBoardContent={({ title, description, tagIds, columnId }) =>
            addComponent("cards", {
              title: title || "",
              description: description || "",
              tagIds: tagIds || [],
              columnId: columnId
            })
          }
          onAcceptHandler={onAcceptHandler}
          onClose={onClose}
          showDeleteModal={showDeleteModal}
        />
      )}
    </React.Fragment>
  );
};

AddCard.propTypes = {
  useModal: PropTypes.bool,
  showModal: PropTypes.bool,
  showDeleteModal: PropTypes.bool,
  handleOpenModal: PropTypes.func,
  handleCloseModal: PropTypes.func,
  addComponent: PropTypes.func,
  columns: PropTypes.array,
  cards: PropTypes.object,
  columnId: PropTypes.number,
  onAcceptHandler: PropTypes.func,
  onClose: PropTypes.func
};

export default AddCard;
