import React from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
          <div className="container">
            <div className="top-nav">
              <div style={{ cursor: "pointer" }}>
                <FontAwesomeIcon
                  icon="times"
                  size="lg"
                  onClick={this.props.onClose}
                />
              </div>
            </div>
            <div className="inner-content">{this.props.children}</div>
          </div>
        </div>
      </div>,
      this.el
    );
  }
}

export default Modal;
