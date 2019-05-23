import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SignIn.scss";
import { notifyToast } from "utils";

class PasswordReset extends React.Component {
  state = {
    password: "",
    confirmPassword: ""
  };

  onInputChangeHandler = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  resetPassword = async () => {
    const { password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      notifyToast("error", "Passwords do not match");
      return;
    }

    await this.props.compFetch("users", "CHANGE_PASSWORD", {
      password: password,
      nonce: this.props.nonce
    })
    .then(this.props.page.history.push("/"));
  };

  handlePressEnter = e => {
    if (e.key === "Enter") {
      this.resetPassword();
    }
  };

  render() {
    return (
      <div id="signin-container">
        <div className="signin-inner" onKeyPress={this.handlePressEnter}>
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
              id="password"
              name="password"
              placeholder="Confirm Password"
              type="password"
              value={this.state.password}
              onChange={e => this.onInputChangeHandler(e, "password")}
            />
          </div>
          <button className="signin-button" onClick={this.resetPassword}>
            Reset Password
          </button>
        </div>
      </div>
    );
  }
}

PasswordReset.propTypes = {
  nonce: PropTypes.string,
  onReset: PropTypes.func
};

export default PasswordReset;
