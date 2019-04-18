import React from "react";
import { EditorActivity } from "components/UI/BoardComponents/Card/components";
import URLS from "constants/URLS";

class Attachments extends React.Component {
  render() {
    return (
      <EditorActivity icon="file">
        {this.props.attachmentIds.map(fileId => (
          <div>{fileId}</div>
          // <img src={URLS("files", "GET", {boardId: 1, fileId}).name}/>
        ))}
      </EditorActivity>
    );
  }
}

export default Attachments;
