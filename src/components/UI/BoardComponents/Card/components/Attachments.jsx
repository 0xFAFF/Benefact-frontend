import React from "react";
import { EditorActivity } from "components/UI/BoardComponents/Card/components";
import URLS from "constants/URLS";
import { PageConsumer } from "components/Pages/PageContext";
import "./Attachments.scss";

class Attachments extends React.Component {
  componentDidMount;
  attachmentEntry = attach => {
    const url = URLS("files", "GET", { boardId: 1, fileId: attach.id }).name;
    return (
      <a key={attach.id} className="row-entry" href={url}>
        <div className="attach-thumbnail">{attach.contentType.includes("image") ? <img src={url} /> : "File"}</div>
        <div>{attach.name}</div>
      </a>
    );
  };
  render() {
    return (
      <EditorActivity icon="file">
        <div className="row-container">{this.props.attachments.map(this.attachmentEntry)}</div>
      </EditorActivity>
    );
  }
}

export default props => <PageConsumer>{page => <Attachments {...props} page={page} />}</PageConsumer>;
