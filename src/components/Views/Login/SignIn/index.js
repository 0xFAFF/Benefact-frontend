import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

const SignIn = props => {
  const { onViewChangeHandler, onLoginHandler } = props;
  return (
    <div id="signin-container">
      <div className="signin-inner">
        <div className="signin-header">Log in</div>
        <div className="input-container">
          <div className="input-icon">
            <FontAwesomeIcon icon={"user"} size="sm" />
          </div>
          <input
            className="input-field"
            id="username"
            name="username"
            placeholder="Username or Email"
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
          />
        </div>
        <button className="signin-button" onClick={() => onLoginHandler(true)}>
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
  );
};

SignIn.propTypes = {
  onViewChangeHandler: PropTypes.func,
  onLoginHandler: PropTypes.func
};

export default SignIn;
