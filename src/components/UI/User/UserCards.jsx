import React from "react";
import List from "components/Pages/Board/Views/List";
import { Segment } from "../PageComponents";

class UserCards extends React.Component {
  render = () => {
    const {
      page: { history, data: { createdCards = [], boardLookup } = {} }
    } = this.props;
    if (createdCards.length === 0)
      return (
        <Segment border center padding margin>
          There are currently no available cards for display.
        </Segment>
      );
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
export default UserCards;
