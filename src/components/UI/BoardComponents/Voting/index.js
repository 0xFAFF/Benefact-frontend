import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthConsumer } from "../../../Auth/AuthContext";
import { parseToken } from "../../../../utils";
import "./index.scss";

const Voting = props => {
  const {
    votes = [],
    size = "sm",
    defaultDisplay = false,
    // counterWidth = "50px",
    onUpdateVote
  } = props;
  const totalVotes = votes.reduce((arr, curr) => {
    const { count = 0 } = curr;
    return arr + count;
  }, 0);
  return (
    <AuthConsumer>
      {token => {
        const { id } = parseToken(token);
        const currUserVotes = votes.reduce((arr, curr) => {
          const { count = 0, userId } = curr;
          if (userId === id) return arr + count;
          return arr;
        }, 0);
        return (
          <div id="vote-container" className="flex-row">
            <div
              className={`flex-row vote-thumbs-container ${
                totalVotes ? "has-votes" : ""
              }`}
            >
              <div
                onClick={e => {
                  e.stopPropagation();
                  onUpdateVote("add");
                }}
                className={`vote-counter  ${
                  totalVotes || defaultDisplay ? "has-votes" : ""
                }`}
              >
                <FontAwesomeIcon
                  icon="arrow-circle-up"
                  size={size}
                  color={"#13b405"}
                />
              </div>
              {(totalVotes !== 0 || defaultDisplay) && (
                <div
                  onClick={e => {
                    e.stopPropagation();
                    onUpdateVote("subtract");
                  }}
                  className={`vote-counter  ${
                    totalVotes || defaultDisplay ? "has-votes" : ""
                  }`}
                >
                  <FontAwesomeIcon
                    icon="arrow-circle-down"
                    size={size}
                    color={"#fd0a0a"}
                  />
                </div>
              )}
              {(defaultDisplay || (totalVotes !== 0 && !defaultDisplay)) && (
                <div className="vote-tracker">
                  <span>{totalVotes}</span>
                  {currUserVotes !== 0 && (
                    <span style={{ paddingLeft: "3px" }}>
                      ({currUserVotes})
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      }}
    </AuthConsumer>
  );
};

export default Voting;
