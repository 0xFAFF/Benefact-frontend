import React from "react";
import PropTypes from "prop-types";
import PageWrapper from "components/Pages/PageWrapper";
import { RenderContent } from "./content";
import { TwoSectionMenu } from "components/UI/PageComponents"
import "./index.scss";

class Landing extends React.Component {
  static propTypes = {
    page: PropTypes.shape({
      data: PropTypes.shape({
        roles: PropTypes.array,
        user: PropTypes.object
      })
    })
  };

  componentDidMount = () => {
    this.props.setChild(this);
  };
  navbar = props => {
    return {
      title: "Benefact",
      buttons: []
    };
  };

  dataSource = () =>
    this.props.compFetch("users", "CURRENT").then(data => {
      return { data };
    });

  state = {
    activeMenu: "boards"
  };

  handleActiveMenu = menu => {
    this.setState({ activeMenu: menu });
  };

  render() {
    const menuTabs = [
      {
        uid: "boards",
        header: "Boards"
      },
      {
        uid: "myCards",
        header: "My Cards"
      }
    ];
    return (
      <>
        <div id="landing-container" className="flex grow">
          <TwoSectionMenu menuTabs={menuTabs} activeMenu={this.state.activeMenu} handleActiveMenu={this.handleActiveMenu}>
            <RenderContent content={this.state.activeMenu} {...this.props} />
          </TwoSectionMenu>
        </div>
      </>
    );
  }
}

export default PageWrapper(Landing);
