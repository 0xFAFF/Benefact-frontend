import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, MarkdownEditor } from "../../UI";

class AddCard extends React.Component {
  state = { showModal: false };
  handleShowMessageClick = () => this.setState({ showModal: true });
  handleCloseModal = () => this.setState({ showModal: false });

  render() {
    return (
      <div>
        <div
          className="add-card"
          onClick={() => {
            this.handleShowMessageClick();
          }}
        >
          <FontAwesomeIcon icon="plus" size="sm" />
          <span>Add another card</span>
        </div>
        {this.state.showModal ? (
          <Modal onClose={this.handleCloseModal}>
            <MarkdownEditor
              content={{ id: this.props.cardMap.length + 1 }}
              updateContent={newContent =>
                this.props.addNewCard(newContent, this.props.columnId)
              }
              onClose={this.handleCloseModal}
            />
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default AddCard;
