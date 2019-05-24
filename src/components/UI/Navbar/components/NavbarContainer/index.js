import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

const NavbarContainer = ({
  onClose,
  component: Component,
  componentHeader,
  navbarStyle,
  ...compParams
}) => (
  <div id="navbar-container">
    {componentHeader ? (
      <div className="navbar-header flex center">
        <h2>{componentHeader}</h2>
      </div>
    ) : null}
    {Component ? (
      <div style={{ ...navbarStyle }}>
        <Component onClose={onClose} {...compParams} />
      </div>
    ) : null}
  </div>
);

export default NavbarContainer;

NavbarContainer.propTypes = {
  params: PropTypes.object,
  onClose: PropTypes.func,
  component: PropTypes.func
};
