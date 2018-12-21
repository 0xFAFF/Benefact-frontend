import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, MarkdownEditor } from "..";

class AddCard extends React.Component {
  render() {
    return (
      <div>
        <div
          className="add-card"
          onClick={() => {
            this.props.handleShowMessageClick();
          }}
        >
          <FontAwesomeIcon icon="plus" size="sm" />
        </div>
        {this.props.showModal ? (
          <Modal onClose={() => this.props.handleCloseModal()}>
            <MarkdownEditor
              content={{ id: this.props.cardMap.length + 1 }}
              updateBoardContent={newContent =>
                this.props.addNewCard(newContent, this.props.columnId)
              }
              onClose={() => this.props.handleCloseModal()}
            />
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default AddCard;
