import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notifyToast } from "utils";
import { ViewContainer } from "../Views";

export class PasswordReset extends React.Component {
  state = {
    password: "",
    confirmPassword: ""
  };

  onInputChangeHandler = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  resetPassword = async ({ password, confirmPassword }) => {
    const { page, nonce, compFetch } = this.props;

    if (password !== confirmPassword) {
      notifyToast("error", "Passwords do not match");
      return;
    }

    await compFetch("users", "CHANGE_PASSWORD", { password, nonce });
    notifyToast("info", "Your password has been reset, please login");
    page.history.push("/");
  };

  btmItems = [
    {
      content: "Back to Login",
      className: "link",
      onClick: () => this.props.onViewChangeHandler("signin")
    }
  ];

  formItems = [
    { name: "password", placeholder: "New Password", icon: "key", type: "password" },
    { name: "confirmPassword", placeholder: "Confirm Password", icon: "key", type: "password" }
  ];

  render() {
    return (
      <ViewContainer
        items={this.btmItems}
        className="password-reset"
        onSubmit={this.resetPassword}
        buttonTitle="Reset Password"
        header={{ title: "Password Reset" }}
        formItems={this.formItems}
      />
    );
  }
}

PasswordReset.propTypes = {
  nonce: PropTypes.string,
  onReset: PropTypes.func,
  page: PropTypes.object,
  compFetch: PropTypes.func,
  onViewChangeHandler: PropTypes.func
};

export default PasswordReset;
