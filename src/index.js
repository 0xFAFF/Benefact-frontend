import React from "react";
import ReactDOM from "react-dom";
import "./fontawesome";
import "./index.scss";
import BaseWrapper from "./components/Views/Base/BaseWrapper";

class App extends React.Component {
  render() {
    return <BaseWrapper />;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
