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
    counterWidth = "50px"
  } = props;

  const totalVotes = votes.reduce((arr, curr) => {
    const { count = 0 } = curr;
    return arr + count;
  }, 0);
  return (
    <AuthConsumer>
      {token => (
        <div id="vote-container" className="flex-row">
          <div
            className={`flex-row vote-thumbs-container ${
              totalVotes ? "has-votes" : ""
            }`}
          >
            <div
              onClick={e => {
                e.stopPropagation();
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
              <div className="vote-tracker" style={{ width: counterWidth }}>
                {totalVotes}
              </div>
            )}
            {/* {defaultDisplay && (
          <div className="vote-double-counter flex-row">
            <div className="thumb-container"> totalVotes}</div>
          </div>
        )} */}
          </div>
        </div>
      )}
    </AuthConsumer>
  );
};

export default Voting;
