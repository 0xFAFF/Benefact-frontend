import React from "react";
import PropTypes from "prop-types";
import SignIn from "./SignIn";
import Register from "./Register";

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
        {view === "signin" && (
          <SignIn
            onViewChangeHandler={this.onViewChangeHandler}
            onLoginHandler={onLoginHandler}
          />
        )}
        {view === "register" && (
          <Register onViewChangeHandler={this.onViewChangeHandler} />
        )}
      </div>
    );
  }
}

export default Login;
