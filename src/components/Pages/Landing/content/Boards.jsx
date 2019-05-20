import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateBoard from "./CreateBoard";
import "./Boards.scss";

const Boards = ({ page: { data = {}, showModal, closeModal } }) => {
  const { roles = [] } = data;
  return (
    <div id="boards-content">
      <>
        <div className="new-board flex">
          <button onClick={() => showModal(<CreateBoard onClose={closeModal} />)}>
            Create New Board
          </button>
        </div>
        {roles.map(({ board: { id, title, urlName }, userId, privilege }) => {
          return (
            <div
              key={id}
              className="board flex"
              data-tip={`Go to board: ${title}`}
              data-for="board"
            >
              <div className="board-icon">
                <FontAwesomeIcon icon="columns" />
              </div>
              <div className="board-info grow">
                <div className="board-title">Board: {title}</div>
                <div className="board-user-role">Role: {privilege}</div>
                <Link className="board-link" to={`/board/${urlName}`}>
                  View Board
                </Link>
              </div>
            </div>
          );
        })}
      </>
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
