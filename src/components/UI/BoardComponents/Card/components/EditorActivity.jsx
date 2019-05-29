import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditorActivity = props => {
  const className = "editor-container " + (props.className || "")
  return (
    <div className={className}>
      <FontAwesomeIcon
        data-tip={props.dataTip || ""}
        data-for="card-editor"
        className="container-icon secondary"
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
