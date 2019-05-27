import React from "react";
import { ViewContainer } from "../Views";
import { notifyToast } from "utils";

interface Props {
  onViewChangeHandler(view: string): void;
  compFetch(
    type: string,
    action: string,
    queryParams?: { email?: string; name?: string; password?: string },
    errorHandler?: any
  ): any;
  onLoginHandler: any;
}
interface State {}

class Register extends React.Component<Props, State> {
  onCreateAccount = async ({
    email,
    username,
    password,
    confirmPassword
  }: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
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
      await this.props.compFetch("users", "ADD", queryParams).then((result: any) => {
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
        submitBtnTitle="Create Account"
        header={{ title: "Create a New Account" }}
        formItems={this.formItems}
      />
    );
  }
}

export default Register;
