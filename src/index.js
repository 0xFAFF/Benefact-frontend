import React from "react";
import ReactDOM from "react-dom";
import "./fontawesome";
import { Board } from "./components/Kanban";

class App extends React.Component {
  render() {
    return <Board />;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
