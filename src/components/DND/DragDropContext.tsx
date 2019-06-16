import React from "react";
import { Draggable } from "components/DND/Draggable";
import Droppable from "components/DND/Droppable";

const findScrollParents = (
  element: HTMLElement | null
): Array<{ vertical: boolean; element: HTMLElement }> => {
  if (!element) return [];
  let result = findScrollParents(element.parentElement);
  if (element.scrollHeight > element.offsetHeight)
    result = [{ vertical: true, element }, ...result];
  if (element.scrollWidth > element.offsetWidth) result = [{ vertical: false, element }, ...result];
  return result;
};

export interface DragDropContextType {
  dragging: Draggable | null;
  beginDrag(e: MoveEvent, target: Draggable): void;
  endDrag(target: Draggable): void;
  registerDroppable(droppable: Droppable): void;
  updateDropResult(target: Droppable, index: number): void;
}

export const DragDropReactContext = React.createContext<DragDropContextType>({} as any);

export const DragDropConsumer = DragDropReactContext.Consumer;
interface MoveEvent {
  clientX: number;
  clientY: number;
  target?: HTMLElement | null;
  buttons?: number;
}
export class DragDropContext extends React.Component {
  state = { dragging: null as Draggable | null };
  droppables: { [key: string]: Droppable } = {};
  dropResult = {} as any;
  dragOver: Droppable | null = null;
  mouse = [0, 0];
  dragOverElement: HTMLElement | null = null;
  animFrame = 0;
  scrollUpdate = () => {
    const mouse = this.mouse;
    if (this.dragOverElement) {
      const scrolls = findScrollParents(this.dragOverElement);
      scrolls.map(({ vertical, element }) => {
        if (vertical && mouse[1] < element.offsetTop + 100) element.scrollBy(0, -5);
        if (vertical && mouse[1] > element.offsetTop + element.offsetHeight - 100)
          element.scrollBy(0, 5);
        if (!vertical && mouse[0] < element.offsetLeft + 100) element.scrollBy(-5, 0);
        if (!vertical && mouse[0] > element.offsetLeft + element.offsetWidth - 100)
          element.scrollBy(5, 0);
      });
    }
    this.animFrame = requestAnimationFrame(this.scrollUpdate);
  };
  findDropable(ele?: Element | null): Droppable | null {
    if (!ele) return null;
    const res = Object.values(this.droppables).find(d => d.innerRef.current === ele);
    return res ? res : this.findDropable(ele.parentElement);
  }
  touchUpdate = (e: TouchEvent) => {
    this.mouseUpdate({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
  };
  mouseUpdate = (e: MoveEvent) => {
    let { clientX, clientY, buttons = 1, target = null } = e;
    if (!target) target = document.elementFromPoint(clientX, clientY) as HTMLElement;
    if (buttons === 0) this.endDrag();
    this.mouse = [clientX, clientY];
    if (this.state.dragging) this.state.dragging.mouse = this.mouse;
    this.dragOverElement = target || null;
    const drop = this.findDropable(target);
    if (drop) this.setDragOver(drop);
  };
  beginDrag = (e: MoveEvent, target: Draggable) => {
    this.setState({ dragging: target });
    this.mouseUpdate(e);
    this.animFrame = requestAnimationFrame(this.scrollUpdate);
    document.addEventListener("touchmove", this.touchUpdate);
    document.addEventListener("mousemove", this.mouseUpdate as any);
  };
  setDragOver = (dragOver: Droppable | null) => {
    if (this.dragOver && this.dragOver !== dragOver) this.dragOver.endListening();
    this.dragOver = dragOver;
    if (this.dragOver) this.dragOver.beginListening();
  };
  endDrag = () => {
    cancelAnimationFrame(this.animFrame);
    document.removeEventListener("touchmove", this.touchUpdate);
    document.removeEventListener("mousemove", this.mouseUpdate as any);
    this.setDragOver(null);
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
        if (onDragEnd && Object.values(this.dropResult).length > 0) onDragEnd(dragEndResult);
        this.dropResult = {};
      });
    }
  };
  registerDroppable = (droppable: Droppable) => {
    this.droppables[`${droppable.props.type}-${droppable.props.id}`] = droppable;
  };
  render = () => {
    return (
      <DragDropReactContext.Provider
        value={{
          dragging: this.state.dragging,
          beginDrag: this.beginDrag,
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
