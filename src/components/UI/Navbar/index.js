import React from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { get } from "lodash";
import NavbarPopup from "./NavbarPopup";
import { Create, Delete, View, Filter, User } from "./components";
import "./index.scss";

const List = props => {
  const { configs, onItemClick, currItem } = props;

  return configs.map(ulItem => {
    const { ulClassName, options } = ulItem;
    return (
      <ul key={ulItem.id} className={ulClassName}>
        {options.map(item => {
          const { id, icon, image, title, liClassName = "" } = item;
          return (
            <li
              key={id}
              className={`${liClassName}${currItem === id ? "active-li" : ""}`}
              onClick={e => {
                if (liClassName !== "brand") onItemClick(id, ulItem.id);
              }}
            >
              {icon && <FontAwesomeIcon icon={icon} size="lg" />}
              {title ? <span>{title}</span> : null}
              {image && <img src={image} alt={image} width="45" height="45" />}
            </li>
          );
        })}
      </ul>
    );
  });
};

List.propTypes = {
  configs: PropTypes.array,
  onItemClick: PropTypes.func,
  currItem: PropTypes.string
};

class Navbar extends React.Component {
  static propTypes = {
    addComponent: PropTypes.func,
    deleteComponent: PropTypes.func,
    cards: PropTypes.object,
    columns: PropTypes.array,
    tags: PropTypes.array,
    handleBoardView: PropTypes.func,
    view: PropTypes.string,
    filters: PropTypes.object,
    resetFilters: PropTypes.func,
    onChangeFilterHandler: PropTypes.func,
    selectFilters: PropTypes.func,
    createFilterGroup: PropTypes.func,
    updateFilterGroupIndex: PropTypes.func
  };

  state = {
    currItem: null
  };

  onItemClick = (id, navbarRowId) => {
    this.setState({ currItem: id, currRow: navbarRowId });
  };

  cleanCurrentItem = () => {
    this.setState({ currItem: null, currRow: null });
  };

  render() {
    const {
      addComponent,
      deleteComponent,
      cards,
      columns,
      tags,
      handleBoardView,
      view,
      filters,
      resetFilters,
      onChangeFilterHandler,
      selectFilters,
      createFilterGroup,
      updateFilterGroupIndex
    } = this.props;
    const configs = [
      {
        id: "menu",
        ulClassName: "menu",
        options: [
          {
            id: "create",
            // title: "Create",
            icon: "plus",
            component: Create,
            modal: true,
            params: {
              popupStyle: {
                width: "300px"
              },
              addComponent: addComponent,
              cards: cards,
              columns: columns
            }
          },
          {
            id: "delete",
            // title: "Delete",
            icon: "trash",
            component: Delete,
            modal: true,
            params: {
              popupStyle: {
                width: "300px"
              },
              deleteComponent: deleteComponent,
              cards: cards,
              columns: columns,
              tags: tags
            }
          },
          {
            id: "filter",
            // title: "Filter",
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
            icon: "list-ul",
            component: View,
            modal: true,
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
            title: "Benefact",
            image: "fafficon.ico",
            liClassName: "brand"
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
            component: <User />
          },
          {
            id: "settings",
            // title: "Settings",
            icon: "cog"
          }
        ]
      }
    ];

    const configRowIndex = configs.findIndex(
      row => row.id === this.state.currRow
    );
    const configRowOptions =
      configRowIndex > -1 ? get(configs, `[${configRowIndex}].options`) : [];
    const item =
      configRowOptions.length > 1
        ? configRowOptions.find(item => item.id === this.state.currItem)
        : null;
    const component = item ? item["component"] : null;
    const params = item ? item["params"] : null;
    const modal = item ? item["modal"] : null;
    return (
      <div id="navbar">
        <div className="navbar-list">
          <List
            configs={configs}
            onItemClick={this.onItemClick}
            currItem={this.state.currItem}
          />
        </div>
        {modal && (
          <ReactModal
            isOpen={
              this.state.currItem && this.state.currRow && modal ? true : false
            }
            onRequestClose={this.cleanCurrentItem}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            shouldFocusAfterRender={false}
            className="nav-Modal"
            overlayClassName="nav-Overlay"
          >
            <div className="outer-container">
              <NavbarPopup
                onClose={this.cleanCurrentItem}
                component={component}
                params={params}
              />
            </div>
          </ReactModal>
        )}
        {!modal && this.state.currItem && this.state.currRow && component}
      </div>
    );
  }
}

export default Navbar;
