import React from "react";
import { Link } from "react-router-dom";
import { formatTime } from "utils";
import { Segment } from "../PageComponents";

const typeMap = {
  comment: {
    0: "Commented on a card",
    1: "Edited a comment",
    2: "Removed a comment"
  },
  card: {
    0: "Created a card",
    1: "Updated a card",
    2: "Archived a card"
  }
};

class UserActivity extends React.Component {
  render = () => {
    const {
      page: { data: { activity = [], boardLookup } = {} }
    } = this.props;
    if (activity.length === 0)
      return (
        <Segment border center padding margin>
          There are currently no recent activities available.
        </Segment>
      );
    return activity.map(({ commentId, type, time, cardId, boardId }, i) => {
      let entity = "card";
      if (commentId) entity = "comment";
      return (
        <Segment border padding margin key={i}>
          {`${typeMap[entity][type]} at ${formatTime(time)}`}
          <Link to={`/board/${boardLookup[boardId].urlName}/card/${cardId}`}>View card</Link>
        </Segment>
      );
    });
  };
}
export default UserActivity;
