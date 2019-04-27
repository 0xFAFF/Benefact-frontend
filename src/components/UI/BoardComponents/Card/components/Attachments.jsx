import React from "react";
import { EditorActivity } from "components/UI/BoardComponents/Card/components";
import URLS from "constants/URLS";
import { PageConsumer } from "components/Pages/PageContext";
import "./Attachments.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Attachments extends React.Component {
  componentDidMount;
  attachmentEntry = attach => {
    const url = URLS("files", "GET", { boardId: this.props.page.data.urlName, fileId: attach.id }).name;
    return (
      <div key={attach.id} className="row-entry">
        <div className="attach-thumbnail">{attach.contentType.includes("image") ? <img src={url} alt={attach.name} /> : "File"}</div>
        <div>{attach.name}</div>
        <FontAwesomeIcon
          icon={"trash"}
          size="sm"
          className="delete-button"
          onClick={() => this.props.handleUpdate("files", "DELETE", {id: attach.id})}
        />
      </div>
    );
  };
  render() {
    return (
      <EditorActivity icon="file">
        <div className="row-container">
          {this.props.attachments.map(this.attachmentEntry)}
        </div>
      </EditorActivity>
    );
  }
}

export default props => <PageConsumer>{page => <Attachments {...props} page={page} />}</PageConsumer>;
