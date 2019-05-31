import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ViewContainer } from "../Views";
import { notifyToast } from "utils";
import { Input } from "components/UI";

interface Props {
  onViewChangeHandler(view: string): void;
  compFetch(
    type: string,
    action: string,
    queryParams?: { email?: string; password?: string },
    errorHandler?: any
  ): any;
  onLoginHandler: any;
}
interface State {}

class SignIn extends React.Component<Props, State> {
  onSubmit = async ({ email, password }: { email: string; password: string }) => {
    if (!email || !password) {
      const missing = [];
      if (!email) missing.push("Email/Username");
      if (!password) missing.push("Password");
      notifyToast("error", `Missing ${missing.join(", ")}`);
      return;
    }

    const queryParams = { email, password };
    await this.props.compFetch("users", "AUTH", queryParams).then((result: any) => {
      this.props.onLoginHandler(result);
    });
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
      onClick: () => this.props.onViewChangeHandler("forgot")
    }
  ];

  render() {
    return (
      <ViewContainer
        items={this.btmItems}
        className="signin"
        onSubmit={this.onSubmit}
        submitBtnTitle="Login"
        header={{ title: "Benefact", className: "app-title" }}
      >
        <Input id="email" placeholder="Username or Email" icon="user" />
        <Input id="password" placeholder="Password" icon="key" type="password" />
      </ViewContainer>
    );
  }
}

export default SignIn;
