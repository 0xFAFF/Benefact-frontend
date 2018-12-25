import React from "react";
import NavbarItem from "./NavbarItem";
import { View } from "./components";
import "./index.scss";

class Navbar extends React.Component {
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
            title: "Benefact brand name",
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
            icon: "plus"
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
                <NavbarItem key={ulClassName + index} {...item} />
              ))}
            </ul>
          );
        })}
      </div>
    );
  }
}

export default Navbar;
