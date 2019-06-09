import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateBoard from "./CreateBoard";
import { Modal, Accordion } from "components/UI";
import { AccordianChildProps } from "components/UI/PageComponents/Accordian";
import { PrivilegeMap } from "components/UI/PageComponents/Form/PrivilegeInput";
import { hasPrivilege } from "utils";
import "./Boards.scss";

interface boardProps {
  title?: string;
  urlName?: string;
  userPrivilege: number;
  description?: string;
}

class Boards extends React.Component {
  state = { showModal: false };
  render = () => {
    const {
      page: { data: { boards = [] } = {} }
    } = this.props as any;

    const BoardEntry = (
      { title, urlName, userPrivilege, description }: boardProps,
      index: number
    ) => ({ isActive, onClick }: AccordianChildProps) => (
      <div key={index} className="section board">
        <div className="row cursor-pointer" onClick={onClick}>
          <div className="board-icon">
            <FontAwesomeIcon icon="columns" className="secondary" />
          </div>
          <div className="board-info grow col">
            <div className="row">
              <div className="title">{title}</div>
              <div className="pull-right">{isActive ? "Hide Details" : "Show Details"}</div>
            </div>
            <Link to={`/board/${urlName}`}>View Board</Link>
          </div>
        </div>
        {isActive && (
          <>
            <div className="board-user-role">Role: {PrivilegeMap[userPrivilege]}</div>
            <div className="board-user-description">Description: {description}</div>
            {hasPrivilege("admin", userPrivilege) && (
              <Link to={`/board/${urlName}/settings`}>Edit Board Settings</Link>
            )}
          </>
        )}
      </div>
    );

    return (
      <div className="boards-content section-container">
        <Modal
          isOpen={this.state.showModal}
          title="Create a New Board"
          onClose={() => this.setState({ showModal: false })}
        >
          <CreateBoard onClose={() => this.setState({ showModal: false })} />
        </Modal>
        <button onClick={() => this.setState({ showModal: true })}>Create New Board</button>
        <Accordion>{boards.map(BoardEntry)}</Accordion>
      </div>
    );
  };
}

export default Boards;
