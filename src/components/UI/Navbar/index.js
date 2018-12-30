import React from "react";
import NavbarItem from "./NavbarItem";
import { Create, Delete, View } from "./components";
import "./index.scss";

class Navbar extends React.Component {
  state = {
    activePopup: []
  };

  handleActivePopup = id => {
    const idIndex = this.state.activePopup.findIndex(e => e === id);
    if (idIndex > -1) {
      let activePopup = [...this.state.activePopup];
      activePopup.splice(idIndex, 1);
      this.setState({ activePopup });
    } else {
      this.setState({ activePopup: [...this.state.activePopup, id] });
    }
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
            icon: "user-circle",
            shift: 200
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
            icon: "trash",
            component: Delete,
            params: {
              popupStyle: {
                width: "300px"
              },
              deleteComponent: this.props.deleteComponent,
              columns: this.props.columns,
              cardMap: this.props.cardMap,
              tags: this.props.tags
            }
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
