import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, TextAreaInput } from "components/UI";
import { getCards } from "utils";
import CardEditor from "components/UI/BoardComponents/Card/CardEditor";

const Header = props => {
  const { dragHandleProps, title, updateBoardContent, ...rest } = props;
  const { cards, columnId, handleOpenModal, handleCloseModal, showModal, addComponent } = rest;
  const cardNumber = getCards(cards, columnId).length;
  return (
    <div className="column-header" {...dragHandleProps}>
      <span className="title">
        <div className="card-number">({cardNumber})</div>
        <TextAreaInput
          name="Title"
          defaultValue={title}
          onBlur={e =>
            updateBoardContent(
              {
                id: columnId,
                title: e.target.value
              },
              "columns"
            )
          }
        />
      </span>
      <div
        className="add-card"
        onClick={() => {
          handleOpenModal();
        }}
      >
        <FontAwesomeIcon icon="plus-circle" size="lg" />
      </div>
      <Modal isOpen={showModal} onClose={() => handleCloseModal()}>
        <CardEditor
          disableComponents
          onAcceptHandler={() => handleCloseModal()}
          onClose={() => handleCloseModal()}
          updateBoardContent={({ title, description, tagIds, columnId }) =>
            addComponent("cards", {
              title: title || "",
              description: description || "",
              tagIds: tagIds || [],
              columnId: columnId
            })
          }
          {...rest}
        />
      </Modal>
    </div>
  );
};

Header.propTypes = {
  dragHandleProps: PropTypes.object,
  title: PropTypes.string,
  updateBoardContent: PropTypes.func
};

export default Header;
