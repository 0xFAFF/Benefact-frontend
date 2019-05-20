import React from "react";
import List from "components/Pages/Board/Views/List";

const MyCards = props => {
  const {
    page: {
      data: { createdCards }
    }
  } = props;
  return <List cards={createdCards} openCard={() => {}} />;
};
export default MyCards;
