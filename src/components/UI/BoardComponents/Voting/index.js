import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

const Voting = props => {
  const { upvotes = 0, downvotes = 0 } = props;
  return (
    <div id="vote-container">
      <div className="vote-thumbs-container">
        <div className="vote-thumb">
          <FontAwesomeIcon icon="thumbs-up" size="sm" color={"#edcd89"} />
        </div>
        <div className="vote-counter">{upvotes}</div>
      </div>
      <div className="vote-thumbs-container">
        <div className="vote-thumb">
          <FontAwesomeIcon icon="thumbs-down" size="sm" color={"#edcd89"} />
        </div>
        <div className="vote-counter">{downvotes}</div>
      </div>
    </div>
  );
};

export default Voting;
