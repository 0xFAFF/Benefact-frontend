import React from "react";
import PropTypes from "prop-types";
import { ErrorHandling } from "../../../UI";
import { Create } from "./components";
import Verification from "../Verification";
import "./index.scss";
import PageWrapper from "../../PageWrapper";

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
  
  componentDidMount() {
    this.props.handleError(this.handleError);
  }

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
      await this.props.compFetch("users", "ADD", queryParams)
        .then(result => {
          this.setState({ registered: true });
          this.props.onLoginHandler(result);
        });
    } else {
      console.warn("password and confirmPassword are different");
    }
  };

  render() {
    const { onViewChangeHandler } = this.props;
    const { fields } = this.state;
    return (
      <div id="register-container">
        <Create
          fields={fields}
          onViewChangeHandler={onViewChangeHandler}
          onInputChangeHandler={this.onInputChangeHandler}
          onCreateAccount={this.onCreateAccount}
        />
      </div>
    );
  }
}

Register.propTypes = {
  onViewChangeHandler: PropTypes.func
};

export default PageWrapper(Register);
