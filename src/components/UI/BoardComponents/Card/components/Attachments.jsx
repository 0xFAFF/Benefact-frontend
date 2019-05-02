import React from "react";
import { EditorActivity } from "components/UI/BoardComponents/Card/components";
import URLS from "constants/URLS";
import "./Attachments.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PageProp } from "components/Pages/PageContext";
import { Modal } from "components/UI";

class Attachments extends React.Component {
  state = {
    preview: null
  };
  componentDidMount;
  attachmentEntry = attach => {
    const { data } = this.props.page;
    const url =
      attach.url || `${URLS("files", "GET", { boardId: data.urlName, fileId: attach.id }).name}/${attach.name}`;
    const preview = attach.preview || (attach.contentType && attach.contentType.includes("image") ? url : null);
    return (
      <div key={attach.id} className="row-entry">
        {preview ? (
          <div className="attach-thumbnail">
            <img src={preview} alt={attach.name} />
          </div>
        ) : null}
        <a href={url} target="_blank" rel="noopener noreferrer">
          {attach.name}
        </a>
        <a href={url} download={attach.name} className="hover-show">
          <FontAwesomeIcon data-tip="Download" icon="download" size="sm" />
        </a>
        <FontAwesomeIcon
          data-tip="Delete this attachment"
          icon="trash"
          size="sm"
          className="hover-show pull-right"
          onClick={() => this.props.handleUpdate("files", "DELETE", { id: attach.id })}
        />
      </div>
    );
  };
  render() {
    return (
      <EditorActivity icon="file" dataTip="Card Attachments">
        <div className="row-container">{this.props.attachments.map(this.attachmentEntry)}</div>
        <Modal isOpen={this.state.preview != null} onClose={() => this.setState({ preview: null })}>
          {this.state.preview}
        </Modal>
      </EditorActivity>
    );
  }
}

export default PageProp(Attachments);
