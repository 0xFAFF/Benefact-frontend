import React from "react";
import NavbarItem from "./NavbarItem";
import { Create, View } from "./components";
import "./index.scss";

class Navbar extends React.Component {
  state = {
    activePopup: null
  };

  handleActivePopup = (id = null) => {
    this.setState({ activePopup: id });
  };

  render() {
    const configs = [
      {
        ulClassName: "menu",
        options: [
          {
            title: "Home",
            icon: "home"
          },
          {
            title: "Menu",
            icon: "bars"
          },
          {
            title: "Benefact Faff",
            liClassName: "brand"
          },
          {
            title: "User",
            icon: "user-circle"
          }
        ]
      },
      {
        ulClassName: "sub-menu",
        options: [
          {
            title: "Create",
            icon: "plus",
            component: Create,
            params: {
              popupStyle: {
                width: "300px"
              },
              addNewColumn: this.props.addNewColumn,
              addNewTag: this.props.addNewTag,
              addNewCard: this.props.addNewCard,
              cardMap: this.props.cardMap
            }
          },
          {
            title: "Delete",
            icon: "trash"
          },
          {
            title: "Filter",
            icon: "filter"
          },
          {
            title: "View",
            icon: "list-ul",
            component: View,
            params: {
              popupStyle: {
                width: "200px"
              },
              handleBoardView: this.props.handleBoardView,
              view: this.props.view
            }
          }
        ]
      }
    ];
    return (
      <div id="navbar">
        {configs.map((ulItem, index) => {
          const { ulClassName, options } = ulItem;
          return (
            <ul key={index} className={ulClassName}>
              {options.map((item, index) => (
                <NavbarItem
                  {...item}
                  key={ulClassName + index}
                  id={ulClassName + index}
                  activePopup={this.state.activePopup}
                  handleActivePopup={this.handleActivePopup}
                />
              ))}
            </ul>
          );
        })}
      </div>
    );
  }
}

export default Navbar;
