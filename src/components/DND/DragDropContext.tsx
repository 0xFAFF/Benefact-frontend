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
    const linearScroll = (a: number, b: number, w: number) => {
      const t = Math.min(99999, (b - a) / 4);
      if (w >= b - t && w <= b) return ((w - (b - t)) / t) * 20;
      if (w <= a + t && w >= a) return ((w - (a + t)) / t) * 20;
      return 0;
    };
    if (this.dragOverElement) {
      const scrolls = findScrollParents(this.dragOverElement);
      scrolls.map(({ vertical, element }) => {
        const rect = element.getBoundingClientRect();
        if (vertical) element.scrollBy(0, linearScroll(rect.top, rect.bottom, mouse[1]));
        if (!vertical) element.scrollBy(linearScroll(rect.left, rect.right, mouse[0]), 0);
      });
    }
    this.animFrame = requestAnimationFrame(this.scrollUpdate);
  };
  findDropable(type: string, ele?: Element | null): Droppable | null {
    if (!ele) return null;
    const res = Object.values(this.droppables).find(d => d.innerRef.current === ele);
    console.log(ele);
    if (res) {
      console.log(res.props.id);
      if (res.props.type === type) return res;
    }
    return this.findDropable(type, ele.parentElement);
  }
  touchUpdate = (e: TouchEvent) => {
    this.mouseUpdate({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
  };
  mouseUpdate = (e: MoveEvent) => {
    let { clientX, clientY, buttons = 1, target = null } = e;
    if (!target) target = document.elementFromPoint(clientX, clientY) as HTMLElement;
    if (buttons === 0) this.endDrag();
    this.mouse = [clientX, clientY];
    if (this.state.dragging) {
      this.state.dragging.mouse = this.mouse;
      const drop = this.findDropable(this.state.dragging.props.type, target);
      console.log(drop);
      if (drop) this.setDragOver(drop);
    }
    this.dragOverElement = target || null;
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
