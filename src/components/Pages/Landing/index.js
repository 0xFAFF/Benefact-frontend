import React from "react";
import PropTypes from "prop-types";
import PageWrapper from "components/Pages/PageWrapper";
import { TwoSectionMenu } from "components/UI/PageComponents";

import "./index.scss";
import Boards from "./content/Boards";
import { UserActivity, UserCards } from "components/UI/User";

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
      const boardLookup = data.boards.reduce((boards, board) => {
        boards[board.id] = { ...board };
        return boards;
      }, {});
      data.boardLookup = boardLookup;
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
        comp: UserCards
      },
      {
        header: "My Activity",
        comp: UserActivity
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
