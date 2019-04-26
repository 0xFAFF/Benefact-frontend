import React from "react";
import PropTypes from "prop-types";
import { Modal, FilterView } from "../../UI";
import { get } from "lodash";
import { NavbarPopup, NavbarList, Create, Delete, View, Filter, Logout } from "./components";
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

  state = {
    currItem: null
  };

  onItemClick = (id, navbarRowId) => {
    const configRowIndex = this.configs.findIndex(row => row.id === navbarRowId);
    const configRowOptions = configRowIndex > -1 ? get(this.configs, `[${configRowIndex}].options`) : [];
    const item = configRowOptions.length > 1 ? configRowOptions.find(item => item.id === id) : null;
    if (item.onClick) item.onClick();
    else this.setState({ currItem: item });
  };

  cleanCurrentItem = () => {
    this.setState({ currItem: null });
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
            component: Create,
            modal: true,
            params: {
              popupStyle: {
                width: "300px"
              },
              addComponent: addComponent,
              columns: columns
            }
          },
          {
            id: "delete",
            // title: "Delete",
            icon: "minus-circle",
            component: Delete,
            modal: true,
            params: {
              popupStyle: {
                width: "300px"
              },
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
              popupStyle: {
                width: "300px"
              },
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
    const item = this.state.currItem;
    const component = item ? item["component"] : null;
    const params = item ? item["params"] : null;
    const modal = item ? item["modal"] : null;

    return (
      <div id="navbar">
        <NavbarList
          configs={this.configs}
          onItemClick={this.onItemClick}
          currItem={this.state.currItem && this.state.currItem.id}
        />
        {modal && (
          <Modal
            isOpen={Boolean(this.state.currItem && modal)}
            onClose={this.cleanCurrentItem}
            innerCnterClassName="nav-inner-container"
          >
            <div className="outer-container">
              <NavbarPopup onClose={this.cleanCurrentItem} component={component} params={params} />
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

export default Navbar;
