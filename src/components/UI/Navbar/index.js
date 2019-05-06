import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { NavbarList } from "./components";
import { PageProp } from "components/Pages/PageContext";
import "./index.scss";

class Navbar extends React.Component {
  static propTypes = {
    addComponent: PropTypes.func,
    deleteComponent: PropTypes.func,
    allCards: PropTypes.array,
    columns: PropTypes.array,
    tags: PropTypes.array,
    handleBoardView: PropTypes.func,
    view: PropTypes.string,
    filters: PropTypes.object,
    resetFilters: PropTypes.func,
    onChangeFilterHandler: PropTypes.func,
    selectFilters: PropTypes.func,
    createFilterGroup: PropTypes.func,
    updateFilterGroupIndex: PropTypes.func,
    onLogoutHandler: PropTypes.func,
    filtersActive: PropTypes.bool
  };

  onItemClick = (id, navbarRowId) => {
    const {
      configs,
      page: { showModal, closeModal }
    } = this.props;
    const configOptions = get(configs, `options.[${navbarRowId}]`, []);
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
          configs={this.props.page.isLoading ? {} : this.props.configs}
          onItemClick={this.onItemClick}
        />
      </div>
    );
  }
}

export default PageProp(Navbar);
