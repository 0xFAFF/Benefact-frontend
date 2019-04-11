import React from "react";
import ReactDOM from "react-dom";
import Cookies from "js-cookie";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./fontawesome";
import BaseWrapper from "./components/Views/Base/BaseWrapper";
import { ErrorBoundary } from "./components/UI";
import { User, Login } from "./components/Views";
import { Version } from "./components/Version";
import "./index.scss";

class App extends React.Component {
  state = {
    token: Cookies.get("token")
  };

  onLoginHandler = token => {
    this.setState({ token });
    Cookies.set("token", token);
  };

  onLogoutHandler = () => {
    this.setState({ token: "" });
    Cookies.remove("token");
  };

  render() {
    const { token = "" } = this.state;

    const RedirectLogin = () => <Redirect to="/login" />;

    return (
      <div id="app-container">
        <ErrorBoundary>
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                render={props =>
                  token ? <Redirect to="/board" /> : <RedirectLogin />
                }
              />
              <Route
                path="/login"
                render={props =>
                  token ? (
                    <Redirect to="/board" />
                  ) : (
                    <Login {...props} onLoginHandler={this.onLoginHandler} />
                  )
                }
              />
              <Route
                path="/board"
                render={props =>
                  token ? (
                    <BaseWrapper
                      boardId={1}
                      {...props}
                      token={token}
                      onLogoutHandler={this.onLogoutHandler}
                    />
                  ) : (
                    <RedirectLogin />
                  )
                }
              />
              <Route
                path="/user"
                render={props =>
                  token ? <User {...props} token={token} /> : <RedirectLogin />
                }
              />
              <Route path="/version" render={props => <Version />} />
            </Switch>
          </Router>
        </ErrorBoundary>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
