import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateBoard from "./CreateBoard";
import "./Boards.scss";
import { ModalContainer } from "components/UI";

const Boards = ({ page: { data = {}, showModal, closeModal } }) => {
  const { boards = [] } = data;
  return (
    <div id="boards-content">
      <>
        <div className="new-board flex">
          <button
            onClick={() =>
              showModal(
                <ModalContainer
                  onClose={closeModal}
                  componentHeader="Create a New Board"
                  component={CreateBoard}
                />
              )
            }
          >
            Create New Board
          </button>
        </div>
        {boards.map(({ title, urlName, userPrivilege }) => {
          return (
            <div
              key={urlName}
              className="board flex"
              data-tip={`Go to board: ${title}`}
              data-for="board"
            >
              <div className="board-icon">
                <FontAwesomeIcon icon="columns" className="secondary" />
              </div>
              <div className="board-info grow">
                <div className="board-title">Board: {title}</div>
                <div className="board-user-role">Role: {userPrivilege}</div>
                <Link to={`/board/${urlName}`}>View Board</Link>
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
