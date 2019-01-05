import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "../../../UI";
import TagPopup from "./TagPopup";
import "./index.scss";

class AddTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: "select",
      currSelectedTag: null,
      showModal: false
    };
  }

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
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
            cardTags={this.props.cardTags}
            onChangeHandler={this.props.onChangeHandler}
            addNewTag={this.props.addNewTag}
            option={this.state.option}
            currSelectedTag={this.state.currSelectedTag}
            updateBoardContent={this.props.updateBoardContent}
            handleOptionSelect={this.handleOptionSelect}
            onClose={this.handleCloseModal}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default AddTag;
