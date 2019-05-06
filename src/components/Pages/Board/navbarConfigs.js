import React from "react";
import { FilterView } from "components/UI";
import { Delete, Filter, Logout } from "components/UI/Navbar/components";
import { AddCard } from "components/UI/AddComponents";

export const navbarConfigs = child => props => ({
  id: "menu",
  ulClassName: "menu",
  options: [
    [
      {
        id: "create",
        tooltip: "Create",
        hide: !props.hasPrivilege("contribute|developer"),
        icon: "plus-circle",
        component: AddCard,
        params: {
          addComponent: child.addComponent,
          columns: props.data.columns,
          disableComponents: true
        }
      },
      {
        id: "delete",
        tooltip: "Delete",
        hide: !props.hasPrivilege("admin"),
        icon: "minus-circle",
        component: Delete,
        params: {
          deleteComponent: child.deleteComponent,
          cards: props.data.allCards,
          columns: props.data.columns,
          tags: props.data.tags
        }
      },
      {
        id: "filter",
        tooltip: "Filter",
        title:
          props.data.filters && props.data.filters.active ? (
            <FilterView resetFilters={child.resetFilters} />
          ) : null,
        icon: "filter",
        component: Filter,
        params: {
          updateFilterGroupIndex: child.updateFilterGroupIndex,
          createFilterGroup: child.createFilterGroup,
          resetFilters: child.resetFilters,
          onChangeFilterHandler: child.onChangeFilterHandler,
          selectFilters: child.selectFilters,
          columns: props.data.columns,
          tags: props.data.tags,
          filters: props.data.filters
        }
      },
      {
        id: "view",
        tooltip: "View",
        icon: props.view === "kanban" ? "list-ul" : "columns",
        onClick: () => {
          console.log(props);
          props.history.push(
            `/board/${props.data.urlName}/${props.view === "kanban" ? "list" : ""}`
          );
        }
      }
    ],
    [
      {
        id: "brand",
        title: props.data && props.data.title,
        image: "/fafficon.ico",
        liClassName: `brand${
          props.data.filters && props.data.filters.active ? " active-filter" : ""
        }`
      }
    ],
    [
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
        onClick: () => props.history.push("/user")
      },
      {
        id: "logout",
        tooltip: "Logout",
        icon: "sign-out-alt",
        component: Logout,
        params: {
          onLogoutHandler: props.onLogoutHandler
        }
      }
    ]
  ]
});
