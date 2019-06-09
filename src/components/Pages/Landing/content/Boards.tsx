import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateBoard from "./CreateBoard";
import { Modal, Accordion } from "components/UI";
import "./Boards.scss";

interface boardProps {
  title?: string;
  urlName?: string;
  userPrivilege?: string;
  description?: string;
}

class Boards extends React.Component {
  state = { showModal: false };
  render = () => {
    const {
      page: { data: { boards = [] } = {}, showModal, closeModal }
    } = this.props as any;

    const BoardTitle = ({ title, urlName }: boardProps) => {
      return (
        <>
          <div className="board-icon">
            <FontAwesomeIcon icon="columns" className="secondary" />
          </div>
          <div className="board-info grow row">
            <div className="title">Board: {title}</div>
            <Link to={`/board/${urlName}`}>View Board</Link>
          </div>
        </>
      );
    };

    const BoardContent = ({ userPrivilege, description }: boardProps) => {
      return (
        <>
          <div className="board-user-role">Role: {userPrivilege}</div>
          <div className="board-user-description">Description: {description}</div>
        </>
      );
    };

    const panels = boards.map((board: boardProps) => {
      return {
        title: {
          content: <BoardTitle {...board} />,
          className: "board-title"
        },
        content: {
          content: <BoardContent {...board} />,
          className: "board-content"
        }
      };
    });

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
        <div>
          <Accordion panels={panels} className="board" />
        </div>
      </div>
    );
  };
}

export default Boards;
