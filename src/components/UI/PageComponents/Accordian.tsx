import React, { Component, ReactNode } from "react";
import { includes, without } from "lodash";

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

export class Accordion extends Component<Props> {
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
    const { children } = this.props;

    return children.map((child, index) =>
      child({ isActive: this.isIndexActive(index), onClick: () => this.handleTitleClick(index) })
    );
  }
}
