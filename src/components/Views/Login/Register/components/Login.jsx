import React from "react";
import PropTypes from "prop-types";

const Login = props => {
  const { token, onLoginHandler } = props;
  return (
    <div className="register-inner">
      <div className="register-header">Your account is created</div>
      <div className="register-bottom-container">
        <div
          className="login"
          onClick={() => {
            if (token) onLoginHandler(token);
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  token: PropTypes.string,
  onInputChangeHandler: PropTypes.func
};

export default Login;
