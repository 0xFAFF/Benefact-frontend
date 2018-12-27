import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PortalWithState } from "react-portal";
import NavbarPopup from "./NavbarPopup";

class NavbarItem extends React.Component {
  state = {
    left: null
  };
  render() {
    const {
      icon,
      title,
      liClassName,
      component,
      params,
      id,
      activePopup,
      handleActivePopup
    } = this.props;
    return (
      <PortalWithState>
        {({ openPortal, closePortal, isOpen, portal }) => {
          const handleOnClose = () => {
            closePortal();
            handleActivePopup();
          };
          return (
            <React.Fragment>
              <li
                className={`${liClassName ? liClassName : ""}${
                  id === activePopup ? "active-li" : ""
                }`}
                onClick={e => {
                  if (!isOpen) {
                    const left = e.nativeEvent.clientX - e.nativeEvent.offsetX;
                    openPortal();
                    handleActivePopup(id);
                    this.setState({ left });
                  }
                }}
              >
                {icon && <FontAwesomeIcon icon={icon} size="lg" />}
                <span>{title}</span>
                {portal(
                  <NavbarPopup
                    top={this.state.top}
                    left={this.state.left}
                    onClose={handleOnClose}
                    component={component}
                    params={params}
                  />
                )}
              </li>
            </React.Fragment>
          );
        }}
      </PortalWithState>
    );
  }
}

export default NavbarItem;
