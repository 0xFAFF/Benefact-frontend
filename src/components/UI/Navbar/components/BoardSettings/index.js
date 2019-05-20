import React from "react";
import { TwoSectionMenu } from "components/UI/PageComponents";
import { General, Columns, Tags } from "./content";
import "./index.scss";

export const BoardSettings = props => {
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
      <div className="flex">
        <h1 className="center">Board Settings</h1>
      </div>
      <TwoSectionMenu menuTabs={menuTabs} {...props} />
    </div>
  );
};
