import React from "react";
import "./index.scss";

interface Props {
  className?: string;
  contentClassName?: string;
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
    const {
      menuTabs = [],
      className: providedClass,
      contentClassName: providedContentClassName,
      ...childProps
    } = this.props;
    const { activeIndex } = this.state;
    const ActiveComp = menuTabs[activeIndex].comp || null;
    const passedProps = menuTabs[activeIndex].props || {};
    let className = "two-section-menu";
    if (providedClass) className += " " + providedClass;
    let contentClassName = "content";
    if (providedContentClassName) contentClassName += " " + providedContentClassName;
    else className += " grow";
    return (
      <div className={className}>
        <div id="menu-tabs" className="wrap">
          {menuTabs.map(({ header }, index) => {
            return (
              <div
                key={index}
                className={`menu-tab flex center wrap ${index === activeIndex ? "active" : ""}`}
                id={header}
                onClick={() => this.setState({ activeIndex: index })}
              >
                {header}
              </div>
            );
          })}
        </div>
        <div className={contentClassName}>
          {ActiveComp && <ActiveComp {...passedProps} {...childProps} />}
        </div>
      </div>
    );
  };
}
