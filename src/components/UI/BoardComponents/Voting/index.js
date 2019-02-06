import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

const Voting = props => {
  const { upvotes = 0 } = props;
  return (
    <div id="vote-container">
      <div className={`vote-thumbs-container ${upvotes ? "has-votes" : ""}`}>
        <div
          onClick={e => {
            e.stopPropagation();
          }}
          className={`vote-thumb  ${upvotes ? "has-votes" : ""}`}
        >
          <FontAwesomeIcon icon="thumbs-up" size="sm" color={"#edcd89"} />
        </div>
        {upvotes !== 0 && <div className="vote-counter">{upvotes}</div>}
      </div>
    </div>
  );
};

export default Voting;
