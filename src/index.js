import React from "react";
import ReactDOM from "react-dom";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "./fontawesome";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User, Login, Board } from "./components/Pages";
import { Version } from "./components/Version";
import { setTheme } from "./utils";
import { THEMES } from "./constants";
import "./index.scss";

toast.configure({
  autoClose: 5000,
  draggable: false
});

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

  componentDidMount() {
    const { themes, currentTheme } = THEMES();
    setTheme(themes[currentTheme]);
  }

  render() {
    const { token = "" } = this.state;

    const RedirectLogin = () => <Redirect to="/login" />;

    return (
      <div id="app-container">
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (token ? <Redirect to="/board/benefact" /> : <RedirectLogin />)}
            />
            <Route
              path="/login"
              render={props => (
                <Login token={token} {...props} onLoginHandler={this.onLoginHandler} />
              )}
            />
            <Route
              path="/board/:boardId"
              render={props =>
                token ? (
                  <Board
                    boardId={props.match.params.boardId}
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
              render={props => (token ? <User {...props} token={token} /> : <RedirectLogin />)}
            />
            <Route path="/version" render={props => <Version />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
