import React from "react";
import "./index.scss";
import PageWrapper from "components/Pages/PageWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TwoSectionMenu } from "components/UI";
import MyActivity from "components/UI/User/MyActivity";

class User extends React.Component {
  componentDidMount = () => {
    this.props.setChild(this);
    const {
      page: { match, history, user }
    } = this.props;
    if (!match.params.userId) {
      history.replace(`/user/${user.name}`);
    }
  };
  dataSource = async page => {
    const { match, compFetch, user } = page;
    const userId = match.params.userId || user.name;
    let data = await compFetch("users", "GET", { name: userId });
    const boardLookup = data.boards.reduce((boards, board) => {
      boards[board.id] = { ...board };
      return boards;
    }, {});
    data.boardLookup = boardLookup;
    return { data };
  };
  navbar = props => {
    return {
      title: props.page.data && props.page.data.user.name,
      buttons: []
    };
  };

  menuTabs = [
    {
      header: "Activity",
      comp: MyActivity
    },
    {
      header: "Boards"
    },
    {
      header: "Cards"
    }
  ];
  render() {
    const {
      page: { data, isLoading }
    } = this.props;
    if (isLoading || !data) return <></>;
    return (
      <div id="user-profile" class="col grow">
        <div class="row">
          <div className="grow pull-right">
            <FontAwesomeIcon icon="user" className="avatar" />
          </div>
          <div className="grow">
            <h1 className="grow">{data.user.name}</h1>
            <h2 className="grow">{data.user.email}</h2>
          </div>
        </div>
        <TwoSectionMenu menuTabs={this.menuTabs} {...this.props} />
      </div>
    );
  }
}

export default PageWrapper(User);
