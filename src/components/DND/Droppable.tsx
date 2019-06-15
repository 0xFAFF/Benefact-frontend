import React from "react";
import { DNDProps } from "components/DND";
import "./DND.scss";
import { DragDropReactContext, DragDropContextType } from "components/DND/DragDropContext";
import Draggable from "components/DND/Draggable";

interface DroppableContextType extends DragDropContextType {
  draggingOver: boolean;
  firstAfterIndex: number;
  dragOverShuffle: number[];
  source: Droppable;
  registerDraggable(index: number, draggable: Draggable): void;
}
export const DroppableContext = React.createContext<DroppableContextType>({} as any);
interface DroppableProps extends DNDProps {
  type: string;
  id: string;
  index: number;
}
export class Droppable extends React.Component<DroppableProps> {
  static contextType = DragDropReactContext;
  context!: React.ContextType<typeof DragDropReactContext>;
  state = { draggingOver: false, firstAfterIndex: 0 as number };
  draggables: { [key: number]: Draggable } = {};
  innerRef = React.createRef<HTMLElement>();
  animFrame = 0;
  animRequested = false;

  registerChild = (index: number, draggable: Draggable) => {
    this.draggables[index] = draggable;
  };

  draggablesMap = (callback: (draggable: Draggable, element: HTMLElement) => void) => {
    Object.values(this.draggables).map(d => {
      if (!d.innerRef.current) return;
      callback(d, d.innerRef.current);
    });
  };
  update = () => {
    if (this.context.dragging) {
      if (this.context.dragging.props.type === this.props.type) {
        const mouse = this.context.dragging.mouse;
        let firstAfterIndex = 0;
        this.draggablesMap((v, e) => {
          const index = v.props.index;
          if (e.offsetTop < mouse[1] && index > firstAfterIndex) {
            firstAfterIndex = index;
          }
        });
        console.log(firstAfterIndex);
        if (!this.state.draggingOver || this.state.firstAfterIndex !== firstAfterIndex) {
          this.context.updateDropResult(this, firstAfterIndex);
          this.setState({ draggingOver: true, firstAfterIndex });
        }
      }
    } else if (this.state.draggingOver) this.setState({ draggingOver: false });
    this.animFrame = requestAnimationFrame(this.update);
  };
  render = () => {
    let placeholder = null;
    let dragOverShuffle = [0, 0];
    //TODO: Figure out
    const vertical = true;
    if (this.context.dragging != null) {
      const dims = this.context.dragging.dims;
      if (this.state.draggingOver)
        placeholder = <div style={{ width: `${dims[0]}px`, height: `${dims[1]}px` }} />;
      dragOverShuffle = [vertical ? 0 : dims[0], vertical ? dims[1] : 0];
    }
    return (
      <DroppableContext.Provider
        value={{
          source: this,
          registerDraggable: this.registerChild,
          firstAfterIndex: this.state.firstAfterIndex,
          draggingOver: this.state.draggingOver,
          dragOverShuffle,
          ...this.context
        }}
      >
        {this.props.children(
          {
            placeholder,
            droppableProps: {
              onMouseMove: () => {
                if (!this.animRequested) {
                  this.animRequested = true;
                  this.animFrame = requestAnimationFrame(this.update);
                }
              },
              onMouseLeave: () => {
                cancelAnimationFrame(this.animFrame);
                this.animRequested = false;
                this.setState({ draggingOver: false });
              },
              ref: this.innerRef
            }
          },
          {}
        )}
      </DroppableContext.Provider>
    );
  };
}

export default Droppable;
