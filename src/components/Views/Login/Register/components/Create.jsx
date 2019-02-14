import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Create = props => {
  const {
    fields: { username, email, password, confirmPassword },
    onInputChangeHandler,
    onViewChangeHandler,
    onCreateAccount
  } = props;
  return (
    <div>
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
            value={username}
            onChange={e => onInputChangeHandler(e, "username")}
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
            value={email}
            onChange={e => onInputChangeHandler(e, "email")}
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
            value={password}
            onChange={e => onInputChangeHandler(e, "password")}
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
            type="password"
            value={confirmPassword}
            onChange={e => onInputChangeHandler(e, "confirmPassword")}
          />
        </div>
        <button className="register-button" onClick={onCreateAccount}>
          Create Account
        </button>
      </div>
      <div className="register-bottom-container">
        <div className="register" onClick={() => onViewChangeHandler("signin")}>
          Already Registered? Login Here
        </div>
      </div>
    </div>
  );
};

Create.propTypes = {
  fields: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string
  }),
  onInputChangeHandler: PropTypes.func,
  onViewChangeHandler: PropTypes.func,
  onCreateAccount: PropTypes.func
};

export default Create;
