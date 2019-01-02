import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, MarkdownEditor } from "../..";

class AddCard extends React.Component {
  render() {
    const {
      useModal = true,
      showModal,
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
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default AddCard;
