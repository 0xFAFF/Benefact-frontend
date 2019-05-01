import React from "react";
import { Modal } from "components/UI";

const ModalWrapper = (parent, stateKey) => {
  const closeState = {};
  closeState[stateKey] = false;
  const openState = {};
  openState[stateKey] = true;
  return class InnerWrapper extends React.Component {
    static close = () => parent && parent.setState(closeState);
    static open = () => parent && parent.setState(openState);
    componentWillUnmount = () => {
      parent = null;
    };
    render = () =>
      Boolean(parent && parent.state && parent.state[stateKey]) ? (
        <Modal isOpen onClose={() => parent.setState(closeState)}>
          {this.props.children}
        </Modal>
      ) : null;
  };
};

export default ModalWrapper;
