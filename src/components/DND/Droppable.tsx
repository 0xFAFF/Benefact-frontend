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
  vertical?: boolean;
}
export class Droppable extends React.Component<DroppableProps> {
  static contextType = DragDropReactContext;
  context!: React.ContextType<typeof DragDropReactContext>;
  state = { draggingOver: false, firstAfterIndex: 0 as number };
  draggables: { [key: number]: Draggable } = {};
  innerRef = React.createRef<HTMLElement>();
  animFrame = 0;
  animRequested = false;
  componentDidMount = () => {
    if (!this.innerRef.current) return;
    this.innerRef.current.addEventListener("touchmove", this.beginListening, { passive: false });
  };
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
    const { type, vertical = true } = this.props;
    const dragging = this.context.dragging;
    if (dragging) {
      if (dragging.props.type === type) {
        const mouse = dragging.mouse;
        const isAfter = (e: HTMLElement, index: number) =>
          index > firstAfterIndex &&
          (vertical
            ? e.offsetTop + e.offsetHeight < mouse[1]
            : e.offsetLeft + e.offsetWidth < mouse[0]);
        let firstAfterIndex = 0;
        this.draggablesMap((v, e) => {
          const index = v.props.index + 1;
          if (isAfter(e, index)) {
            firstAfterIndex = index;
          }
        });
        if (!this.state.draggingOver || this.state.firstAfterIndex !== firstAfterIndex) {
          this.context.updateDropResult(this, firstAfterIndex);
          this.setState({ draggingOver: true, firstAfterIndex });
        }
      }
    } else if (this.state.draggingOver) this.setState({ draggingOver: false });
    this.animFrame = requestAnimationFrame(this.update);
  };
  beginListening = () => {
    if (!this.animRequested) {
      console.log("Droppable begin listening", this.props.id);
      this.animRequested = true;
      this.animFrame = requestAnimationFrame(this.update);
    }
  };
  endListening = () => {
    console.log("Droppable end listening", this.props.id);
    cancelAnimationFrame(this.animFrame);
    this.animRequested = false;
    this.setState({ draggingOver: false });
  };
  render = () => {
    let placeholder = null;
    let dragOverShuffle = [0, 0];
    const { vertical = true } = this.props;
    if (this.context.dragging != null) {
      const dims = this.context.dragging.dims;
      // TODO: Having the placeholder always show avoids scrollbars during transform transitions
      // if (this.state.draggingOver)
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
              onMouseMove: this.beginListening,
              onTouchMove: this.beginListening,
              onMouseLeave: this.endListening,
              onTouchEnd: this.endListening,
              ref: this.innerRef
            }
          },
          this.state
        )}
      </DroppableContext.Provider>
    );
  };
}

export default Droppable;
