import React from "react";
import { Boards } from "../content";

const RenderContent = ({ content }) => {
  switch (content) {
    case "boards":
      return <Boards />;
    default:
      return null;
  }
};

export default RenderContent;
