import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ViewContainer } from "../Views";

class SignIn extends React.Component {
  state = {
    email: "",
    password: ""
  };

  onInputChangeHandler = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  onAuthCheck = async () => {
    const { email, password } = this.state;
    if (!email || !password) {
      console.warn("There's an empty field");
      return;
    }

    const queryParams = {
      email: email,
      password: password
    };
    await this.props.compFetch("users", "GET", queryParams).then(result => {
      this.props.onLoginHandler(result);
    });
  };

  handlePressEnter = e => {
    if (e.key === "Enter") {
      this.onAuthCheck();
    }
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
      onClick: () => this.props.onViewChangeHandler("reset")
    }
  ];

  render() {
    return (
      <ViewContainer
        items={this.btmItems}
        className="signin"
        handleKeyPress={this.handlePressEnter}
        button={{
          onClick: this.onAuthCheck,
          title: "Login"
        }}
        header={{ title: "Benefact", className: "app-title" }}
      >
        <div className="input-container">
          <div className="input-icon">
            <FontAwesomeIcon icon="user" size="sm" />
          </div>
          <input
            className="input-field"
            id="username"
            name="username"
            placeholder="Username or Email"
            value={this.state.email}
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
            value={this.state.password}
            onChange={e => this.onInputChangeHandler(e, "password")}
          />
        </div>
      </ViewContainer>
    );
  }
}

SignIn.propTypes = {
  onViewChangeHandler: PropTypes.func,
  onLoginHandler: PropTypes.func,
  compFetch: PropTypes.func
};

export default SignIn;
