import React from "react";
import { DNDProps } from "components/DND";
import "./DND.scss";
import { ReactContext } from "components/DND/DragDropContext";
const rotationCurve = (x: number, c: number) =>
  Math.pow(Math.sin(Math.min(Math.PI / 2, Math.abs(x * c))), 2) * Math.sign(x);
const dist = (a: Array<number>, b: Array<number>) => {
  return Math.sqrt(a.map((v, i) => [v, b[i]]).reduce((t, v) => t + Math.pow(v[0] - v[1], 2), 0));
};

export class Draggable extends React.Component<DNDProps> {
  static contextType = ReactContext;
  context!: React.ContextType<typeof ReactContext>;
  state = { dragging: false, style: null as {} | null, rotation: 0 };
  innerRef = React.createRef<HTMLElement>();
  startMouse = [0, 0];
  mouse = [0, 0];
  dims = [0, 0];
  pos = [0, 0];
  startingDrag = false;
  lastX = 0;
  animFrame = 0;
  globalOnMouseMove = (e: MouseEvent) => {
    if (e.buttons === 0) this.endDrag();
    this.mouse = [e.x, e.y];
  };
  onMouseMove = (e: MouseEvent) => {
    if (!this.startingDrag) return;
    const pos = [e.clientX, e.clientY];
    if (dist(this.startMouse, pos) > 10) {
      this.beginDrag(e);
    }
  };
  beginDrag = (e: MouseEvent) => {
    if (this.innerRef.current === null) return;
    this.context.beginDrag(this);
    const ele = this.innerRef.current;
    this.startingDrag = false;
    this.lastX = e.clientX;
    this.dims = [ele.clientWidth, ele.clientHeight];
    this.pos = [ele.offsetLeft, ele.offsetTop];
    this.setState({ dragging: true });
    this.animFrame = requestAnimationFrame(this.anim);
    document.addEventListener("mousemove", this.globalOnMouseMove);
  };
  endDrag = () => {
    this.context.endDrag(this);
    cancelAnimationFrame(this.animFrame);
    this.setState({ dragging: false, style: null });
    document.removeEventListener("mouseup", this.endDrag);
    document.removeEventListener("mousemove", this.globalOnMouseMove);
  };
  onMouseDown = (e: MouseEvent) => {
    this.startMouse = [e.clientX, e.clientY];
    this.startingDrag = true;
    document.addEventListener("mouseup", this.endDrag);
    e.preventDefault();
  };
  anim = () => {
    let rotation = this.state.rotation * 0.9 + rotationCurve(this.mouse[0] - this.lastX, 0.15);
    this.lastX = this.mouse[0];
    const transform =
      `translate(${this.mouse[0] - this.startMouse[0]}px, ${this.mouse[1] -
        this.startMouse[1]}px)` + ` rotate(${rotation}deg)`;
    this.setState({
      rotation,
      style: {
        pointerEvents: "none",
        position: "fixed",
        zIndex: 9999,
        transform,
        left: `${this.pos[0]}px`,
        top: `${this.pos[1]}px`,
        width: `${this.dims[0]}px`,
        height: `${this.dims[1]}px`
      }
    });
    this.animFrame = requestAnimationFrame(this.anim);
  };
  render = () => {
    return this.props.children(
      {
        dragHandleProps: {
          "data-drag-handle": 0,
          onMouseDown: this.onMouseDown,
          onMouseMove: this.onMouseMove,
          draggable: false
        },
        draggableProps: {
          style: this.state.style,
          ref: this.innerRef
        }
      },
      this.state
    );
  };
}

export default Draggable;
