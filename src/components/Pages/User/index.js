import React from "react";
import Profile from "./Profile";
import "./index.scss";
import PageWrapper from "components/Pages/PageWrapper";

class User extends React.Component {
  componentDidMount = () => {
    this.props.setChild(this);
  }
  navbar = (props) => {
    return {
      title: "User",
      buttons: []
    }
  }
  render() {
    return (
      <div id="user-container">
        <Profile />
      </div>
    );
  }
}

export default PageWrapper(User);
