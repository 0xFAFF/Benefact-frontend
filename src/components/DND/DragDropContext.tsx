import React from "react";
import { Draggable } from "components/DND/Draggable";

export interface DragDropContextType {
  dragging: Draggable | null;
  beginDrag(target: Draggable): void;
  endDrag(target: Draggable): void;
}

export const ReactContext = React.createContext<DragDropContextType>({} as any);

export const DragDropConsumer = ReactContext.Consumer;

export class DragDropContext extends React.Component {
  state = { dragging: null as Draggable | null };
  endDrag = () => {
    const { onDragEnd } = this.props as any;
    this.setState({ dragging: null }, () => {
      if (onDragEnd) onDragEnd({});
    });
  };
  render = () => {
    return (
      <ReactContext.Provider
        value={{
          dragging: this.state.dragging,
          beginDrag: dragging => this.setState({ dragging }),
          endDrag: this.endDrag
        }}
      >
        {this.props.children}
      </ReactContext.Provider>
    );
  };
}
