import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ViewContainer } from "../Views";
import { notifyToast } from "utils";

class SignIn extends React.Component {
  onInputChangeHandler = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  onSubmit = async ({ email, password }) => {
    if (!email || !password) {
      const missing = [];
      if (!email) missing.push("Email/Username");
      if (!password) missing.push("Password");
      notifyToast("error", `Missing ${missing.join(", ")}`);
      return;
    }

    const queryParams = { email, password };
    await this.props.compFetch("users", "AUTH", queryParams).then(result => {
      this.props.onLoginHandler(result);
    });
  };

  btmItems = [
    {
      content: "Register",
      className: "link",
      onClick: () => this.props.onViewChangeHandler("register")
    },
    {
      content: <FontAwesomeIcon icon={"circle"} size="sm" />,
      className: "signin-bottom-circle flex center"
    },
    {
      content: "Forgot Password?",
      className: "link",
      onClick: () => this.props.onViewChangeHandler("forgot")
    }
  ];

  formItems = [
    { name: "email", placeholder: "Username or Email", icon: "user" },
    { name: "password", placeholder: "Password", icon: "key", type: "password" }
  ];

  render() {
    return (
      <ViewContainer
        items={this.btmItems}
        className="signin"
        onSubmit={this.onSubmit}
        buttonTitle="Login"
        header={{ title: "Benefact", className: "app-title" }}
        formItems={this.formItems}
      />
    );
  }
}

SignIn.propTypes = {
  onViewChangeHandler: PropTypes.func,
  onLoginHandler: PropTypes.func,
  compFetch: PropTypes.func
};

export default SignIn;
