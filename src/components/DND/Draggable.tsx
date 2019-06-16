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
  pos = [0, 0];
  startingDrag = false;
  lastX = 0;
  animFrame = 0;
  unmounting = false;
  componentWillUnmount = () => {
    this.unmounting = true;
  };
  globalOnMouseMove = (e: MouseEvent) => {
    if (e.buttons === 0) this.endDrag();
    this.mouse = [e.x, e.y];
  };
  onMouseMove = (e: MouseEvent) => {
    if(e.buttons === 0) this.startingDrag = false;
    if (!this.startingDrag) return;
    const pos = [e.clientX, e.clientY];
    if (dist(this.startMouse, pos) > 10) {
      this.beginDrag(e);
    }
  };
  //TODO: Catch begin drags that quickly leave client rectangle
  onMouseLeave = (e: MouseEvent) => {};
  beginDrag = (e: MouseEvent) => {
    if (this.unmounting) return;
    this.startingDrag = false;
    if (this.context.dragging != null || this.innerRef.current === null) return;
    this.context.beginDrag(this);
    const ele = this.innerRef.current;
    this.lastX = e.clientX;
    this.dims = [ele.clientWidth, ele.clientHeight];
    this.pos = [ele.offsetLeft, ele.offsetTop];
    this.mouse = [e.clientX, e.clientY];
    this.setState({ dragging: true });
    this.animFrame = requestAnimationFrame(this.draggingUpdate);
    document.addEventListener("mousemove", this.globalOnMouseMove);
  };
  endDrag = () => {
    cancelAnimationFrame(this.animFrame);
    document.removeEventListener("mouseup", this.endDrag);
    document.removeEventListener("mousemove", this.globalOnMouseMove);
    if(!this.state.dragging) return;
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
  draggingUpdate = () => {
    if (this.unmounting) return;
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
    this.animFrame = requestAnimationFrame(this.draggingUpdate);
  };
  render = () => {
    this.context.registerDraggable(this.props.index, this);
    let dragOverStyle: any = {
      transition: "transform 0.3s cubic-bezier(0.25, 0.75, 0, 1) 0s"
    };
    if (this.context.draggingOver && this.context.firstAfterIndex <= this.props.index)
      dragOverStyle.transform = `translate(${this.context.dragOverShuffle[0]}px, ${
        this.context.dragOverShuffle[1]
      }px)`;
    const style = this.state.dragging ? this.state.style : dragOverStyle;
    return this.props.children(
      {
        dragHandleProps: {
          "data-drag-handle": 0,
          onMouseDown: this.onMouseDown,
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