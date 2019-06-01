import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "components/UI";
import TagPopup from "./TagPopup";
import "./index.scss";

class AddTag extends React.Component {
  static propTypes = {
    cardTags: PropTypes.array,
    onChangeHandler: PropTypes.func,
    handleUpdate: PropTypes.func,
    updateBoardContent: PropTypes.func
  };

  state = {
    showModal: false
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { cardTags, onChangeHandler, handleUpdate, updateBoardContent } = this.props;
    return (
      <>
        <div
          id="add-tag"
          onClick={e => {
            this.setState({ showModal: true });
          }}
          data-tip="Add tag to card"
          data-for="card-editor"
        >
          <FontAwesomeIcon icon="plus-circle" size="lg" />
        </div>
        <Modal
          title="Select Tags"
          modalClassName="sm"
          isOpen={this.state.showModal}
          onClose={this.handleCloseModal}
        >
          <TagPopup
            cardTags={cardTags}
            onChangeHandler={onChangeHandler}
            handleUpdate={handleUpdate}
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
