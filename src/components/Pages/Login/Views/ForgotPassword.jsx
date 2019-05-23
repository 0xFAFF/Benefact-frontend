import React from "react";
import PropTypes from "prop-types";
import { ViewContainer } from "../Views";
import { notifyToast } from "utils";

class ForgotPassword extends React.Component {
  onCreateAccount = async ({ email }) => {
    if (!email) {
      const missing = [];
      if (!email) missing.push("Email");
      notifyToast("error", `Missing ${missing.join(", ")}`);
      return;
    }

    const result = await this.props.compFetch("users", "RESET_PASSWORD", { email }, e => {
      if (e.status === 404) notifyToast("error", "Couldn't find an account with that email");
    });
    if (result) {
      notifyToast("info", "An email has been sent to reset your password");
      this.props.onViewChangeHandler("signin");
    }
  };

  btmItems = [
    {
      content: "Know your password? Sign in here",
      className: "link",
      onClick: () => this.props.onViewChangeHandler("signin")
    }
  ];

  formItems = [{ name: "email", placeholder: "Email", icon: "envelope" }];

  render() {
    return (
      <ViewContainer
        items={this.btmItems}
        className="register"
        onSubmit={this.onCreateAccount}
        buttonTitle="Reset Password"
        header={{ title: "Forgot Password" }}
        formItems={this.formItems}
      />
    );
  }
}

ForgotPassword.propTypes = {
  onViewChangeHandler: PropTypes.func,
  compFetch: PropTypes.func
};

export default ForgotPassword;
