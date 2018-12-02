import React from "react";
import ReactDOM from "react-dom";
import "./fontawesome";
import "./index.scss";
import Base from "./components/Views/Base";

class App extends React.Component {
  render() {
    return <Base />;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
