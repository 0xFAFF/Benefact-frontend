import React from "react";
import PropTypes from "prop-types";
import { ViewContainer } from "../Views";
import { notifyToast } from "utils";

class Register extends React.Component {
  onCreateAccount = async ({ email, username, password, confirmPassword }) => {
    if (!email || !username || !password || !confirmPassword) {
      const missing = [];
      if (!email) missing.push("Email");
      if (!username) missing.push("Username");
      if (!password) missing.push("Password");
      if (!confirmPassword) missing.push("Confirm Password");
      notifyToast("error", `Missing ${missing.join(", ")}`);
      return;
    }

    // Validate password and confirmPassword
    if (password === confirmPassword) {
      const queryParams = {
        email: email,
        name: username,
        password: password
      };
      await this.props.compFetch("users", "ADD", queryParams).then(result => {
        this.props.onLoginHandler(result);
      });
    } else {
      notifyToast("error", "Passwords do not match");
    }
  };

  btmItems = [
    {
      content: "Already Registered? Login Here",
      className: "link",
      onClick: () => this.props.onViewChangeHandler("signin")
    }
  ];

  formItems = [
    { name: "username", placeholder: "Username", icon: "user" },
    { name: "email", placeholder: "Email", icon: "envelope" },
    { name: "password", placeholder: "Password", icon: "key", type: "password" },
    { name: "confirmPassword", placeholder: "Confirm Password", icon: "key", type: "password" }
  ];

  render() {
    return (
      <ViewContainer
        items={this.btmItems}
        className="register"
        onSubmit={this.onCreateAccount}
        buttonTitle="Create Account"
        header={{ title: "Create a New Account" }}
        formItems={this.formItems}
      />
    );
  }
}

Register.propTypes = {
  onViewChangeHandler: PropTypes.func,
  compFetch: PropTypes.func,
  onLoginHandler: PropTypes.func
};

export default Register;
