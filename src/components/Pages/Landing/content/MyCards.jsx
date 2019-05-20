import React from "react";
import List from "components/Pages/Board/Views/List";

class MyCards extends React.Component {
  render = () => {
    const {
      page: {
        history,
        data: { createdCards, boardLookup }
      }
    } = this.props;
    return (
      <List
        cards={createdCards}
        openCard={card =>
          history.push(`/board/${boardLookup[card.boardId].urlName}/card/${card.id}`)
        }
      />
    );
  };
}
export default MyCards;
