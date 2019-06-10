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

    const ActiveContent = ({ title, userPrivilege, description, urlName }: boardProps) => {
      const fields = [
        {
          header: "Title",
          content: title
        },
        {
          header: "Description",
          content: description || "No description available"
        },
        {
          header: "URL Name",
          // NOTE: Should probably not be hardcoded in here
          content: `https://benefact.dev/board/${urlName}`
        },
        {
          header: "Your Role",
          content: PrivilegeMap[userPrivilege]
        },
        {
          header: "Your Privileges",
          content: "N/A"
        },
        {
          header: "Default Privilege",
          content: "N/A"
        },
        {
          header: "Columns",
          content: "N/A"
        },
        {
          header: "Tags",
          content: "N/A"
        },
        {
          header: "Team Members",
          content: "N/A"
        },
        {
          header: "Contributors",
          content: "N/A"
        },
        {
          header: "Last Updated",
          content: "N/A"
        }
      ];
      return (
        <div className="section bg-primary">
          {hasPrivilege("admin", userPrivilege) && (
            <div className="pull-right">
              <Link to={`/board/${urlName}/settings`}>Edit Board Settings</Link>
            </div>
          )}
          <div className="flex col table">
            {fields.map(({ header, content }, index) => (
              <div key={index} className="flex row table-container">
                <div className="bold table-header">{header}</div>
                <div className="grow table-content">{content}</div>
              </div>
            ))}
          </div>
        </div>
      );
    };

    const BoardEntry = (props: boardProps, index: number) => ({
      isActive,
      onClick
    }: AccordianChildProps) => {
      const { title, urlName } = props;
      return (
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
          {isActive && <ActiveContent {...props} />}
        </div>
      );
    };

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
