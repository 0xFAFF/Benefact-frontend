import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

const NavbarContainer = ({ onClose, component: Component, componentHeader, ...navbarParams }) => (
  <div id="navbar-container">
    {componentHeader ? (
      <div className="navbar-header flex center">
        <h2>{componentHeader}</h2>
      </div>
    ) : null}
    {Component ? <Component onClose={onClose} {...navbarParams} /> : null}
  </div>
);

export default NavbarContainer;

NavbarContainer.propTypes = {
  params: PropTypes.object,
  onClose: PropTypes.func,
  component: PropTypes.element
};
