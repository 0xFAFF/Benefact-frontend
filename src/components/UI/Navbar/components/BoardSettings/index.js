import React from "react";
import { TwoSectionMenu } from "components/UI/PageComponents";
import { General, Columns, Tags } from "./content";
import "./index.scss";
import { PageProp } from "components/Pages/PageContext";

export const BoardSettings = PageProp(props => {
  const menuTabs = [
    {
      header: "General",
      comp: General
    },
    {
      header: "Columns",
      comp: Columns
    },
    {
      header: "Tags",
      comp: Tags
    }
  ];
  return (
    <div id="board-settings" className="flex col">
      <TwoSectionMenu menuTabs={menuTabs} {...props} />
    </div>
  );
});
