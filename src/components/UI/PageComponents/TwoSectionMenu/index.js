import React from "react";
import "./index.scss";

export const TwoSectionMenu = props => {
  const { menuTabs = [], activeMenu, handleActiveMenu } = props;
  return (
    <div id="two-section-menu" className="flex grow">
      <div id="menu-tabs">
      {menuTabs.map(({ uid, header }) => {
        return (
          <React.Fragment key={uid}>
            <div
              className={`menu-tab ${uid === activeMenu ? "active" : ""}`}
              id={header}
              onClick={() => handleActiveMenu(uid)}
            >
              {header}
            </div>
          </React.Fragment>
        );
      })}
      </div>
      <div id="content">
        {props.children}
      </div>
    </div>
  )
}