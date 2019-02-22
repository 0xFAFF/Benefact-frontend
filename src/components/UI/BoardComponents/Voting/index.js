import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

const Voting = props => {
  const {
    upvotes = 0,
    size = "sm",
    defaultDisplay = false,
    counterWidth = "50px"
  } = props;

  return (
    <div id="vote-container" className="flex-row">
      <div
        className={`flex-row vote-thumbs-container ${
          upvotes ? "has-votes" : ""
        }`}
      >
        <div
          onClick={e => {
            e.stopPropagation();
          }}
          className={`vote-counter  ${
            upvotes || defaultDisplay ? "has-votes" : ""
          }`}
        >
          <FontAwesomeIcon
            icon="arrow-circle-up"
            size={size}
            color={"#13b405"}
          />
        </div>
        {(upvotes !== 0 || defaultDisplay) && (
          <div
            onClick={e => {
              e.stopPropagation();
            }}
            className={`vote-counter  ${
              upvotes || defaultDisplay ? "has-votes" : ""
            }`}
          >
            <FontAwesomeIcon
              icon="arrow-circle-down"
              size={size}
              color={"#fd0a0a"}
            />
          </div>
        )}
        {(defaultDisplay || (upvotes !== 0 && !defaultDisplay)) && (
          <div className="vote-tracker" style={{ width: counterWidth }}>
            {upvotes}
          </div>
        )}
        {/* {defaultDisplay && (
          <div className="vote-double-counter flex-row">
            <div className="thumb-container">{upvotes}</div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Voting;
