import React from "react";
import PropTypes from "prop-types";
import { SignIn, Register } from "./Views";
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
    verifyDone: false,
  };

  componentDidMount = async () => {
    this.props.setChild(this);
    if(!this.props.token && this.props.query.nonce)
      notifyToast("info", "Please login to verify your email address", "top-center");
  }

  componentDidUpdate = async (props) => {
    if(!this.props.token)
      return;
    if(this.props.query.nonce && !this.state.verifyDone) {
      let verified = await this.props.compFetch("users", "VERIFY", { nonce: this.props.query.nonce })
      if(verified === undefined)
        return;
      if(verified)
        notifyToast("info", "Email succesfully verified", "top-center");
    }
    if(!this.state.verifyDone)
      this.setState({verifyDone: true});
  }

  onViewChangeHandler = view => {
    this.setState({ view });
  };

  render() {
    const { view } = this.state;
    const { onLoginHandler, compFetch } = this.props;
    if(this.state.verifyDone && this.props.token)
       return <Redirect to="/board/1" />
    return (
      <div id="login">
        <div className="login-container">
          <div className="header">
            <div className="app-title">Benefact</div>
            <img
              src={"/fafficon.ico"}
              alt={"fafficon.ico"}
              width="70"
              height="70"
            />
          </div>
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
        </div>
      </div>
    );
  }
}

export default PageWrapper(Login);
