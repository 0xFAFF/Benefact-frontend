import React from "react";
import PropTypes from "prop-types";
import CardEditor from "components/UI/BoardComponents/Card/CardEditor";

const AddCard = props => {
  const { addComponent, ...rest } = props;
  return (
    <CardEditor
      disableComponents
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
  );
};

AddCard.propTypes = {
  handleOpenModal: PropTypes.func,
  handleCloseModal: PropTypes.func,
  addComponent: PropTypes.func,
  columns: PropTypes.array,
  columnId: PropTypes.number,
  onAcceptHandler: PropTypes.func,
  onClose: PropTypes.func,
  disableComponents: PropTypes.bool
};

export default AddCard;
