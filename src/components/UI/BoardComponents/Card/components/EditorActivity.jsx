import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditorActivity = props => {
  return (
    <div className="editor-container">
      <FontAwesomeIcon className="container-icon" style={{ paddingTop: "5px" }} icon={props.icon} size="lg" />
      {props.children}
    </div>
  );
};

export default EditorActivity;
