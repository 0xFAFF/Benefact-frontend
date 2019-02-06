import React from "react";
import ReactDOM from "react-dom";
import "./fontawesome";
import "./index.scss";
import BaseWrapper from "./components/Views/Base/BaseWrapper";
import Login from "./components/Views/Login";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

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
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={props =>
                auth ? <Redirect to="/board" /> : <Redirect to="/login" />
              }
            />
            <Route
              path="/login"
              render={props =>
                auth ? (
                  <Redirect to="/board" />
                ) : (
                  <Login {...props} onLoginHandler={this.onLoginHandler} />
                )
              }
            />
            <Route
              path="/board"
              render={props =>
                auth ? <BaseWrapper {...props} /> : <Redirect to="/login" />
              }
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
