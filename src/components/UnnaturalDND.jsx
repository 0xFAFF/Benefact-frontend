import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

let animationId;
const rotationCurve = (x, c) => Math.pow(Math.sin(Math.min(Math.PI / 2, Math.abs(x * c))), 2) * Math.sign(x);
const initialState = {
  transform: null,
  prevX: 0,
  rotation: 0
};

class UnnaturalDND extends Component {
  static propTypes = {
    snapshot: PropTypes.shape({
      isDragging: PropTypes.bool.isRequired,
      dropAnimation: PropTypes.shape()
    }).isRequired,
    style: PropTypes.shape().isRequired,
    children: PropTypes.func.isRequired,
    animationRotationFade: PropTypes.number,
    rotationMultiplier: PropTypes.number,
    velocityMultiplier: PropTypes.number
  };

  static defaultProps = {
    animationRotationFade: 0.9,
    rotationMultiplier: 0.9,
    velocityMultiplier: 0.15
  };

  static getDerivedStateFromProps(props, state) {
    if (props.snapshot.dropAnimation && state.transform) {
      return {
        ...initialState
      };
    }
    return null;
  }

  state = {
    ...initialState
  };

  componentDidUpdate = prevProps => {
    if (prevProps.snapshot.isDragging !== this.props.snapshot.isDragging) {
      if (this.props.snapshot.isDragging) animationId = requestAnimationFrame(this.patchTransform);
      if (!this.props.snapshot.isDragging) cancelAnimationFrame(animationId);
    }
  };

  componentWillUnmount = () => cancelAnimationFrame(animationId);

  patchTransform = () => {
    const { style, animationRotationFade, rotationMultiplier, velocityMultiplier } = this.props;

    if (style.transform) {
      const currentX = style.transform.match(/translate\(.{1,}\)/g)[0].match(/-?[0-9]{1,}/g)[0];
      const velocity = currentX - this.state.prevX;
      const prevRotation = this.state.rotation;

      let rotation =
        prevRotation * animationRotationFade + rotationCurve(velocity, velocityMultiplier) * rotationMultiplier;

      const newTransform = `${style.transform} rotate(${rotation}deg)`;

      if (Math.abs(rotation) < 0.01) rotation = 0;

      this.setState(
        {
          transform: newTransform,
          prevX: currentX,
          rotation
        },
        () => {
          animationId = requestAnimationFrame(this.patchTransform);
        }
      );
    } else {
      animationId = requestAnimationFrame(this.patchTransform);
    }
  };

  render() {
    let childProps = {...this.props.style};
    if(this.state.transform) childProps.transform = this.state.transform;
    return (
      <Fragment>
        {this.props.children(childProps)}
      </Fragment>
    );
  }
}

export default UnnaturalDND;
