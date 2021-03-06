import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateBoard from "./CreateBoard";
import ImportBoard from "./ImportBoard";
import { Modal, Accordion, Button } from "components/UI";
import { AccordianChildProps } from "components/UI/PageComponents/Accordian";
import { PrivilegeMap } from "components/UI/PageComponents/Form/PrivilegeInput";
import { hasPrivilege } from "utils";
import { PageProps } from "components/Pages/PageContext";
import "./Boards.scss";
import { Confirm } from "components/UI/Popup";
import URLS from "constants/URLS";

interface boardProps {
  id: number;
  creatorId: number;
  title: string;
  urlName: string;
  userPrivilege: number;
  defaultPrivilege: number;
  description: string | null;
}

class Boards extends React.Component {
  state = {
    showImportModal: false,
    showCreateModal: false,
    showDeleteModal: null as string | null
  };
  render = () => {
    const {
      page: {
        refreshData,
        urlFetch,
        data: { boards = [] } = {},
        user: { id: userId }
      }
    } = this.props as PageProps;
    const ActiveContent = ({
      creatorId,
      title,
      userPrivilege,
      description,
      urlName
    }: boardProps) => {
      const link = `/board/${urlName}`;
      const linkText = `${window.location.host}${link}`;
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
          content: <Link to={link}>{linkText}</Link>
        },
        {
          header: "Your Role",
          content: PrivilegeMap[userPrivilege]
        }
      ];
      return (
        <div className="section bg-primary">
          {hasPrivilege("admin", userPrivilege) && (
            <div className="flex content-header">
              <Link to={`/board/${urlName}/settings`} className="center flex">
                Edit Board Settings
              </Link>
              {creatorId === userId && (
                <Button
                  icon="trash"
                  className="sm danger pull-right"
                  onClick={() => this.setState({ showDeleteModal: urlName })}
                />
              )}
            </div>
          )}
          <div className="flex col table">
            {fields.map(({ header, content }, index) => (
              <div key={index} className="flex table-container">
                <div className="table-header">{header}</div>
                <div className="table-content">{content}</div>
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
              </div>
              <Link to={`/board/${urlName}`}>View Board</Link>
            </div>
            <div className="pull-right center flex details">
              {isActive ? "Hide Details" : "Show Details"}
            </div>
          </div>
          {isActive && <ActiveContent {...props} />}
        </div>
      );
    };

    return (
      <div className="boards-content section-container">
        <Modal
          isOpen={this.state.showCreateModal}
          title="Create Board"
          onClose={() => this.setState({ showCreateModal: false })}
        >
          <CreateBoard onClose={() => this.setState({ showCreateModal: false })} />
        </Modal>
        <Modal
          isOpen={this.state.showImportModal}
          title="Import Board"
          onClose={() => this.setState({ showImportModal: false })}
        >
          <ImportBoard onClose={() => this.setState({ showImportModal: false })} />
        </Modal>
        <Modal
          isOpen={Boolean(this.state.showDeleteModal)}
          title="Delete Board"
          onClose={() => this.setState({ showDeleteModal: null })}
        >
          <Confirm
            onAccept={async () => {
              await refreshData(
                urlFetch(URLS("boards", "DELETE", { boardId: this.state.showDeleteModal }))
              );
              this.setState({ showDeleteModal: null });
            }}
            acceptClassName="danger"
            acceptTitle="Delete"
            onCancel={() => this.setState({ showDeleteModal: null })}
            confirmMessage={"Are you sure you want to permanently delete this board?"}
          />
        </Modal>
        <button onClick={() => this.setState({ showCreateModal: true })}>Create New Board</button>
        <button onClick={() => this.setState({ showImportModal: true })}>Import Trello Board</button>
        <Accordion>{boards.map(BoardEntry)}</Accordion>
      </div>
    );
  };
}

export default Boards;
