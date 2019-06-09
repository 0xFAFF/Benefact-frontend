import React from "react";
import PropTypes from "prop-types";
import PageWrapper from "components/Pages/PageWrapper";
import { TwoSectionMenu } from "components/UI/PageComponents";
import "./Landing.scss";
import Boards from "./content/Boards";
import { UserActivity, UserCards } from "components/UI/User";

interface Props {
  setChild(thisClass: React.Component): void;
  page: {
    match: {
      params: {
        tab?: string;
      };
    };
    compFetch(type: string, action: string, queryParams?: any, errorHandler?: any): any;
    history: { replace(url?: string): void; push(url?: string): void };
    user: { name?: string };
    data: {
      user: {
        name?: string;
        email?: string;
      };
      assignedCards: Array<any>;
    };
    isLoading?: boolean;
  };
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

class Landing extends React.Component<Props, State> {
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
    this.props.compFetch("users", "CURRENT").then((data: any) => {
      const boardLookup = data.boards.reduce((boards: any, board: any) => {
        boards[board.id] = { ...board };
        return boards;
      }, {});
      data.boardLookup = boardLookup;
      return { data };
    });

  updateUrl = (tabIndex: number) => {
    this.props.page.history.push(`/home/${this.tabsMap[tabIndex]}`);
  };

  tabsMap = ["boards", "mycards", "myactivity"];

  render() {
    const {
      match: { params: { tab = "boards" } = {} } = {},
      data: { assignedCards = [] } = {}
    } = this.props.page;
    const menuTabs = [
      {
        header: "Boards",
        comp: Boards
      },
      {
        header: "My Cards",
        comp: UserCards,
        props: { cards: assignedCards }
      },
      {
        header: "My Activity",
        comp: UserActivity
      }
    ];

    const initialIndex = this.tabsMap.findIndex(tabMap => tabMap === tab);
    return (
      <div id="landing-container" className="flex grow">
        <TwoSectionMenu
          className="grow"
          menuTabs={menuTabs}
          initialIndex={initialIndex !== -1 ? initialIndex : 0}
          onClick={this.updateUrl}
          {...this.props}
        />
      </div>
    );
  }
}

export default PageWrapper(Landing);
