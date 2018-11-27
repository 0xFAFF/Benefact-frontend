import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, MarkdownEditor } from "../../UI";

class AddCard extends React.Component {
  state = { showModal: false };
  handleShowMessageClick = () => this.setState({ showModal: true });
  handleCloseModal = () => this.setState({ showModal: false });

  // updateNewCardContent = () => {
  //   this.props.updateCardContent();
  //   this.props.addNewCard(this.props.columnID);
  // };

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
              content={{ ID: Object.keys(this.props.cardMap).length + 1 }}
              updateContent={newContent =>
                this.props.addNewCard(newContent, this.props.columnID)
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
