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
      addComponent,
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
              updateBoardContent={newContent =>
                addComponent("cards", {
                  title: newContent.title || "",
                  description: newContent.description || "",
                  tagIds: newContent.tagIds || [],
                  columnId: newContent.columnId || null
                })
              }
              showDeleteModal={showDeleteModal}
              onAcceptHandler={() => handleCloseModal()}
              onClose={() => handleCloseModal()}
            />
          </Modal>
        ) : !useModal ? (
          <MarkdownEditor
            content={{ id: cardMap.length + 1 }}
            columns={columns}
            updateBoardContent={newContent =>
              addComponent("cards", {
                title: newContent.title || "",
                description: newContent.description || "",
                tagIds: newContent.tagIds || [],
                columnId: newContent.columnId || null
              })
            }
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
