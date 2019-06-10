import React from "react";
import { Link } from "react-router-dom";
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

class UserActivity extends React.Component {
  render = () => {
    const {
      page: { data: { activity = [], boardLookup } = {} }
    } = this.props;
    if (activity.length === 0)
      return (
        <div className="center">
          <div className="section fit-content xlg center">
            There are currently no recent activities available.
          </div>
        </div>
      );
    return (
      <div className="section-container col">
        {activity.map(({ commentId, type, time, cardId, boardId }, i) => {
          let entity = "card";
          if (commentId) entity = "comment";
          return (
            <div key={i} className="section lg">
              {`${typeMap[entity][type]} at ${formatTime(time)}`}
              <Link to={`/board/${boardLookup[boardId].urlName}/kanban/card/${cardId}`}>
                View card
              </Link>
            </div>
          );
        })}
      </div>
    );
  };
}
export default UserActivity;
