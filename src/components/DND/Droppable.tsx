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
    this.context.registerDroppable(this);
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
  update = (callback?: () => void) => {
    if (!this.animRequested) return;
    const { type, vertical = true } = this.props;
    const dragging = this.context.dragging;
    if (dragging) {
      if (dragging.props.type === type) {
        const mouse = dragging.mouse;
        const isAfter = (e: HTMLElement, index: number) => {
          const rect = e.getBoundingClientRect();
          return (
            index > firstAfterIndex &&
            (vertical
              ? (rect.top + rect.bottom) / 2 < mouse[1]
              : (rect.left + rect.right) / 2 < mouse[0])
          );
        };
        let firstAfterIndex = 0;
        this.draggablesMap((v, e) => {
          if (v === dragging) return;
          const index = v.props.index + 1;
          if (isAfter(e, index)) {
            firstAfterIndex = index;
          }
        });
        if (!this.state.draggingOver || this.state.firstAfterIndex !== firstAfterIndex) {
          console.log(firstAfterIndex);
          this.context.updateDropResult(this, firstAfterIndex);
          this.setState({ draggingOver: true, firstAfterIndex }, callback);
        } else callback && callback();
      }
    } else if (this.state.draggingOver) this.setState({ draggingOver: false });
    this.animFrame = requestAnimationFrame(() => this.update());
  };
  beginListening = (callback?: () => void) => {
    if (!this.animRequested) {
      this.animRequested = true;
      this.update(callback);
    }
  };
  endListening = () => {
    this.animRequested = false;
    cancelAnimationFrame(this.animFrame);
    this.setState({ draggingOver: false, firstAfterIndex: -1 });
  };
  render = () => {
    let placeholder = null;
    let dragOverShuffle = [0, 0];
    const { vertical = true } = this.props;
    if (this.context.dragging != null && this.context.dragging.props.type === this.props.type) {
      const dims = this.context.dragging.dims;
      placeholder = <div style={{ minWidth: `${dims[0]}px`, minHeight: `${dims[1]}px` }} />;
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
