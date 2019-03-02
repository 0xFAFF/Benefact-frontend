import React from "react";
import { NavbarList } from "../../UI/Navbar/components";
import { Profile } from "./components";
import "./index.scss";

class User extends React.Component {
  render() {
    const configs = [
      {
        id: "menu",
        ulClassName: "menu",
        options: [
          {
            id: "placeholder",
            liClassName: "placeholder"
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
            liClassName: "user",
            url: "/user"
          },
          {
            id: "logout",
            // title: "Logout",
            icon: "sign-out-alt",
            // component: Logout,
            modal: true
            // params: {
            //   onLogoutHandler: onLogoutHandler
            // }
          }
        ]
      }
    ];
    return (
      <div id="user">
        <NavbarList configs={configs} />
        <div id="user-container">
          <Profile />
        </div>
      </div>
    );
  }
}

export default User;
