import React from "react";
import AddCard from "./AddCard";
import { getCards } from "../../../utils";

const Header = props => {
  const { dragHandleProps, title, updateColumnContent, ...rest } = props;
  const { cardMap, columnId } = rest;
  const cardNumber = getCards(cardMap, columnId).length;
  return (
    <div className="column-header" {...dragHandleProps}>
      <span className="title">
        <input
          name="Title"
          type="text"
          defaultValue={title}
          onBlur={e =>
            updateColumnContent({
              id: columnId,
              title: e.target.value
            })
          }
        />
        ({cardNumber})
      </span>
      <AddCard {...rest} />
    </div>
  );
};

export default Header;
