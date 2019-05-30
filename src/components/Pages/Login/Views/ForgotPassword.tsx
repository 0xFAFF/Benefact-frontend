import React from "react";
import { ViewContainer } from ".";
import { notifyToast } from "utils";
import { Input } from "components/UI";

interface Props {
  onViewChangeHandler(view: string): void;
  compFetch(
    type: string,
    action: string,
    queryParams?: { email?: string },
    errorHandler?: any
  ): any;
}

class ForgotPassword extends React.Component<Props, {}> {
  onCreateAccount = async ({ email }: { email: string }) => {
    if (!email) {
      const missing = [];
      if (!email) missing.push("Email");
      notifyToast("error", `Missing ${missing.join(", ")}`);
      return;
    }

    const result = await this.props.compFetch(
      "users",
      "RESET_PASSWORD",
      { email },
      (e: { status: number }) => {
        if (e.status === 404) notifyToast("error", "Couldn't find an account with that email");
      }
    );
    if (result) {
      notifyToast("info", "An email has been sent to reset your password");
      this.props.onViewChangeHandler("signin");
    }
  };

  btmItems = [
    {
      content: "Know your password? Sign in here",
      className: "link",
      onClick: () => this.props.onViewChangeHandler("signin")
    }
  ];

  render() {
    return (
      <ViewContainer
        items={this.btmItems}
        className="register"
        onSubmit={this.onCreateAccount}
        submitBtnTitle="Reset Password"
        header={{ title: "Forgot Password" }}
      >
        <Input name="email" placeholder="Email" icon="envelope" />
      </ViewContainer>
    );
  }
}

export default ForgotPassword;
