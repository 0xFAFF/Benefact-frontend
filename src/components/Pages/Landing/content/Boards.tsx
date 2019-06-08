import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateBoard from "./CreateBoard";
import "./Boards.scss";
import { Modal } from "components/UI";
import { PrivilegeMap } from "components/UI/PageComponents/Form/PrivilegeInput";

interface board {
  title?: string;
  urlName?: string;
  userPrivilege: number;
}

class Boards extends React.Component {
  state = { showModal: false };
  render = () => {
    const {
      page: { data: { boards = [] } = {}, showModal, closeModal }
    } = this.props as any;
    return (
      <div className="boards-content section-container">
        <Modal
          isOpen={this.state.showModal}
          title="Create a New Board"
          onClose={() => this.setState({ showModal: false })}
        >
          <CreateBoard />
        </Modal>
        <button onClick={() => this.setState({ showModal: true })}>Create New Board</button>
        {boards.map(({ title, urlName, userPrivilege }: board) => {
          return (
            <div
              key={urlName}
              className="section lg board flex"
              data-tip={`Go to board: ${title}`}
              data-for="board"
            >
              <div className="board-icon">
                <FontAwesomeIcon icon="columns" className="secondary" />
              </div>
              <div className="board-info grow">
                <div className="board-title">Board: {title}</div>
                <div className="board-user-role">Role: {PrivilegeMap[userPrivilege]}</div>
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
