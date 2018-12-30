import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PortalWithState } from "react-portal";
import NavbarPopup from "./NavbarPopup";

class NavbarItem extends React.Component {
  constructor(props) {
    super(props);
    this.liRef = React.createRef();
    this.state = {
      left: null,
      top: null
    };
  }
  render() {
    const {
      icon,
      title,
      shift,
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
                ref={this.liRef}
                className={`${liClassName ? liClassName : ""}`}
                onClick={e => {
                  const liHeight = this.liRef.current.getBoundingClientRect()
                    .bottom;
                  const liWidthCenter =
                    this.liRef.current.getBoundingClientRect().x +
                    this.liRef.current.getBoundingClientRect().width / 2;
                  const mouseClickY = e.nativeEvent.y;
                  if (
                    (isOpen && mouseClickY < liHeight) ||
                    mouseClickY < this.liRef.current.getBoundingClientRect().y
                  ) {
                    handleActivePopup(id);
                    closePortal();
                  }
                  if (!isOpen) {
                    const leftShift = shift ? shift : 30;
                    const left = liWidthCenter - leftShift;
                    const top = this.liRef.current.getBoundingClientRect()
                      .bottom;
                    openPortal();
                    handleActivePopup(id);
                    this.setState({ left, top });
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
