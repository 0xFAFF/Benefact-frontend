import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import "./index.scss";

class NavbarPopup extends React.Component {
  static propTypes = {
    params: PropTypes.object,
    onClose: PropTypes.func,
    component: PropTypes.func
  };

  state = { style: { ...get(this.props, "params.popupStyle", {}) } };
  render() {
    const { params = {}, onClose } = this.props;
    return (
      <div id="navbar-portal">
        <div id="navbar-popup" style={{ ...this.state.style }}>
          {this.props.component ? (
            <this.props.component
              onClose={onClose}
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
