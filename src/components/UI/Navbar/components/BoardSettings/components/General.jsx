import React from "react";
import { SectionContent } from "../components";

export const General = props => {
  const sectionConfigs = [
    {
      uid: "description",
      header: "Description",
      content: <input name="description" />
    },
    {
      uid: "defaultPrivilege",
      header: "Default Privilege"
    },
    {
      uid: "create_board_link",
      header: "Board Invite Link"
    }
  ];

  return (
    <>
      {sectionConfigs.map(section => (
        <SectionContent key={section.uid} {...section} {...props} />
      ))}
    </>
  );
};
