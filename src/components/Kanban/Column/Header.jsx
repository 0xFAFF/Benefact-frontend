import React from "react";
import AddCard from "./AddCard";
import { getCards } from "../../../utils";

const Header = props => {
  const { dragHandleProps, title, ...rest } = props;
  const { cardMap, columnId } = rest;
  const cardNumber = getCards(cardMap, columnId).length;
  return (
    <div className="column-header" {...dragHandleProps}>
      <span className="title">
        {title} ({cardNumber})
      </span>
      <AddCard {...rest} />
    </div>
  );
};

export default Header;
