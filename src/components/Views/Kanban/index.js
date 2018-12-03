import React from "react";
import Board from "./Board";

class Kanban extends React.Component {
  render() {
    return <Board {...this.props} />;
  }
}

export default Kanban;
export { default as Board } from "./Board";
export { default as Column } from "./Column";
export { default as Card } from "./Card";
export * from "./Tags";
