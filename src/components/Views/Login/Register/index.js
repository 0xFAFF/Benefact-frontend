import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

const Register = props => {
  const { onViewChangeHandler } = props;
  return (
    <div id="register-container">
      <div className="register-inner">
        <div className="register-header">Create a New Account</div>
        <div className="input-container">
          <div className="input-icon">
            <FontAwesomeIcon icon={"user"} size="sm" />
          </div>
          <input
            className="input-field"
            id="username"
            name="username"
            placeholder="Username"
          />
        </div>
        <div className="input-container">
          <div className="input-icon">
            <FontAwesomeIcon icon={"envelope"} size="sm" />
          </div>
          <input
            className="input-field"
            id="email"
            name="email"
            placeholder="Email"
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
        <div className="input-container">
          <div className="input-icon">
            <FontAwesomeIcon icon={"key"} size="sm" />
          </div>
          <input
            className="input-field"
            id="confirm-password"
            name="confirm-password"
            placeholder="Confirm Password"
          />
        </div>
        <button className="register-button">Create Account</button>
      </div>
      <div className="register-bottom-container">
        <div className="register" onClick={() => onViewChangeHandler("signin")}>
          Already Registered? Login Here
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  onViewChangeHandler: PropTypes.func
};

export default Register;
