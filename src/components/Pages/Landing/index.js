import React from "react";
import PropTypes from "prop-types";
import PageWrapper from "components/Pages/PageWrapper";
import { RenderContent } from "./content";
import { TwoSectionMenu } from "components/UI/PageComponents";

import "./index.scss";
import Boards from "./content/Boards";
import MyCards from "./content/MyCards";

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

  dataSource = () =>
    this.props.compFetch("users", "CURRENT").then(data => {
      return { data };
    });

  render() {
    const menuTabs = [
      {
        header: "Boards",
        comp: Boards
      },
      {
        header: "My Cards",
        comp: MyCards
      }
    ];
    return (
      <div id="landing-container" className="flex grow">
        <TwoSectionMenu menuTabs={menuTabs} {...this.props} />
      </div>
    );
  }
}

export default PageWrapper(Landing);
