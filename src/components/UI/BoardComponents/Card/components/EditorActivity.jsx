import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditorActivity = props => {
  return (
    <div className="editor-container">
      <FontAwesomeIcon
        data-tip={props.dataTip || ""}
        data-for="card-editor"
        className="container-icon"
        style={props.style || { paddingTop: "5px" }}
        icon={props.icon}
        size="lg"
      />
      {props.children}
    </div>
  );
};

EditorActivity.propTypes = {
  style: PropTypes.object,
  icon: PropTypes.string.isRequired,
  dataTip: PropTypes.string
};

export default EditorActivity;
