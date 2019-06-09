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

interface Props {
  panels?: Array<Panel>;
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

  render() {
    const { panels = [], className = "" } = this.props;

    const accordionClassName = "flex col " + className;

    // TODO: Update to render props pattern to expose an onclick handler for title child component
    return (
      <div className="accordion">
        {panels.map(({ title, content }, index) => {
          return (
            <AccordionPanel
              key={index}
              className={accordionClassName}
              title={title}
              content={content}
              handleTitleClick={this.handleTitleClick}
              index={index}
              active={this.isIndexActive(index)}
            />
          );
        })}
      </div>
    );
  }
}

export default Accordion;
