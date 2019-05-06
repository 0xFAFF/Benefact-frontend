import React from "react";
import { NavbarList } from "./components";
import { PageProp } from "components/Pages/PageContext";
import "./index.scss";

class Navbar extends React.Component {
  onItemClick = (id, navbarRowId) => {
    const {
      configs,
      page: { showModal, closeModal }
    } = this.props;
    const configOptions = configs[navbarRowId];
    const item = configOptions.length > 0 ? configOptions.find(item => item.id === id) : null;
    if (item && item.onClick) item.onClick();
    else {
      showModal(<item.component onClose={closeModal} {...item.params} />);
    }
  };

  render() {
    return (
      <div id="navbar">
        <NavbarList
          configs={this.props.configs || []}
          onItemClick={this.onItemClick}
        />
      </div>
    );
  }
}

export default PageProp(Navbar);
