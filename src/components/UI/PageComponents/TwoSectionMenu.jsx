import React from "react";
import "./TwoSectionMenu.scss";

class TwoSectionMenu extends React.Component {
  state = {
    activeIndex: 0
  };
  render = () => {
    const { menuTabs = [], ...childProps } = this.props;
    const { activeIndex } = this.state;
    const ActiveComp = menuTabs[activeIndex].comp;
    return (
      <div id="two-section-menu" className="flex grow">
        <div id="menu-tabs">
          {menuTabs.map(({ header }, index) => {
            return (
              <div
                key={index}
                className={`menu-tab ${index === activeIndex ? "active" : ""}`}
                id={header}
                onClick={() => this.setState({ activeIndex: index })}
              >
                {header}
              </div>
            );
          })}
        </div>
        <div id="content">
          <ActiveComp {...childProps}/>
        </div>
      </div>
    );
  };
}

export default TwoSectionMenu;
