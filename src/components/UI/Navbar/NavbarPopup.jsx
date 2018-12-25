import React from "react";
// import PropTypes from "prop-types";
import "./index.scss";

class NavbarPopup extends React.Component {
  render() {
    const navbarContainer = document.getElementsByClassName("sub-menu")[0];
    const style = {
      top: navbarContainer.getBoundingClientRect().bottom,
      left: this.props.left
    };
    return (
      <div id="navbar-portal">
        <div className="portal-outer-container" style={{ top: style.top }}>
          <div className="navbar-popup" style={{ left: style.left }}>
            {this.props.component ? (
              <this.props.component params={this.props.params} />
            ) : (
              <div>No component hooked up</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

// NavbarPopup.propTypes = {
//   top: PropTypes.number,
//   left: PropTypes.number,
//   closePortal: PropTypes.func
// };
export default NavbarPopup;
