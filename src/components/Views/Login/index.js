import React from "react";
import PropTypes from "prop-types";
import SignIn from "./SignIn";
import Register from "./Register";
import "./index.scss";

class Login extends React.Component {
  static propTypes = {
    onLoginHandler: PropTypes.func
  };

  state = {
    view: "signin"
  };

  onViewChangeHandler = view => {
    this.setState({ view });
  };

  render() {
    const { view } = this.state;
    const { onLoginHandler } = this.props;
    return (
      <div id="login">
        <div className="login-container">
          <div className="header">
            <div className="app-title">Benefact</div>
            <img
              src={"/fafficon.ico"}
              alt={"fafficon.ico"}
              width="70"
              height="70"
            />
          </div>
          {view === "signin" && (
            <SignIn
              onViewChangeHandler={this.onViewChangeHandler}
              onLoginHandler={onLoginHandler}
            />
          )}
          {view === "register" && (
            <Register
              onViewChangeHandler={this.onViewChangeHandler}
              onLoginHandler={onLoginHandler}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Login;
