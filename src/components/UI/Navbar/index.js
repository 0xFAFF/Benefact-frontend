import React from "react";
import PropTypes from "prop-types";
import { Modal, FilterView } from "../../UI";
import { get } from "lodash";
import { NavbarPopup, NavbarList, Delete, View, Filter, Logout } from "./components";
import "./index.scss";
import { AddCard } from "components/UI/AddComponents";
import { PageProp } from "components/Pages/PageContext";

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

  state = {
    currItem: null
  };

  onItemClick = (id, navbarRowId) => {
    const { showModal, closeModal } = this.props.page;
    const configRowIndex = this.configs.findIndex(row => row.id === navbarRowId);
    const configRowOptions = configRowIndex > -1 ? get(this.configs, `[${configRowIndex}].options`) : [];
    const item = configRowOptions.length > 1 ? configRowOptions.find(item => item.id === id) : null;
    if (item.onClick) item.onClick();
    else {
      showModal(<item.component onClose={closeModal} {...item.params} />);
    }
  };

  render() {
    const {
      addComponent,
      deleteComponent,
      allCards,
      columns,
      tags,
      handleBoardView,
      view,
      filters,
      resetFilters,
      onChangeFilterHandler,
      selectFilters,
      createFilterGroup,
      updateFilterGroupIndex,
      onLogoutHandler,
      filtersActive
    } = this.props;
    this.configs = [
      {
        id: "menu",
        ulClassName: "menu",
        options: [
          {
            id: "create",
            // title: "Create",
            icon: "plus-circle",
            component: AddCard,
            modal: true,
            params: {
              addComponent: addComponent,
              columns: columns,
              disableComponents: true
            }
          },
          {
            id: "delete",
            // title: "Delete",
            icon: "minus-circle",
            component: Delete,
            modal: true,
            params: {
              deleteComponent: deleteComponent,
              cards: allCards,
              columns: columns,
              tags: tags
            }
          },
          {
            id: "filter",
            title: filtersActive ? <FilterView resetFilters={resetFilters} /> : null,
            icon: "filter",
            component: Filter,
            modal: true,
            params: {
              updateFilterGroupIndex: updateFilterGroupIndex,
              createFilterGroup: createFilterGroup,
              resetFilters: resetFilters,
              onChangeFilterHandler: onChangeFilterHandler,
              selectFilters: selectFilters,
              columns: columns,
              tags: tags,
              filters: filters
            }
          },
          {
            id: "view",
            // title: "View",
            icon: view === "kanban" ? "list-ul" : "columns",
            component: View,
            onClick: () => handleBoardView(view === "kanban" ? "list" : "kanban"),
            params: {
              popupStyle: {
                width: "200px"
              },
              handleBoardView: handleBoardView,
              view: view
            }
          },
          {
            id: "brand",
            title: this.props.title,
            image: this.props.title && "/fafficon.ico",
            liClassName: `brand${filtersActive ? " active-filter" : ""}`
          },
          {
            id: "home",
            // title: "Home",
            icon: "home"
          },
          {
            id: "menu",
            // title: "Menu",
            icon: "bars"
          },
          {
            id: "user",
            // title: "User",
            icon: "user-circle",
            modal: false,
            url: "/user"
          },
          {
            id: "logout",
            // title: "Logout",
            icon: "sign-out-alt",
            component: Logout,
            modal: true,
            params: {
              onLogoutHandler: onLogoutHandler
            }
          }
        ]
      }
    ];

    return (
      <div id="navbar">
        <NavbarList configs={this.configs} onItemClick={this.onItemClick} />
      </div>
    );
  }
}

export default PageProp(Navbar);
