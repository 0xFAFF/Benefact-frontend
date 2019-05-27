import React from "react";
import { notifyToast } from "utils";
import { ViewContainer } from "../Views";

interface Props {
  onViewChangeHandler(view: string): void;
  compFetch(
    type: string,
    action: string,
    queryParams?: { password?: string; nonce?: boolean },
    errorHandler?: any
  ): any;
  page: { history: { push(url: string): void } };
  nonce: boolean;
}
interface State {}

export class PasswordReset extends React.Component<Props, State> {
  resetPassword = async ({
    password,
    confirmPassword
  }: {
    password: string;
    confirmPassword: string;
  }) => {
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
        submitBtnTitle="Reset Password"
        header={{ title: "Password Reset" }}
        formItems={this.formItems}
      />
    );
  }
}

export default PasswordReset;
