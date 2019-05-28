import React from "react";
import "./index.scss";
import PageWrapper from "components/Pages/PageWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TwoSectionMenu } from "components/UI";
import { UserActivity, UserCards } from "components/UI/User";

interface Props {
  setChild(thisClass: React.Component): void;
  page: {
    match: {
      params: {
        userId?: string;
      };
    };
    compFetch(type: string, action: string, queryParams?: { name?: string }): any;
    history: { replace(url?: string): void };
    user: { name?: string };
    data: {
      user: {
        name?: string;
        email?: string;
      };
      assignedCards: Array<any>;
      createdCards: Array<any>;
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

class User extends React.Component<Props, State> {
  componentDidMount = () => {
    this.props.setChild(this);
    const {
      page: {
        match,
        history: { replace },
        user
      }
    } = this.props;
    if (!match.params.userId) {
      replace(`/user/${user.name}`);
    }
  };
  dataSource = async (page: Props["page"]) => {
    const { match, compFetch, user } = page;
    const userId = match.params.userId || user.name;
    let data = await compFetch("users", "GET", { name: userId });
    const boardLookup = data.boards.reduce((boards: any, board: any) => {
      boards[board.id] = { ...board };
      return boards;
    }, {});
    data.boardLookup = boardLookup;
    return { data };
  };
  navbar = (props: Props) => {
    return {
      title: props.page.data && props.page.data.user.name,
      buttons: []
    };
  };
  render() {
    const {
      page: { data: { createdCards = [], assignedCards = [], user = null } = {}, isLoading }
    } = this.props;

    const menuTabs = [
      {
        header: "Activity",
        comp: UserActivity
      },
      {
        header: "Created",
        comp: UserCards,
        props: { cards: createdCards }
      },
      {
        header: "Assigned",
        comp: UserCards,
        props: { cards: assignedCards }
      }
    ];
    if (isLoading || !user) return <></>;
    return (
      <div id="user-profile" className="col grow">
        <div className="row">
          <div className="grow pull-right">
            <FontAwesomeIcon icon="user" className="avatar" />
          </div>
          <div className="grow">
            <h1 className="grow">{user.name}</h1>
            <h2 className="grow">{user.email}</h2>
          </div>
        </div>
        <TwoSectionMenu menuTabs={menuTabs} {...this.props} />
      </div>
    );
  }
}

export default PageWrapper(User);
