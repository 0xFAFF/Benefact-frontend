import React from "react";
import { NavbarList } from "../../components";

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
            id: "settings",
            // title: "Settings",
            icon: "cog"
          }
        ]
      }
    ];
    return (
      <div>
        <NavbarList configs={configs} />
        <div>Hello World</div>
      </div>
    );
  }
}

export default User;
