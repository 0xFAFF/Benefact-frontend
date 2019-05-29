import React from "react";
import "./index.scss";

interface Props {
  menuTabs: Array<{ header: string; comp: React.ElementType; props?: any }>;
}

interface State {
  activeIndex: number;
}

export class TwoSectionMenu extends React.Component<Props, State> {
  state = {
    activeIndex: 0
  };
  render = () => {
    const { menuTabs = [], ...childProps } = this.props;
    const { activeIndex } = this.state;
    const ActiveComp = menuTabs[activeIndex].comp || null;
    const passedProps = menuTabs[activeIndex].props || {};
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
        <div id="content">{ActiveComp && <ActiveComp {...passedProps} {...childProps} />}</div>
      </div>
    );
  };
}