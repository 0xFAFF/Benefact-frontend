import React, { Component, Fragment } from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
  handleTitleClick(index: number): any;
  active?: boolean;
  index: number;
}

class AccordionContent extends Component<Props> {
  render() {
    const { handleTitleClick, className, children, index } = this.props;
    return (
      <div className={"grow flex " + className} onClick={() => handleTitleClick(index)}>
        {children}
      </div>
    );
  }
}

export default AccordionContent;
