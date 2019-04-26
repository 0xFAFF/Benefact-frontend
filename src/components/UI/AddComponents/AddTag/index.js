import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "../../../UI";
import TagPopup from "./TagPopup";
import "./index.scss";

class AddTag extends React.Component {
  static propTypes = {
    cardTags: PropTypes.array,
    onChangeHandler: PropTypes.func,
    addComponent: PropTypes.func,
    updateBoardContent: PropTypes.func
  };

  state = {
    showModal: false
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      cardTags,
      onChangeHandler,
      addComponent,
      updateBoardContent
    } = this.props;
    const modalContainer = document.getElementById("editor-mode");
    const left = modalContainer
      ? modalContainer.getBoundingClientRect().right
      : null;
    return (
      <>
        <div
          id="add-tag"
          onClick={e => {
            this.setState({ showModal: true });
          }}
        >
          <FontAwesomeIcon icon="plus-circle" size="lg" />
        </div>
        <Modal
          isOpen={this.state.showModal}
          onClose={this.handleCloseModal}
          modalStyle={{
            overlay: {
              position: "fixed",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              backgroundColor: "rgba(0, 0, 0, 0.3)"
            },
            content: {
              position: "absolute",
              top: "25%",
              left: `${left + 30}px`,
              backgroundColor: "rgba(0, 0, 0, 0.3)"
            }
          }}
          innerCnterClassName="add-tag-modal-inner-container"
          outerCnterClassName="add-tag-modal-outer-container"
        >
          <TagPopup
            cardTags={cardTags}
            onChangeHandler={onChangeHandler}
            addComponent={addComponent}
            option={this.state.option}
            currSelectedTag={this.state.currSelectedTag}
            updateBoardContent={updateBoardContent}
            handleOptionSelect={this.handleOptionSelect}
            onClose={this.handleCloseModal}
          />
        </Modal>
      </>
    );
  }
}

export default AddTag;
