import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateBoard from "./CreateBoard";
import { ModalContainer } from "components/UI";
import "./Boards.scss";

interface board {
  title?: string;
  urlName?: string;
  userPrivilege?: string;
}

const Boards = ({
  page: { data: { boards = [] } = {}, showModal, closeModal }
}: {
  page: { data: { boards?: Array<board> }; showModal(children?: any): void; closeModal: void };
}) => {
  return (
    <div id="boards-content">
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
      {boards.map(({ title, urlName, userPrivilege }: board) => {
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
    </div>
  );
};

export default Boards;
