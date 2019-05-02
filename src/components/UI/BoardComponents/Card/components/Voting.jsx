import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parseToken } from "utils";
import { Tooltip } from "components/UI";
import { PageConsumer } from "components/Pages/PageContext";
import "./Voting.scss";

const Voting = props => {
  const { votes = [], size = "lg", defaultDisplay = false, onUpdateVote } = props;
  const totalVotes = votes.reduce((arr, curr) => {
    const { count = 0 } = curr;
    return arr + count;
  }, 0);
  return (
    <PageConsumer>
      {page => {
        const { id } = parseToken(page.token);
        const canVote = page.hasPrivilege("vote");
        const currUserVotes = votes.reduce((arr, curr) => {
          const { count = 0, userId } = curr;
          if (userId === id) return arr + count;
          return arr;
        }, 0);
        return (
          <div id="vote-container" className="row">
            <Tooltip id="voting" />
            <div className={`row vote-thumbs-container ${totalVotes ? "has-votes" : ""}`}>
              {canVote && (<div
                onClick={e => {
                  e.stopPropagation();
                  onUpdateVote("add");
                }}
                className={`vote-counter  ${totalVotes || defaultDisplay ? "has-votes" : ""}`}
              >
                <FontAwesomeIcon
                  data-tip="Upvote this card"
                  data-for="voting"
                  icon="arrow-circle-up"
                  size={size}
                />
              </div>)}
              {(canVote && (totalVotes !== 0 || defaultDisplay)) && (
                <div
                  onClick={e => {
                    e.stopPropagation();
                    onUpdateVote("subtract");
                  }}
                  className={`vote-counter  ${totalVotes || defaultDisplay ? "has-votes" : ""}`}
                >
                  <FontAwesomeIcon
                    data-tip="Downvote this card"
                    data-for="voting"
                    icon="arrow-circle-down"
                    size={size}
                  />
                </div>
              )}
              {(defaultDisplay || (totalVotes !== 0 && !defaultDisplay)) && (
                <div
                  className="vote-tracker"
                  data-tip={`This card has ${totalVotes} total vote${
                    totalVotes === 1 ? "" : "s"
                  } : You've contributed ${currUserVotes} vote${totalVotes === 1 ? "" : "s"}`}
                  data-for="voting"
                >
                  <span>{`+${totalVotes}${currUserVotes !== 0 ? `(${currUserVotes})` : ''}`}</span>
                </div>
              )}
            </div>
          </div>
        );
      }}
    </PageConsumer>
  );
};

export default Voting;
