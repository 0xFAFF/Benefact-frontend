import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, MarkdownEditor } from "../../../UI";

class AddCard extends React.Component {
  render() {
    const {
      useModal = true,
      showModal,
      showDeleteModal = true,
      handleShowMessageClick,
      handleCloseModal,
      addNewCard,
      columns,
      cardMap,
      columnId,
      onAcceptHandler,
      onClose
    } = this.props;
    return (
      <React.Fragment>
        {useModal && (
          <div
            className="add-card"
            onClick={() => {
              handleShowMessageClick();
            }}
          >
            <FontAwesomeIcon icon="plus" size="sm" />
          </div>
        )}
        {useModal && showModal ? (
          <Modal isOpen={true} onClose={() => handleCloseModal()}>
            <MarkdownEditor
              content={{ id: cardMap.length + 1, columnId: columnId }}
              columns={columns}
              updateBoardContent={newContent => addNewCard(newContent)}
              showDeleteModal={showDeleteModal}
              onAcceptHandler={() => handleCloseModal()}
              onClose={() => handleCloseModal()}
            />
          </Modal>
        ) : !useModal ? (
          <MarkdownEditor
            content={{ id: cardMap.length + 1 }}
            columns={columns}
            updateBoardContent={newContent => addNewCard(newContent)}
            onAcceptHandler={onAcceptHandler}
            onClose={onClose}
            showDeleteModal={showDeleteModal}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default AddCard;
