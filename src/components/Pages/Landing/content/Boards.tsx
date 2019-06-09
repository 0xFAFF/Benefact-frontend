import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateBoard from "./CreateBoard";
import "./Boards.scss";
import { Modal, Accordion } from "components/UI";
import { PrivilegeMap } from "components/UI/PageComponents/Form/PrivilegeInput";

interface boardProps {
  title?: string;
  urlName?: string;
  userPrivilege?: number;
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

    const BoardContent = ({ userPrivilege = 0, description }: boardProps) => {
      return (
        <>
          <div className="board-user-role">Role: {PrivilegeMap[userPrivilege]}</div>
          <div className="board-user-description">Description: {description}</div>
        </>
      );
    };

    const panels = boards.map((board: boardProps) => {
      return {
        title: {
          content: <BoardTitle {...board} />,
          className: "board"
        },
        content: {
          content: <BoardContent {...board} />,
          className: "col"
        }
      };
    });

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
        <Accordion panels={panels} className="board section row" />
      </div>
    );
  };
}

export default Boards;
