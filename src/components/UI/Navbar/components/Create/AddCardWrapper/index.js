import React from "react";
import { AddCard } from "../../../../AddComponents";
import "./index.scss";

class AddCardWrapper extends React.Component {
  componentDidMount() {
    this.props.setPopupStyle({ width: "500px" });
  }
  componentWillUnmount() {
    this.props.setPopupStyle();
  }
  render() {
    return (
      <div id="add-card-outer">
        <AddCard
          {...this.props}
          showModal={false}
          useModal={false}
          onAcceptHandler={() => this.props.resetCreateComponentHandler()}
          onClose={() => this.props.resetCreateComponentHandler()}
        />
      </div>
    );
  }
}
export default AddCardWrapper;
