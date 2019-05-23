import React from "react";
import PropTypes from "prop-types";
import { SignIn, Register, PasswordReset } from "./Views";
import PageWrapper from "../../Pages/PageWrapper";
import { Redirect } from "react-router-dom";
import "./index.scss";
import { notifyToast } from "../../../utils";

class Login extends React.Component {
  static propTypes = {
    onLoginHandler: PropTypes.func
  };

  state = {
    view: "signin",
    verifyDone: false
  };

  navbar = props => {
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

  componentDidUpdate = async _ => {
    const verify = this.props.page.query.verify;
    if (!this.props.token) return;
    if (verify && !this.state.verifyDone) {
      let verified = await this.props.compFetch("users", "VERIFY", { nonce: verify });
      if (verified === undefined) return;
      if (verified) notifyToast("info", "Email succesfully verified");
    }
    if (!this.state.verifyDone) this.setState({ verifyDone: true });
  };

  onViewChangeHandler = view => {
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
        <div className="login-container">
          {view === "signin" && (
            <>
              <div className="header flex center">
                <div className="app-title flex center">Benefact</div>
              </div>
              <SignIn
                onViewChangeHandler={this.onViewChangeHandler}
                onLoginHandler={onLoginHandler}
                compFetch={compFetch}
              />
            </>
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
              compFetch={compFetch}
              nonce={reset}
              page={this.props.page}
              onReset={() => this.setState({ view: "signin" })}
            />
          )}
        </div>
      </div>
    );
  }
}

export default PageWrapper(Login);
