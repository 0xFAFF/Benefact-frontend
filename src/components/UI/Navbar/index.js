import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { FilterView } from "../../UI";
import { get } from "lodash";
import { NavbarList, Delete, Filter, Logout } from "./components";
import { AddCard } from "components/UI/AddComponents";
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
    console.log(this.props);
    // const {
    //   addComponent,
    //   deleteComponent,
    //   allCards,
    //   columns,
    //   tags,
    //   handleBoardView,
    //   view,
    //   filters,
    //   resetFilters,
    //   onChangeFilterHandler,
    //   selectFilters,
    //   createFilterGroup,
    //   updateFilterGroupIndex,
    //   onLogoutHandler,
    //   filtersActive,
    //   page: { hasPrivilege, isLoading, data }
    // } = this.props;

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

export default withRouter(PageProp(Navbar));
