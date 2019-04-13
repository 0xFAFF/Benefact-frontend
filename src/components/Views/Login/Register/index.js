import React from "react";
import PropTypes from "prop-types";
import { URLS } from "../../../../constants";
import { ErrorHandling } from "../../../UI";
import { fetching } from "../../../../utils";
import { Create } from "./components";
import Verification from "../Verification";
import "./index.scss";

class Register extends React.Component {
  state = {
    fields: {
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    },
    registered: false,
    token: ""
  };

  handleError = message => {
    this.setState({ showError: true, errorMessage: message });
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
      const url = URLS("users", "ADD");
      const queryParams = {
        email: email,
        name: username,
        password: password
      };
      await fetching(url, "POST", queryParams)
        .then(result => {
          const { hasError, message } = result;
          if (hasError) {
            this.handleError(message);
          } else {
            this.setState({ registered: true });
          }
        })
        .then(async result => {
          const url = URLS("users", "GET");
          const queryParams = {
            email: email,
            password: password
          };
          await fetching(url, "POST", queryParams).then(result => {
            const { hasError, message, data } = result;
            if (hasError) {
              this.handleError(message);
            } else {
              this.setState({ token: data });
              this.props.onLoginHandler(data);
            }
          });
        });
    } else {
      console.warn("password and confirmPassword are different");
    }
  };

  render() {
    const { onViewChangeHandler, onLoginHandler } = this.props;
    const { fields, registered, token, showError, errorMessage } = this.state;
    return (
      // <ErrorHandling showError={showError} errorMessage={errorMessage}>
      <div id="register-container">
        {!registered && (
          <Create
            fields={fields}
            onViewChangeHandler={onViewChangeHandler}
            onInputChangeHandler={this.onInputChangeHandler}
            onCreateAccount={this.onCreateAccount}
          />
        )}
        {registered && (
          <Verification
            token={token}
            onLoginHandler={onLoginHandler}
            email={this.state.fields.email}
          />
        )}
      </div>
      // </ErrorHandling>
    );
  }
}

Register.propTypes = {
  onViewChangeHandler: PropTypes.func
};

export default Register;
