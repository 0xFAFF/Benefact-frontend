import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ViewContainer } from "../Views";

class Register extends React.Component {
  state = {
    fields: {
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    },
    token: ""
  };

  onInputChangeHandler = (e, field) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [field]: e.target.value
      }
    });
  };

  onCreateAccount = async () => {
    const {
      fields: { email, username, password, confirmPassword }
    } = this.state;
    if (!email || !username || !password || !confirmPassword) {
      console.warn("There's an empty field");
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
      console.warn("password and confirmPassword are different");
    }
  };

  handlePressEnter = e => {
    if (e.key === "Enter") {
      this.onCreateAccount();
    }
  };

  btmItems = [
    {
      content: "Already Registered? Login Here",
      className: "link",
      onClick: () => this.props.onViewChangeHandler("signin")
    }
  ];

  render() {
    const {
      fields: { username, email, password, confirmPassword }
    } = this.state;
    return (
      <ViewContainer
        items={this.btmItems}
        className="register"
        handleKeyPress={this.handlePressEnter}
        button={{
          onClick: this.onCreateAccount,
          title: "Create Account"
        }}
        header={{ title: "Create a New Account" }}
      >
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
            onChange={e => this.onInputChangeHandler(e, "username")}
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
            onChange={e => this.onInputChangeHandler(e, "email")}
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
            onChange={e => this.onInputChangeHandler(e, "password")}
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
            onChange={e => this.onInputChangeHandler(e, "confirmPassword")}
          />
        </div>
      </ViewContainer>
    );
  }
}

Register.propTypes = {
  onViewChangeHandler: PropTypes.func,
  compFetch: PropTypes.func,
  onLoginHandler: PropTypes.func
};

export default Register;
