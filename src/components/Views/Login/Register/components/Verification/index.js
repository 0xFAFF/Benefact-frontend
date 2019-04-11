import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

const Verification = props => {
  const { token, onLoginHandler, email } = props;
  return (
    <div id="verification-inner">
      <div className="verification-header">Verify your email address</div>
      <div className="verification-sub-header-1">
        You're almost done! A verification message has been sent to
      </div>
      <div className="verification-email">{email}</div>
      <div className="verification-sub-header-2">
        Just check your email and follow the link to finish creating your
        account.
      </div>
      <div className="verification-bottom-container">
        <div>Can't find the email?</div>
        <div
          className="verification-resend"
          onClick={() => {
            if (token) onLoginHandler(token);
          }}
        >
          Resend verification email
        </div>
      </div>
    </div>
  );
};

Verification.propTypes = {
  token: PropTypes.string,
  onInputChangeHandler: PropTypes.func,
  email: PropTypes.string
};

export default Verification;
