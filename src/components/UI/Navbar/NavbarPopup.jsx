import React from "react";
import TopDelete from "../Popup/TopDelete";
import { get } from "lodash";
import "./index.scss";

class NavbarPopup extends React.Component {
  setPopupStyle = (style = null) => {
    if (style) {
      this.setState({
        style: { ...style }
      });
    }
  };

  state = { style: { ...get(this.props, "params.popupStyle", {}) } };
  render() {
    const { params = {}, onClose } = this.props;
    return (
      <div id="navbar-portal">
        <div id="navbar-popup" style={{ ...this.state.style }}>
          <TopDelete onClick={onClose} />
          <div />
          {this.props.component ? (
            <this.props.component
              onClose={onClose}
              setPopupStyle={this.setPopupStyle}
              {...params}
            />
          ) : (
            <div>No component hooked up</div>
          )}
        </div>
      </div>
    );
  }
}

export default NavbarPopup;
