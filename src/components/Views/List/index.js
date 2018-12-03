import React from "react";
import Board from "./Board";

class List extends React.Component {
  render() {
    return <Board {...this.props} />;
  }
}

export default List;
