import React from "react";
import { AddCard } from "../../../UI/AddComponents";
import { getCards } from "../../../../utils";
import { TextAreaInput } from "../../../UI";

const Header = props => {
  const { dragHandleProps, title, updateColumnContent, ...rest } = props;
  const { cardMap, columnId } = rest;
  const cardNumber = getCards(cardMap, columnId).length;
  return (
    <div className="column-header" {...dragHandleProps}>
      <span className="title">
        <div className="card-number">({cardNumber})</div>
        <TextAreaInput
          name="Title"
          defaultValue={title}
          onBlur={e =>
            updateColumnContent({
              id: columnId,
              title: e.target.value
            })
          }
        />
      </span>
      <AddCard {...rest} />
    </div>
  );
};

export default Header;
