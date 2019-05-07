import React from "react";
import PropTypes from "prop-types";
import { Boards } from "../content";

const RenderContent = ({ content, ...rest }) => {
  switch (content) {
    case "boards":
      return <Boards {...rest} />;
    default:
      return null;
  }
};

RenderContent.propTypes = {
  content: PropTypes.string
};

export default RenderContent;
