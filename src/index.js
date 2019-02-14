import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import BaseWrapper from "./components/Views/Base/BaseWrapper";
import { User, Login } from "./components/Views";
import "./fontawesome";
import "./index.scss";

class App extends React.Component {
  state = {
    auth: false,
    token: ""
  };

  onLoginHandler = token => {
    this.setState({ auth: true, token });
  };

  render() {
    const { auth } = this.state;

    const RedirectLogin = () => <Redirect to="/login" />;

    return (
      <div id="app-container">
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={props =>
                auth ? <Redirect to="/board" /> : <RedirectLogin />
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
                auth ? <BaseWrapper {...props} /> : <RedirectLogin />
              }
            />
            <Route
              path="/user"
              render={props => (auth ? <User {...props} /> : <RedirectLogin />)}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
