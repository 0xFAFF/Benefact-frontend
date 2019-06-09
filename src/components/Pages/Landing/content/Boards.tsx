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

interface boardTitleProps extends boardProps {
  onClick?: (index: number) => void;
  index: number;
  isIndexActive?: (index: number) => void;
}

class Boards extends React.Component {
  state = { showModal: false };
  render = () => {
    const {
      page: { data: { boards = [] } = {} }
    } = this.props as any;

    const BoardTitle = ({ title, urlName, onClick, index, isIndexActive }: boardTitleProps) => {
      return (
        <>
          <div className="board-icon">
            <FontAwesomeIcon icon="columns" className="secondary" />
          </div>
          <div className="board-info grow row">
            <div className="title">Board: {title}</div>
            <div>
              <div className="cursor-pointer" onClick={() => (onClick ? onClick(index) : null)}>
                {isIndexActive && isIndexActive(index) ? "Hide Details" : "See Details"}
              </div>
              <Link to={`/board/${urlName}`}>View Board</Link>
            </div>
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

    const panels = (titleClick: (index: number) => void, isIndexActive: (index: number) => void) =>
      boards.map((board: boardProps, index: number) => {
        return {
          title: {
            content: (
              <BoardTitle
                {...board}
                onClick={titleClick}
                isIndexActive={isIndexActive}
                index={index}
              />
            ),
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
        <Accordion className="board section row">
          {({ titleClick, isIndexActive }) => panels(titleClick, isIndexActive)}
        </Accordion>
      </div>
    );
  };
}

export default Boards;
