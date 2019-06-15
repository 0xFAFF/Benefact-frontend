import React from "react";
import { Draggable } from "components/DND/Draggable";
import Droppable from "components/DND/Droppable";
import { any } from "prop-types";

export interface DragDropContextType {
  dragging: Draggable | null;
  beginDrag(target: Draggable): void;
  endDrag(target: Draggable): void;
  registerDroppable(droppable: Droppable): void;
  updateDropResult(target: Droppable, index: number): void;
}

export const DragDropReactContext = React.createContext<DragDropContextType>({} as any);

export const DragDropConsumer = DragDropReactContext.Consumer;

export class DragDropContext extends React.Component {
  state = { dragging: null as Draggable | null };
  droppables: { [key: string]: Droppable } = {};
  dropResult = {} as any;
  endDrag = () => {
    const { onDragEnd } = this.props as any;
    if (this.state.dragging) {
      const dragging = this.state.dragging;
      const sourceId = dragging.context.source.props.id;
      const destId = this.dropResult.droppableId;
      const dragEndResult = {
        draggableId: dragging.props.id,
        type: this.dropResult.type,
        source: {
          droppableId: sourceId,
          index: dragging.props.index
        },
        destination: {
          droppableId: destId,
          index:
            this.dropResult.index +
            (destId === sourceId && this.dropResult.index > dragging.props.index ? -1 : 0)
        }
      };
      this.setState({ dragging: null }, () => {
        if (onDragEnd) onDragEnd(dragEndResult);
      });
      this.dropResult = {};
    }
  };
  registerDroppable(droppable: Droppable) {
    this.droppables[`${droppable.props.type}-${droppable.props.id}`] = droppable;
  }
  render = () => {
    return (
      <DragDropReactContext.Provider
        value={{
          dragging: this.state.dragging,
          beginDrag: dragging => this.setState({ dragging }),
          endDrag: this.endDrag,
          registerDroppable: this.registerDroppable,
          updateDropResult: (d, i) => {
            this.dropResult = { type: d.props.type, droppableId: d.props.id, index: i };
          }
        }}
      >
        {this.props.children}
      </DragDropReactContext.Provider>
    );
  };
}
