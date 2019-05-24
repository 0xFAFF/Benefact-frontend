import React from "react";
import PropTypes from "prop-types";
import CardEditor from "components/UI/BoardComponents/Card/CardEditor";

const AddCard = props => {
  const { handleUpdate, ...rest } = props;
  return (
    <CardEditor
      {...rest}
      disableComponents
      updateBoardContent={({ title, description, tagIds, columnId }) =>
        handleUpdate("cards", "ADD", {
          title: title || "",
          description: description || "",
          tagIds: tagIds || [],
          columnId: columnId
        })
      }
    />
  );
};

AddCard.propTypes = {
  handleOpenModal: PropTypes.func,
  handleCloseModal: PropTypes.func,
  handleUpdate: PropTypes.func,
  columns: PropTypes.array,
  columnId: PropTypes.number,
  onAcceptHandler: PropTypes.func,
  onClose: PropTypes.func,
  disableComponents: PropTypes.bool
};

export default AddCard;
