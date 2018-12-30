import React from "react";
import TopDelete from "../Popup/TopDelete";
import { get } from "lodash";
import "./index.scss";

class NavbarPopup extends React.Component {
  escFunction = event => {
    if (event.keyCode === 27) {
      this.props.onClose();
    }
  };
  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  setPopupStyle = (style = null) => {
    if (style) {
      this.setState({
        style: { ...style }
      });
    } else {
      this.setState({
        style: { ...this.props.params.popupStyle }
      });
    }
  };

  state = { style: { ...get(this.props, "params.popupStyle", {}) } };
  render() {
    const style = {
      top: this.props.top,
      left: this.props.left
    };
    const { params = {}, onClose } = this.props;
    return (
      <div id="navbar-portal">
        <div className="portal-outer-container" style={{ top: style.top }}>
          <div
            id="navbar-popup"
            style={{ ...this.state.style, left: style.left }}
          >
            <TopDelete onClick={onClose} />
            <div />
            {this.props.component ? (
              <this.props.component
                setPopupStyle={this.setPopupStyle}
                {...params}
              />
            ) : (
              <div>No component hooked up</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default NavbarPopup;
