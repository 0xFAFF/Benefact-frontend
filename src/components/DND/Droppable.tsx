import React from "react";
import { DNDProps } from "components/DND";
import "./DND.scss";
import { DragDropContextType, ReactContext } from "components/DND/DragDropContext";

export class Droppable extends React.Component<DNDProps> {
  static contextType = ReactContext;
  context!: React.ContextType<typeof ReactContext>;
  render = () => {
    let placeholder = null;
    if (this.context.dragging != null) {
      placeholder = <div style={{ height: "20px", width: "20px" }} />;
    }
    return this.props.children({ placeholder }, {});
  };
}

export default Droppable;
