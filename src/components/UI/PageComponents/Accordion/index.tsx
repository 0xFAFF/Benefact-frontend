import React, { Component } from "react";
import { includes, without } from "lodash";
import AccordionPanel from "./AccordionPanel";

interface Panel {
  title: {
    content?: React.ReactNode;
    className?: string;
  };
  content: {
    content?: React.ReactNode;
    className?: string;
  };
}

type API = ReturnType<Accordion["getApi"]>;

interface Props {
  children: (api: API) => Array<Panel>;
  className?: string;
  exclusive?: boolean;
}

class Accordion extends Component<Props> {
  state = {
    activeIndex: (this.props.exclusive ? -1 : []) as any
  };

  computeNewIndex = (index: number) => {
    const { exclusive = true } = this.props;
    const { activeIndex } = this.state;

    if (exclusive) return index === activeIndex ? -1 : index;
    return includes(activeIndex, index) ? without(activeIndex, index) : [...activeIndex, index];
  };

  isIndexActive = (index: number) => {
    const { exclusive = true } = this.props;
    const { activeIndex } = this.state;
    return exclusive ? activeIndex === index : includes(activeIndex, index);
  };

  handleTitleClick = (index: number) => {
    this.setState({
      activeIndex: this.computeNewIndex(index)
    });
  };

  private getApi = () => {
    return {
      titleClick: this.handleTitleClick,
      isIndexActive: this.isIndexActive
    };
  };

  render() {
    const { children, className = "" } = this.props;
    const accordionClassName = "flex col " + className;

    return (
      <div className="accordion">
        {children(this.getApi()).map(({ title, content }, index) => {
          return (
            <AccordionPanel
              key={index}
              className={accordionClassName}
              title={title}
              content={content}
              active={this.isIndexActive(index)}
            />
          );
        })}
      </div>
    );
  }
}

export default Accordion;
