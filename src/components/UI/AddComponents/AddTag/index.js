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
    return (
      <React.Fragment>
        <div
          id="add-tag"
          onClick={e => {
            this.setState({ showModal: true });
          }}
        >
          <FontAwesomeIcon icon="plus" size="sm" />
        </div>
        <Modal
          isOpen={this.state.showModal}
          onClose={this.handleCloseModal}
          modalClassName="add-tag-modal-Modal"
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
      </React.Fragment>
    );
  }
}

export default AddTag;
