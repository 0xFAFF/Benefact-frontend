import React from "react";
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
    return (
      <div id="add-card-outer">
        <AddCard
          {...this.props}
          showModal={false}
          useModal={false}
          onAcceptHandler={() => this.props.onClose()}
          onClose={this.props.onClose}
        />
      </div>
    );
  }
}
export default AddCardWrapper;
