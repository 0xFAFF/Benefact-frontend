import React from "react";
import ReactDOM from "react-dom";
import TopDelete from "../Popup/TopDelete";
import "./index.scss";

const modalRoot = document.getElementById("modal-root");

class Modal extends React.Component {
  el = document.createElement("div");
  componentDidMount() {
    modalRoot.appendChild(this.el);
  }
  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }
  render() {
    return ReactDOM.createPortal(
      <div className="outer-container">
        <div className="inner-container">
          <div id="modal-container">
            <TopDelete onClick={this.props.onClose} />
            <div className="inner-content">{this.props.children}</div>
          </div>
        </div>
      </div>,
      this.el
    );
  }
}

export default Modal;
