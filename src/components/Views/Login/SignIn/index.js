import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { URLS } from "../../../../constants";
import { ErrorHandling } from "../../../UI";
import { fetching } from "../../../../utils";
import "./index.scss";

class SignIn extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleError = message => {
    this.setState({ showError: true, errorMessage: message });
  };

  onInputChangeHandler = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  onAuthCheck = async () => {
    const { email, password } = this.state;
    let token = "";

    if (!email || !password) {
      console.warn("There's an empty field");
      return;
    }

    const url = URLS("users", "GET");
    const queryParams = {
      email: email,
      password: password
    };
    await fetching(url, "POST", queryParams).then(result => {
      const { hasError, message, data } = result;
      if (hasError) {
        this.handleError(message);
      } else {
        token = data;
      }
    });

    if (token) {
      this.props.onLoginHandler(token);
    }
  };

  render() {
    const { onViewChangeHandler } = this.props;
    const { showError, errorMessage } = this.state;
    return (
      <ErrorHandling showError={showError} errorMessage={errorMessage}>
        <div id="signin-container">
          <div className="signin-inner">
            <div className="input-container">
              <div className="input-icon">
                <FontAwesomeIcon icon={"user"} size="sm" />
              </div>
              <input
                className="input-field"
                id="username"
                name="username"
                placeholder="Username or Email"
                value={this.state.email}
                onChange={e => this.onInputChangeHandler(e, "email")}
              />
            </div>
            <div className="input-container">
              <div className="input-icon">
                <FontAwesomeIcon icon={"key"} size="sm" />
              </div>
              <input
                className="input-field"
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                value={this.state.password}
                onChange={e => this.onInputChangeHandler(e, "password")}
              />
            </div>
            <button className="signin-button" onClick={this.onAuthCheck}>
              Login
            </button>
          </div>
          <div className="signin-bottom-container">
            <div
              className="register"
              onClick={() => onViewChangeHandler("register")}
            >
              Register
            </div>
            <div className="signin-bottom-circle">
              <FontAwesomeIcon icon={"circle"} size="sm" />
            </div>
            <div className="forgot-password">Forgot Password?</div>
          </div>
        </div>
      </ErrorHandling>
    );
  }
}

SignIn.propTypes = {
  onViewChangeHandler: PropTypes.func,
  onLoginHandler: PropTypes.func
};

export default SignIn;
