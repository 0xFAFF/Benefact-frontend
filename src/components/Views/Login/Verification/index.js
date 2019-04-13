import React from "react";
import PropTypes from "prop-types";
import { fetching } from "../../../../utils";
import { URLS } from "../../../../constants";
import { toast } from "react-toastify";
import "./index.scss";

class Verification extends React.Component {
  handleError = message => {
    this.setState({ showError: true, errorMessage: message });
  };

  notify = () => {
    toast.success("Successfully sent verification email.");
  };

  render() {
    const { token = "", email } = this.props;
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
            onClick={async () => {
              const url = URLS("users", "SEND_VERIFICATION");
              await fetching(url, "POST", {}, token).then(result => {
                const { hasError, message } = result;
                if (hasError) {
                  this.handleError(message);
                } else {
                  this.notify();
                }
              });
            }}
          >
            Resend verification email
          </div>
        </div>
      </div>
    );
  }
}

Verification.propTypes = {
  token: PropTypes.string,
  onInputChangeHandler: PropTypes.func,
  email: PropTypes.string
};

export default Verification;
