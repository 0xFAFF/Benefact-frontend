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

  resetPassword = async () => {
    const { password, confirmPassword } = this.state;
    const { page, nonce, compFetch } = this.props;

    if (password !== confirmPassword) {
      notifyToast("error", "Passwords do not match");
      return;
    }

    await compFetch("users", "CHANGE_PASSWORD", {
      password,
      nonce: nonce
    }).then(page.history.push("/"));
  };

  handlePressEnter = e => {
    if (e.key === "Enter") {
      this.resetPassword();
    }
  };

  btmItems = [
    {
      content: "Back to Login",
      className: "link",
      onClick: () => this.props.onViewChangeHandler("signin")
    }
  ];

  render() {
    return (
      <ViewContainer
        items={this.btmItems}
        className="password-reset"
        handleKeyPress={this.handlePressEnter}
        button={{
          onClick: this.resetPassword,
          title: "Reset Password"
        }}
        header={{ title: "Forgot Password?" }}
      >
        <div className="input-container">
          <div className="input-icon">
            <FontAwesomeIcon icon={"key"} size="sm" />
          </div>
          <input
            className="input-field"
            name="password"
            placeholder="Password"
            type="password"
            value={this.state.confirmPassword}
            onChange={e => this.onInputChangeHandler(e, "confirmPassword")}
          />
        </div>
        <div className="input-container">
          <div className="input-icon">
            <FontAwesomeIcon icon={"key"} size="sm" />
          </div>
          <input
            className="input-field"
            id="confirm-password"
            name="password"
            placeholder="Confirm Password"
            type="password"
            value={this.state.password}
            onChange={e => this.onInputChangeHandler(e, "password")}
          />
        </div>
      </ViewContainer>
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
