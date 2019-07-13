import React, { Component, ReactNode } from "react";

interface AccordianChild {
  (args: AccordianChildProps): ReactNode;
}

export interface AccordianChildProps {
  isActive: boolean;
  onClick: () => void;
}

interface Props {
  children: Array<AccordianChild>;
  exclusive?: boolean;
}

export class Accordion extends Component<Props, { activeIndex: Set<number> }> {
  state = {
    activeIndex: new Set<number>()
  };

  handleTitleClick = (index: number) => {
    const { exclusive = true } = this.props;
    let { activeIndex } = this.state;
    if (exclusive) activeIndex = new Set<number>(activeIndex.has(index) ? [] : [index]);
    else {
      if (activeIndex.has(index)) activeIndex.delete(index);
      else activeIndex.add(index);
    }
    this.setState({ activeIndex });
  };

  render() {
    const { children } = this.props;
    const { activeIndex } = this.state;

    return children.map((child, index) =>
      child({ isActive: activeIndex.has(index), onClick: () => this.handleTitleClick(index) })
    );
  }
}
