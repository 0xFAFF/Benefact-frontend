import React from "react";
import List from "components/Pages/Board/Views/List";
import { Segment } from "../PageComponents";

class UserCards extends React.Component {
  render = () => {
    const {
      cards = [],
      page: { history, data: { boardLookup } = {} }
    } = this.props;
    if (cards.length === 0)
      return (
        <Segment border center padding30 margin>
          There are currently no available cards for display.
        </Segment>
      );
    return (
      <List
        cards={cards}
        openCard={card =>
          history.push(`/board/${boardLookup[card.boardId].urlName}/list/card/${card.id}`)
        }
      />
    );
  };
}
export default UserCards;
