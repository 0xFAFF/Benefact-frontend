import React from "react";
import { ContentSection } from "../content";

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
        <ContentSection key={section.uid} {...section} {...props} />
      ))}
    </>
  );
};
