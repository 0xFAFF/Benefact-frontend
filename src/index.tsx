import React from "react";
import ReactDOM from "react-dom";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "./fontawesome";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User, Login, Board, Landing } from "./components/Pages";
import { Version } from "./components/Version";
import { setTheme, parseToken } from "./utils";
import { THEMES } from "./constants";
import "./index.scss";

toast.configure({
  autoClose: 3500,
  draggable: false
});

interface Props {
  match?: {
    url?: string;
    params?: {
      boardId?: string;
      cardId?: string;
      view?: string;
    };
  };
}

interface State {
  token: string;
}

class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    let token = Cookies.get("token");
    if (!token || !parseToken(token)) {
      Cookies.remove("token");
      token = "";
    }
    this.state = { token };
  }

  onLoginHandler = (token: string) => {
    if (token && parseToken(token)) {
      this.setState({ token });
      Cookies.set("token", token);
    }
  };

  onLogoutHandler = () => {
    this.setState({ token: "" });
    Cookies.remove("token");
  };

  componentDidMount() {
    const { themes, currentTheme }: { themes: any; currentTheme: string } = THEMES();
    setTheme(themes[currentTheme]);
  }

  render() {
    const { token = "" } = this.state;
    const childProps = {
      token,
      onLoginHandler: this.onLoginHandler,
      onLogoutHandler: this.onLogoutHandler
    };
    const RedirectLogin = (props: Props) => {
      let { match = {} } = props;
      let { url = "" } = match;
      return <Redirect to={`/login${match ? `?redirect=${encodeURI(url)}` : ""}`} />;
    };
    const BoardRender = (props: Props) => {
      const { match: { params: { boardId = "", cardId = "", view = "kanban" } = {} } = {} } = props;
      return token ? (
        <Board view={view} boardId={boardId} cardId={cardId} {...props} {...childProps} />
      ) : (
        <RedirectLogin {...props} />
      );
    };
    return (
      <div id="app-container" className="flex col">
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={props =>
                token ? <Landing {...props} {...childProps} /> : <RedirectLogin {...props} />
              }
            />
            <Route path="/login" render={props => <Login {...childProps} {...props} />} />
            <Route
              exact
              path="/board/:boardId/:view(list|kanban)?/card/:cardId"
              render={BoardRender}
            />
            <Route exact path="/board/:boardId/:view(list|kanban)?" render={BoardRender} />
            <Route
              path="/user/:userId?"
              render={props =>
                token ? <User {...props} {...childProps} /> : <RedirectLogin {...props} />
              }
            />
            <Route path="/version" render={() => <Version />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
