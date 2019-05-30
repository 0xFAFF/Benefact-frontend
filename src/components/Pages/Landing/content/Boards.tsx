import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateBoard from "./CreateBoard";
import "./Boards.scss";
import { Modal } from "components/UI";

interface board {
  title?: string;
  urlName?: string;
  userPrivilege?: string;
}

class Boards extends React.Component {
  state = { showModal: false };
  render = () => {
    const {
      page: { data: { boards = [] } = {}, showModal, closeModal }
    } = this.props as any;
    return (
      <div id="boards-content">
        <Modal
          isOpen={this.state.showModal}
          title="Create a New Board"
          onClose={() => this.setState({ showModal: false })}
        >
          <CreateBoard />
        </Modal>
        <div className="new-board flex">
          <button onClick={() => this.setState({ showModal: true })}>Create New Board</button>
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
}

export default Boards;
