import React, { Component, Fragment } from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

class AccordionContent extends Component<Props> {
  render() {
    const { children, className } = this.props;
    return <div className={"grow flex " + className}>{children}</div>;
  }
}

export default AccordionContent;
