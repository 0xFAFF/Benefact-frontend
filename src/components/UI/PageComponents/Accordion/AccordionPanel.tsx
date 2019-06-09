import React, { Component } from "react";
import AccordionContent from "./AccordionContent";
import AccordionTitle from "./AccordionTitle";

interface Props {
  className?: string;
  title: {
    content?: React.ReactNode;
    className?: string;
  };
  content: {
    content?: React.ReactNode;
    className?: string;
  };
  handleTitleClick(index: number): any;
  active: boolean;
  index: number;
}

class AccordionPanel extends Component<Props> {
  render() {
    const {
      title: { content: titleContent, className: titleClassName },
      content: { content: contentContent, className: contentClassName },
      handleTitleClick,
      index,
      active,
      className
    } = this.props;
    return (
      <div className={className}>
        <AccordionTitle
          handleTitleClick={handleTitleClick}
          index={index}
          className={titleClassName}
        >
          {titleContent}
        </AccordionTitle>
        {active ? (
          <AccordionContent className={contentClassName}>{contentContent}</AccordionContent>
        ) : null}
      </div>
    );
  }
}

export default AccordionPanel;
