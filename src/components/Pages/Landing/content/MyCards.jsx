import React from "react";
import List from "components/Pages/Board/Views/List";

const MyCards = props => {
  const {
    page: {
      data: { cards }
    }
  } = props;
  console.log(cards);
  return (
    <div>
      {/* <List {...innerProps} {...listFunctions} cards={groupCards} groupName={groupName} />*/}
      <List cards={cards} />
    </div>
  );
};
export default MyCards;
