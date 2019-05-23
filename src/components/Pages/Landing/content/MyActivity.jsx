import React from "react";
import { formatTime } from "utils";

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

class MyActivity extends React.Component {
  render = () => {
    const {
      page: {
        data: { activity, boardLookup }
      }
    } = this.props;
    return activity.map((a, i) => {
      let entity = "card";
      if (a.commentId) entity = "comment";
      return (
        <div key={i}>
          {`${typeMap[entity][a.type]} at ${formatTime(a.time)}`}
          <a href={`/board/${boardLookup[a.boardId].urlName}/card/${a.cardId}`}>View card</a>
        </div>
      );
    });
  };
}
export default MyActivity;
