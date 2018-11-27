import React from "react";
import "./index.scss";

class CardHandler extends React.Component {
  render() {
    return <div id="card-handler" {...this.props.dragHandleProps} />;
  }
}

export default CardHandler;
