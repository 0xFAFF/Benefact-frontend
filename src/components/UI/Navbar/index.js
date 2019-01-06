import React from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { get } from "lodash";
import NavbarPopup from "./NavbarPopup";
import { Create, Delete, View } from "./components";
import "./index.scss";

const List = props => {
  const { configs, onItemClick, currItem } = props;

  return configs.map(ulItem => {
    const { ulClassName, options } = ulItem;
    return (
      <ul key={ulItem.id} className={ulClassName}>
        {options.map(item => {
          const { id, icon, title, liClassName } = item;
          return (
            <li
              key={id}
              className={`${liClassName ? liClassName : ""} ${
                currItem === id ? "active-li" : ""
              }`}
              onClick={e => onItemClick(id, ulItem.id)}
            >
              {icon && <FontAwesomeIcon icon={icon} size="lg" />}
              {title ? <span>{title}</span> : null}
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
    cards: PropTypes.array,
    columns: PropTypes.array,
    tags: PropTypes.array,
    handleBoardView: PropTypes.func,
    view: PropTypes.string
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
      view
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
            icon: "filter"
          },
          {
            id: "view",
            // title: "View",
            icon: "list-ul",
            component: View,
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
            title: "Benefact Faff",
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
            icon: "user-circle"
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
    return (
      <div id="navbar">
        <List
          configs={configs}
          onItemClick={this.onItemClick}
          currItem={this.state.currItem}
        />
        <ReactModal
          isOpen={this.state.currItem && this.state.currRow ? true : false}
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
      </div>
    );
  }
}

export default Navbar;
