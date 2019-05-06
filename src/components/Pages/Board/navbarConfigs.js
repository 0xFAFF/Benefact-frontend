import React from "react";
import { FilterView } from "components/UI";
import { Delete, Filter } from "components/UI/Navbar/components";
import { AddCard } from "components/UI/AddComponents";

export const navbarConfigs = (child, props) => {
  const {
    view,
    page: { data, hasPrivilege, history }
  } = props;
  return {
    title: data.Title,
    buttons: [
      {
        id: "view",
        tooltip: "View",
        icon: view === "kanban" ? "list-ul" : "columns",
        onClick: () => {
          history.push(`/board/${data.urlName}/${view === "kanban" ? "list" : ""}`);
        }
      },
      {
        id: "filter",
        tooltip: "Filter",
        title:
          data.filters && data.filters.active ? (
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
          columns: data.columns,
          tags: data.tags,
          filters: data.filters
        }
      },
      {
        id: "create",
        tooltip: "Create",
        hide: !hasPrivilege("contribute|developer"),
        icon: "plus-circle",
        component: AddCard,
        params: {
          addComponent: child.addComponent,
          columns: data.columns,
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
          deleteComponent: child.deleteComponent,
          cards: data.allCards,
          columns: data.columns,
          tags: data.tags
        }
      }
    ]
  };
};
