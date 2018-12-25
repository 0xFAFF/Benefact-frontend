import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PortalWithState } from "react-portal";
import NavbarPopup from "./NavbarPopup";

class NavbarItem extends React.Component {
  state = {
    left: null
  };
  render() {
    const { icon, title, liClassName, component, params } = this.props;
    return (
      <PortalWithState closeOnEsc>
        {({ openPortal, closePortal, isOpen, portal }) => (
          <React.Fragment>
            <li
              className={liClassName}
              onClick={e => {
                if (!isOpen) {
                  const left = e.nativeEvent.clientX - e.nativeEvent.offsetX;
                  openPortal(e);
                  this.setState({
                    left: left
                  });
                }
              }}
            >
              {icon && <FontAwesomeIcon icon={icon} size="lg" />}
              <span>{title}</span>
              {portal(
                <NavbarPopup
                  top={this.state.top}
                  left={this.state.left}
                  onClose={closePortal}
                  component={component}
                  params={params}
                />
              )}
            </li>
          </React.Fragment>
        )}
      </PortalWithState>
    );
  }
}

export default NavbarItem;
