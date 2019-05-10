import React from "react";
import PropTypes from "prop-types";
import { SignIn, Register } from "./Views";
import PageWrapper from "../../Pages/PageWrapper";
import { Redirect } from "react-router-dom";
import "./index.scss";
import { notifyToast, parseQuery } from "../../../utils";

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
      buttons: null
    };
  };

  componentDidMount = async () => {
    this.props.setChild(this);
    if (!this.props.token && this.props.query.nonce)
      notifyToast("info", "Please login to verify your email address");
  };

  componentDidUpdate = async _ => {
    if (!this.props.token) return;
    if (this.props.query.nonce && !this.state.verifyDone) {
      let verified = await this.props.compFetch("users", "VERIFY", {
        nonce: this.props.query.nonce
      });
      if (verified === undefined) return;
      if (verified) notifyToast("info", "Email succesfully verified");
    }
    if (!this.state.verifyDone) this.setState({ verifyDone: true });
  };

  onViewChangeHandler = view => {
    this.setState({ view });
  };

  render() {
    const { view, verifyDone } = this.state;
    const { onLoginHandler, compFetch, token } = this.props;
    const query = parseQuery();
    if (verifyDone && token) return <Redirect to={query.redirect || "/board/benefact"} />;
    return (
      <div id="login" className="flex grow center">
        <div className="login-container">
          {view === "signin" && (
            <>
              <div className="header flex center">
                <div className="app-title flex center">Benefact</div>
                <img src={"/fafficon.png"} alt={""} width="70" height="70" />
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
        </div>
      </div>
    );
  }
}

export default PageWrapper(Login);
