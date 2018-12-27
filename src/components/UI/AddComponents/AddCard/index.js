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
      addNewCard
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
          <Modal onClose={() => handleCloseModal()}>
            <MarkdownEditor
              content={{ id: this.props.cardMap.length + 1 }}
              updateBoardContent={newContent => {
                console.log(this.props.columnId);
                addNewCard(newContent, this.props.columnId);
              }}
              onAcceptHandler={() => handleCloseModal()}
              onClose={() => handleCloseModal()}
            />
          </Modal>
        ) : !useModal ? (
          <MarkdownEditor
            content={{ id: this.props.cardMap.length + 1 }}
            updateBoardContent={newContent =>
              addNewCard(newContent, this.props.columnId)
            }
            onAcceptHandler={this.props.onAcceptHandler}
            onClose={this.props.onClose}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default AddCard;
