import React from "react";
import PropTypes from "prop-types";
import { General, Columns, Tags } from "../content";

export const RenderContent = ({ content, ...rest }) => {
  switch (content) {
    case "general":
      return <General {...rest} />;
    case "columns":
      return <Columns {...rest} />;
    case "tags":
      return <Tags {...rest} />;
    default:
      return null;
  }
};

RenderContent.propTypes = {
  content: PropTypes.string
};
