import React from "react";
import PropTypes from "prop-types";
import { Boards, MyCards } from "../content";

const RenderContent = ({ content, ...rest }) => {
  switch (content) {
    case "boards":
      return <Boards {...rest} />;
    case "myCards":
      return <MyCards {...rest} />;
    default:
      return null;
  }
};

RenderContent.propTypes = {
  content: PropTypes.string
};

export default RenderContent;
