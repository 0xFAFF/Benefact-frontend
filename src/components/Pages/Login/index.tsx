import React from "react";
import { SignIn, Register, PasswordReset, ForgotPassword } from "./Views";
import PageWrapper from "../PageWrapper";
import { Redirect } from "react-router-dom";
import "./index.scss";
import { notifyToast } from "utils";

interface Props {
  onLoginHandler(token: string): void;
  setChild(thisClass: React.Component): void;
  compFetch(type: string, action: string, queryParams?: any, errorHandler?: any): any;
  token: string;
  page: {
    query: {
      verify: boolean;
      redirect: string;
      reset: boolean;
    };
    history: {
      push(url: string): void;
    };
  };
}
interface State {
  view: string;
  verifyDone: boolean;
}

class Login extends React.Component<Props, State> {
  state = {
    view: "signin",
    verifyDone: false
  };

  navbar = () => {
    return {
      title: "Benefact",
      buttons: null,
      className: "login-navbar"
    };
  };

  componentDidMount = async () => {
    this.props.setChild(this);
    if (!this.props.token && this.props.page.query.verify)
      notifyToast("info", "Please login to verify your email address");
  };

  componentDidUpdate = async () => {
    const verify = this.props.page.query.verify;
    if (!this.props.token) return;
    if (verify && !this.state.verifyDone) {
      let verified = await this.props.compFetch("users", "VERIFY", { nonce: verify });
      if (verified === undefined) return;
      if (verified) notifyToast("info", "Email succesfully verified");
    }
    if (!this.state.verifyDone) this.setState({ verifyDone: true });
  };

  onViewChangeHandler = (view: string) => {
    this.setState({ view });
  };

  render() {
    let { view, verifyDone } = this.state;
    const {
      onLoginHandler,
      compFetch,
      token,
      page: {
        query: { redirect, reset }
      }
    } = this.props;
    if (verifyDone && token) return <Redirect to={redirect || "/"} />;
    if (reset) view = "reset";
    return (
      <div id="login" className="flex grow center">
        {view === "signin" && (
          <SignIn
            onViewChangeHandler={this.onViewChangeHandler}
            onLoginHandler={onLoginHandler}
            compFetch={compFetch}
          />
        )}
        {view === "register" && (
          <Register
            onViewChangeHandler={this.onViewChangeHandler}
            onLoginHandler={onLoginHandler}
            compFetch={compFetch}
          />
        )}
        {view === "reset" && (
          <PasswordReset
            onViewChangeHandler={this.onViewChangeHandler}
            compFetch={compFetch}
            nonce={reset}
            page={this.props.page}
          />
        )}
        {view === "forgot" && (
          <ForgotPassword onViewChangeHandler={this.onViewChangeHandler} compFetch={compFetch} />
        )}
      </div>
    );
  }
}

export default PageWrapper(Login);
