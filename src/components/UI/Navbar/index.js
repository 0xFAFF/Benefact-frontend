import React from "react";
import PropTypes from "prop-types";
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
    const { showModal, closeModal } = this.props.page;
    const configRowIndex = this.configs.findIndex(row => row.id === navbarRowId);
    const configRowOptions =
      configRowIndex > -1 ? get(this.configs, `[${configRowIndex}].options`) : [];
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
      view,
      filters,
      resetFilters,
      onChangeFilterHandler,
      selectFilters,
      createFilterGroup,
      updateFilterGroupIndex,
      onLogoutHandler,
      filtersActive,
      page: { hasPrivilege, isLoading, data, history }
    } = this.props;
    this.configs = [
      {
        id: "menu",
        ulClassName: "menu",
        options: [
          {
            id: "create",
            tooltip: "Create",
            hide: !hasPrivilege("contribute|developer"),
            icon: "plus-circle",
            component: AddCard,
            params: {
              addComponent: addComponent,
              columns: columns,
              disableComponents: true
            }
          },
          {
            id: "delete",
            tooltip: "Delete",
            hide: !hasPrivilege("admin"),
            icon: "minus-circle",
            component: Delete,
            params: {
              deleteComponent: deleteComponent,
              cards: allCards,
              columns: columns,
              tags: tags
            }
          },
          {
            id: "filter",
            tooltip: "Filter",
            title: filtersActive ? <FilterView resetFilters={resetFilters} /> : null,
            icon: "filter",
            component: Filter,
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
            tooltip: "View",
            icon: view === "kanban" ? "list-ul" : "columns",
            onClick: () => history.push(`/board/${data.urlName}/${view === "kanban" ? "list" : ""}`)
          },
          {
            id: "brand",
            title: data && data.title,
            image: "/fafficon.ico",
            liClassName: `brand${filtersActive ? " active-filter" : ""}`
          },
          {
            id: "home",
            tooltip: "Home",
            icon: "home"
          },
          {
            id: "menu",
            tooltip: "Menu",
            icon: "bars"
          },
          {
            id: "user",
            tooltip: "User",
            icon: "user-circle",
            url: "/user"
          },
          {
            id: "logout",
            tooltip: "Logout",
            icon: "sign-out-alt",
            component: Logout,
            params: {
              onLogoutHandler: onLogoutHandler
            }
          }
        ]
      }
    ];

    return (
      <div id="navbar">
        <NavbarList configs={isLoading ? [] : this.configs} onItemClick={this.onItemClick} />
      </div>
    );
  }
}

export default PageProp(Navbar);
