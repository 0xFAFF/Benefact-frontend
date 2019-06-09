import React, { Component, Fragment } from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
  active?: boolean;
}

class AccordionContent extends Component<Props> {
  render() {
    const { className, children } = this.props;
    return <div className={"grow flex " + className}>{children}</div>;
  }
}

export default AccordionContent;
