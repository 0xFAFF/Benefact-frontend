import React from "react";
import "./DND.scss";
import { DroppableContext } from "components/DND/Droppable";
import { DNDProps } from "components/DND/DNDProps";
const rotationCurve = (x: number, c: number) =>
  Math.pow(Math.sin(Math.min(Math.PI / 2, Math.abs(x * c))), 2) * Math.sign(x);
const dist = (a: Array<number>, b: Array<number>) => {
  return Math.sqrt(a.map((v, i) => [v, b[i]]).reduce((t, v) => t + Math.pow(v[0] - v[1], 2), 0));
};
export interface DraggableProps extends DNDProps {
  index: number;
  type: string;
  id: any;
}

export class Draggable extends React.Component<DraggableProps> {
  static contextType = DroppableContext;
  context!: React.ContextType<typeof DroppableContext>;
  state = { dragging: false, style: null as {} | null, rotation: 0 };
  innerRef = React.createRef<HTMLElement>();
  startMouse = [0, 0];
  mouse = [0, 0];
  dims = [0, 0];
  innerDims = [0, 0];
  startingDrag = false;
  lastX = 0;
  animFrame = 0;
  unmounting = false;
  touchTimer: NodeJS.Timeout | undefined = undefined;
  componentWillUnmount = () => {
    this.unmounting = true;
  };
  // There is a bug in React where synethetic events for touchstart are
  // incapable of calling preventDefault, this is a work around
  componentDidMount = () => {
    if (this.innerRef.current) {
      this.innerRef.current.addEventListener("touchstart", this.onTouchStart);
      this.innerRef.current.addEventListener("touchmove", this.onTouchMove);
    }
  };

  onMouseMove = (e: MouseEvent) => {
    if (e.buttons === 0) this.startingDrag = false;
    if (!this.startingDrag) return;
    const pos = [e.clientX, e.clientY];
    if (dist(this.startMouse, pos) > 10) {
      this.beginDrag(e);
    }
  };
  //TODO: Catch begin drags that quickly leave client rectangle
  onMouseLeave = (e: MouseEvent) => {};
  beginDrag = (e: { clientX: number; clientY: number }) => {
    if (this.unmounting) return;
    this.startingDrag = false;
    if (this.context.dragging != null || this.innerRef.current === null) return;
    const ele = this.innerRef.current;
    const style = window.getComputedStyle(ele);
    this.lastX = e.clientX;
    const eleDims = [ele.clientWidth, ele.clientHeight];
    const paddingWidth = parseInt(style.paddingLeft || "0") + parseInt(style.paddingRight || "0");
    const paddingHeight = parseInt(style.paddingTop || "0") + parseInt(style.paddingBottom || "0");
    const marginWidth = parseInt(style.marginLeft || "0") + parseInt(style.marginRight || "0");
    const marginHeight = parseInt(style.marginTop || "0") + parseInt(style.marginBottom || "0");
    this.innerDims = [eleDims[0] - paddingWidth, eleDims[1] - paddingHeight];
    // TODO: This only happens to work because columms (horizontal) are in a flexbox
    // so the margin is counted on both sides, and cards (vertical) are not so the margin
    // is only "counted" on one side. The droppable should account for this instead.
    this.dims = [eleDims[0] + marginWidth, eleDims[1] + marginHeight / 2];
    this.context.beginDrag(e, this);
    this.setState({ dragging: true });
    document.addEventListener("touchend", this.endDrag);
  };
  endDrag = () => {
    this.cancelEvents();
    if (!this.state.dragging) return;
    this.context.endDrag(this);
    if (this.unmounting) return;
    this.setState({ dragging: false, style: null });
  };
  onMouseDown = (e: MouseEvent) => {
    this.startMouse = [e.clientX, e.clientY];
    this.startingDrag = true;
    document.addEventListener("mouseup", this.endDrag);
    e.preventDefault();
  };
  cancelEvents = () => {
    this.startingDrag = false;
    cancelAnimationFrame(this.animFrame);
    if (this.touchTimer) clearTimeout(this.touchTimer);
    document.removeEventListener("mouseup", this.endDrag);
    document.removeEventListener("touchend", this.endDrag);
  };
  onTouchMove = (e: TouchEvent) => {
    if (this.state.dragging) {
      e.preventDefault();
    } else if (this.startingDrag) this.cancelEvents();
  };
  onTouchStart = (e: TouchEvent) => {
    this.startingDrag = true;
    if (e.touches.length !== 1) return;
    const fakeE = { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
    this.touchTimer = setTimeout(() => this.beginDrag(fakeE), 100);
  };
  onTouchEnd = (e: TouchEvent) => {
    this.endDrag();
  };
  draggingUpdate = () => {
    if (this.unmounting) return;
    const mouse = this.mouse;
    let rotation = this.state.rotation * 0.9 + rotationCurve(mouse[0] - this.lastX, 0.15);
    this.lastX = mouse[0];
    const transform = `rotate(${rotation}deg)`;
    this.setState({
      rotation,
      style: {
        pointerEvents: "none",
        position: "fixed",
        zIndex: 9999,
        transform,
        left: `${mouse[0] - this.innerDims[0] / 2}px`,
        top: `${mouse[1] - this.innerDims[1] / 2}px`,
        width: `${this.innerDims[0]}px`,
        height: `${this.innerDims[1]}px`
      }
    });
    this.animFrame = requestAnimationFrame(this.draggingUpdate);
  };
  draggingOverDebounce = false;
  render = () => {
    this.context.registerDraggable(this.props.index, this);
    let notDraggingStyle: any = {};
    if (this.context.draggingOver) {
      if (this.draggingOverDebounce)
        notDraggingStyle.transition = "transform 0.3s cubic-bezier(0.25, 0.75, 0, 1) 0s";
      notDraggingStyle.pointerEvents = "none";
      notDraggingStyle.touchEvents = "none";
      if (this.context.firstAfterIndex <= this.props.index)
        notDraggingStyle.transform = `translate(${this.context.dragOverShuffle[0]}px, ${
          this.context.dragOverShuffle[1]
        }px)`;
    }
    this.draggingOverDebounce = Boolean(this.context.draggingOver);
    let style = this.state.dragging ? this.state.style : notDraggingStyle;
    return this.props.children(
      {
        dragHandleProps: {
          "data-drag-handle": 0,
          onMouseDown: this.onMouseDown,
          onTouchEnd: this.onTouchEnd,
          onMouseMove: this.onMouseMove,
          draggable: false
        },
        draggableProps: {
          style,
          ref: this.innerRef
        }
      },
      this.state
    );
  };
}

export default Draggable;
