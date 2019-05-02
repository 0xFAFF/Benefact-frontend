import React, { Component } from "react";
import "./index.scss";

class FileDrop extends Component {
  dropRef = React.createRef();
  dragCounter = 0;
  state = {
    isDragging: false
  };
  handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  handleDragIn = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    if (e.dataTransfer.files[0]) this.setState({ isDragging: true });
  };
  handleDragOut = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter > 0) return;
    this.setState({ isDragging: false });
  };
  handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter = 0;
    this.setState({ isDragging: false });
    if (this.props.onDrop && e.dataTransfer.files[0]) this.props.onDrop(e.dataTransfer.files[0]);
  };
  handlePaste = e => {
    console.log(e.clipboardData.files[0]);
    if (this.props.onDrop && e.clipboardData.files[0]) this.props.onDrop(e.clipboardData.files[0]);
  };
  componentDidMount() {
    let div = this.dropRef.current;
    div.addEventListener("dragenter", this.handleDragIn);
    div.addEventListener("dragleave", this.handleDragOut);
    div.addEventListener("dragover", this.handleDrag);
    div.addEventListener("drop", this.handleDrop);
    div.addEventListener("paste", this.handlePaste);
  }
  componentWillUnmount() {
    let div = this.dropRef.current;
    div.removeEventListener("dragenter", this.handleDragIn);
    div.removeEventListener("dragleave", this.handleDragOut);
    div.removeEventListener("dragover", this.handleDrag);
    div.removeEventListener("drop", this.handleDrop);
    div.removeEventListener("paste", this.handlePaste);
  }
  render() {
    return (
      <div ref={this.dropRef} style={{ position: "relative" }}>
        {this.state.isDragging ? (
          <div className="drag-overlay">
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: 0,
                left: 0,
                textAlign: "center",
                color: "grey",
                fontSize: 36
              }}
            >
              <div>{this.props.dropText || "Upload File"}</div>
            </div>
          </div>
        ) : null}
        {this.props.children}
      </div>
    );
  }
}

export default FileDrop;
