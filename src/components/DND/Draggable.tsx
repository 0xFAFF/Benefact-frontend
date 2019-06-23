import React from "react";
import "./DND.scss";
import { DroppableContext } from "components/DND/Droppable";
import { DNDProps } from "components/DND/DNDProps";
const rotationCurve = (x: number, c: number) =>
  Math.pow(Math.sin(Math.min(Math.PI / 2, Math.abs(x * c))), 2) * Math.sign(x);
export interface DraggableProps extends DNDProps {
  index: number;
  type: string;
  id: any;
}

export class Draggable extends React.Component<DraggableProps> {
  static contextType = DroppableContext;
  context!: React.ContextType<typeof DroppableContext>;
  state = { dragging: false, style: null as {} | null };
  innerRef = React.createRef<HTMLElement>();
  mouseOffset = [0, 0];
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
      this.innerRef.current.addEventListener("contextmenu", e => e.preventDefault());
      this.innerRef.current.addEventListener("selectstart", e => e.preventDefault());
    }
  };

  beginDrag = (e: { clientX: number; clientY: number; type: string }) => {
    if (this.unmounting) return;
    this.startingDrag = false;
    if (this.context.dragging != null || this.innerRef.current === null) return;
    this.rotation = 0;
    const ele = this.innerRef.current;
    const style = window.getComputedStyle(ele);
    this.lastX = e.clientX;
    const eleRect = ele.getBoundingClientRect();
    const paddingWidth = parseInt(style.paddingLeft || "0") + parseInt(style.paddingRight || "0");
    const paddingHeight = parseInt(style.paddingTop || "0") + parseInt(style.paddingBottom || "0");
    const marginLeft = parseInt(style.marginLeft || "0");
    const marginWidth = marginLeft + parseInt(style.marginRight || "0");
    const marginTop = parseInt(style.marginTop || "0");
    const marginHeight = marginTop + parseInt(style.marginBottom || "0");
    this.mouseOffset = [e.clientX - eleRect.left + marginLeft, e.clientY - eleRect.top + marginTop];
    this.innerDims = [eleRect.width - paddingWidth, eleRect.height - paddingHeight];
    // TODO: This only happens to work because columms (horizontal) are in a flexbox
    // so the margin is counted on both sides, and cards (vertical) are not so the margin
    // is only "counted" on one side. The droppable should account for this instead.
    this.dims = [eleRect.width + marginWidth, eleRect.height + marginHeight / 2];
    this.context.beginDrag(e, this);
    this.setState({ dragging: true });
    document.addEventListener("touchend", this.endDrag);
  };
  endDrag = () => {
    if (this.innerRef.current) {
      const style = this.innerRef.current.style;
      style.transform = null;
      style.left = null;
      style.top = null;
    }
    this.cancelEvents();
    if (!this.state.dragging) return;
    this.context.endDrag(this);
    if (this.unmounting) return;
    this.setState({ dragging: false, style: null });
  };
  onMouseDown = (e: MouseEvent) => {
    this.startingDrag = true;
    const fakeE = { ...e };
    this.touchTimer = setTimeout(() => this.beginDrag(fakeE), 300);
    document.addEventListener("mouseup", this.endDrag);
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
    const fakeE = {
      clientX: e.touches[0].clientX,
      clientY: e.touches[0].clientY,
      type: "touchstart"
    };
    this.touchTimer = setTimeout(() => this.beginDrag(fakeE), 200);
  };
  rotation = 0;
  draggingUpdate = () => {
    if (this.unmounting) return;
    const mouse = this.mouse;
    this.rotation = this.rotation * 0.9 + rotationCurve(mouse[0] - this.lastX, 0.15);
    this.lastX = mouse[0];
    const transform = `rotate(${this.rotation}deg)`;
    if (this.innerRef.current) {
      const style = this.innerRef.current.style;
      style.transform = transform;
      style.left = `${mouse[0] - this.mouseOffset[0]}px`;
      style.top = `${mouse[1] - this.mouseOffset[1]}px`;
    }
    this.animFrame = requestAnimationFrame(this.draggingUpdate);
  };
  draggingOverDebounce = false;
  render = () => {
    this.context.registerDraggable(this.props.index, this);
    let notDraggingStyle: any = { draggable: false };
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
    let style = this.state.dragging
      ? {
          pointerEvents: "none",
          position: "fixed",
          zIndex: "9999",
          width: `${this.innerDims[0]}px`,
          height: `${this.innerDims[1]}px`
        }
      : notDraggingStyle;
    return this.props.children(
      {
        dragHandleProps: {
          "data-drag-handle": 0,
          onMouseDown: this.onMouseDown,
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
