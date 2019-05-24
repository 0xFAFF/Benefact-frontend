import React from "react";
import { NavbarList, NavbarContainer } from "./components";
import "./index.scss";
import { Modal } from "components/UI";

class Navbar extends React.Component {
  state = { modal: null, modalClassName: "" };
  onItemClick = (id, navbarRowId) => {
    const {
      configs: { listConfig = [] }
    } = this.props;
    const configOptions = listConfig[navbarRowId];
    const item = configOptions.length > 0 ? configOptions.find(item => item.id === id) : null;
    if (item && item.onClick) item.onClick();
    else this.setState({ modal: item, modalClassName: item.modalClassName || "" });
  };
  modalClose = () => this.setState({ modal: null, modalClassName: "" });
  render() {
    return (
      <div id="navbar">
        <NavbarList configs={this.props.configs || []} onItemClick={this.onItemClick} />
        {this.state.modal && (
          <Modal isOpen onClose={this.modalClose} modalClassName={this.state.modalClassName}>
            <NavbarContainer
              onClose={this.modalClose}
              {...this.state.modal.params}
              component={this.state.modal.component}
              componentHeader={this.state.modal.componentHeader}
              navbarStyle={this.state.modal.navbarStyle}
            />
          </Modal>
        )}
      </div>
    );
  }
}

export default Navbar;
