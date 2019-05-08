import React from "react";
import PropTypes from "prop-types";
import { PacmanLoader } from "components/UI/Loader";
import "./Boards.scss";

const Boards = ({
  page: {
    isLoading,
    data: { roles = [] }
  },
  history
}) => {
  const goToBoard = boardUrlName => {
    history.push(`/board/${boardUrlName}`);
  };

  return (
    <div id="boards-content">
      {isLoading ? (
        <PacmanLoader />
      ) : (
        <>
        <button>Create Board</button>
        {roles.map(({ board: { id, title, urlName }, userId, privilege }) => {
          return (
              <div
              key={id}
                className="board flex"
                data-tip={`Go to board: ${title}`}
                data-for="board"
              >
                <div className="board-icon">Board Icon</div>
                <div className="board-info grow">
                  <div className="board-title">Board: {title}</div>
                  <div className="board-user-role">Role: {privilege}</div>
                  <div className="board-link" onClick={() => goToBoard(urlName)}>View Board</div>
                </div>
              </div>
          );
        })}</>
      )}
    </div>
  );
};

Boards.propTypes = {
  page: PropTypes.shape({
    data: PropTypes.shape({
      roles: PropTypes.array,
      user: PropTypes.object
    })
  })
};

export default Boards;
