import React from "react";
import { DNDProps } from "components/DND";
import "./DND.scss";

const dist = (a: Array<number>, b: Array<number>) => {
  return Math.sqrt(a.map((v, i) => [v, b[i]]).reduce((t, v) => t + Math.pow(v[0] - v[1], 2), 0));
};

export class Draggable extends React.Component<DNDProps> {
  state = { dragging: false, style: null as {} | null };
  innerRef = React.createRef<HTMLElement>();
  startPosition = [0, 0];
  startingDrag = false;
  globalOnMouseMove = (e: MouseEvent) => {
    this.setState({
      style: {
        pointerEvents: "none",
        position: "fixed",
        zIndex: 9999,
        transform: `translate(${e.x - this.startPosition[0]}px, ${e.y - this.startPosition[1]}px)`
      }
    });
  };
  onMouseMove = (e: MouseEvent) => {
    if (!this.startingDrag) return;
    const pos = [e.clientX, e.clientY];
    if (dist(this.startPosition, pos) > 10) {
      this.beginDrag();
    }
  };
  beginDrag = () => {
    this.startingDrag = false;
    this.setState({ dragging: true });
    document.addEventListener("mousemove", this.globalOnMouseMove);
  };
  endDrag = () => {
    this.setState({ dragging: false, style: null });
    document.removeEventListener("mouseup", this.endDrag);
    document.removeEventListener("mousemove", this.globalOnMouseMove);
  };
  onMouseDown = (e: MouseEvent) => {
    this.startPosition = [e.clientX, e.clientY];
    this.startingDrag = true;
    document.addEventListener("mouseup", this.endDrag);
    requestAnimationFrame(this.anim);
    e.preventDefault();
  };
  anim = () => {
    requestAnimationFrame(this.anim);
  };
  render = () => {
    return this.props.children(
      {
        dragHandleProps: {
          "data-drag-handle": 0,
          style: this.state.style,
          onMouseDown: this.onMouseDown,
          onMouseMove: this.onMouseMove,
          draggable: false,
          ref: this.innerRef
        }
      },
      this.state
    );
  };
}

export default Draggable;
