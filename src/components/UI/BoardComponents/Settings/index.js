import React from "react";
import { TwoSectionMenu } from "components/UI/PageComponents";
import { General, Columns, Tags, Invite } from "./content";
import "./index.scss";
import { PageProp } from "components/Pages/PageContext";

export const Settings = PageProp(props => {
  const menuTabs = [
    {
      header: "General",
      comp: General
    },
    {
      header: "Invite",
      comp: Invite
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
      <TwoSectionMenu className="grow vertical" menuTabs={menuTabs} {...props} />
    </div>
  );
});

export default Settings;
