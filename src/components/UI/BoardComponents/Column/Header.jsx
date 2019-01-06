import React from "react";
import PropTypes from "prop-types";
import { AddCard } from "../../../UI/AddComponents";
import { getCards } from "../../../../utils";
import { TextAreaInput } from "../../../UI";

const Header = props => {
  const { dragHandleProps, title, updateBoardContent, ...rest } = props;
  const { cards, columnId } = rest;
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
      <AddCard {...rest} />
    </div>
  );
};

Header.propTypes = {
  dragHandleProps: PropTypes.object,
  title: PropTypes.string,
  updateBoardContent: PropTypes.func
};

export default Header;
