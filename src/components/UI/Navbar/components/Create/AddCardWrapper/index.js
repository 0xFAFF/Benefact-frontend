import React from "react";
import PropTypes from "prop-types";
import { AddCard } from "../../../../AddComponents";
import "./index.scss";

class AddCardWrapper extends React.Component {
  componentDidMount() {
    this.props.setPopupStyle({ width: "500px" });
  }
  componentWillUnmount() {
    this.props.setPopupStyle({ width: "300px" });
  }
  render() {
    const { onClose } = this.props;
    return (
      <div id="add-card-outer">
        <AddCard
          {...this.props}
          showModal={false}
          useModal={false}
          showDeleteModal={false}
          onAcceptHandler={() => onClose()}
          onClose={onClose}
          disableComponents={true}
        />
      </div>
    );
  }
}

AddCardWrapper.propTypes = {
  setPopupStyle: PropTypes.func,
  addComponent: PropTypes.func,
  columns: PropTypes.array,
  onClose: PropTypes.func
};

export default AddCardWrapper;
