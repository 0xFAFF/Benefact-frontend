import React from "react";
import ReactDOM from "react-dom";
import "./fontawesome";
import "./index.scss";
import BaseWrapper from "./components/Views/Base/BaseWrapper";
import Login from "./components/Views/Login";

class App extends React.Component {
  state = {
    auth: false
  };

  onLoginHandler = auth => {
    this.setState({ auth });
  };

  render() {
    const { auth } = this.state;
    return (
      <div id="app-container">
        {!auth && <Login onLoginHandler={this.onLoginHandler} />}
        {auth && <BaseWrapper />}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
