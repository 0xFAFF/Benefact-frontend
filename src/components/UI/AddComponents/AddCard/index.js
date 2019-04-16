import React from "react";
import PropTypes from "prop-types";
import CardEditor from "components/UI/BoardComponents/Card/CardEditor";

const AddCard = props => {
  const {
    addComponent,
    columns,
    onAcceptHandler,
    onClose,
    disableComponents
  } = props;
  return (
    <CardEditor
      content={{}}
      columns={columns}
      updateBoardContent={({ title, description, tagIds, columnId }) =>
        addComponent("cards", {
          title: title || "",
          description: description || "",
          tagIds: tagIds || [],
          columnId: columnId,
        })
      }
      showDeleteModal={false}
      onAcceptHandler={onAcceptHandler}
      onClose={onClose}
      disableComponents={disableComponents}
    />
  );
};

AddCard.propTypes = {
  useModal: PropTypes.bool,
  showModal: PropTypes.bool,
  handleOpenModal: PropTypes.func,
  handleCloseModal: PropTypes.func,
  addComponent: PropTypes.func,
  columns: PropTypes.array,
  cards: PropTypes.array,
  columnId: PropTypes.number,
  onAcceptHandler: PropTypes.func,
  onClose: PropTypes.func,
  disableComponents: PropTypes.bool
};

export default AddCard;
