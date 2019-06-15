import React from "react";
import { DNDProps } from "components/DND";
import "./DND.scss"

export class Droppable extends React.Component<DNDProps> {
  render = () => {
    return this.props.children({}, {});
  };
}

export default Droppable;
