import React from "react";
import { Delete, FilterView } from "components/UI/Navbar/components";
import { AddCard } from "components/UI/AddComponents";
import { Filter } from "components/UI/BoardComponents/Filter";

export const navbarConfigs = (child, props) => {
  const {
    view,
    page: { data, hasPrivilege, history, filters }
  } = props;
  if (!data) return {};
  return {
    title: data.title,
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
          filters ? (
            <FilterView
              resetFilters={() => {
                props.page.updatePage({ filters: null }, props.page.refreshData);
              }}
            />
          ) : null,
        icon: "filter",
        component: Filter,
        params: {
          updateFilterGroupIndex: child.updateFilterGroupIndex,
          createFilterGroup: child.createFilterGroup,
          onChangeFilterHandler: child.onChangeFilterHandler,
          columns: data.columns,
          tags: data.tags,
          filters: filters
        }
      },
      {
        id: "create",
        tooltip: "Create",
        hide: !hasPrivilege("contribute|developer"),
        icon: "plus-circle",
        component: AddCard,
        params: {
          handleUpdate: child.handleUpdate,
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
          handleUpdate: child.handleUpdate,
          cards: data.allCards,
          columns: data.columns,
          tags: data.tags
        }
      }
    ]
  };
};
