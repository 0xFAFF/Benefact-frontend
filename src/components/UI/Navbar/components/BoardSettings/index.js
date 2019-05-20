import React from "react";
import { TwoSectionMenu } from "components/UI/PageComponents"
import { RenderContent } from "./content"
import "./index.scss";

class BoardSettings extends React.Component {
  static propTypes = {};

  state = {
    activeMenu: "general"
  };

  handleActiveMenu = menu => {
    this.setState({ activeMenu: menu });
  };

  render() {
    const menuTabs = [
      {
        uid: "general",
        header: "General",
      },
      {
        uid: "columns",
        header: "Columns",
      },
      {
        uid: "tags",
        header: "Tags",
      }
    ];

    return (
      <div id="board-settings" className="flex col">
        <div className="flex">
          <h1 className="center">Board Settings</h1>
        </div>
        <TwoSectionMenu menuTabs={menuTabs} activeMenu={this.state.activeMenu} handleActiveMenu={this.handleActiveMenu}>
          <RenderContent content={this.state.activeMenu} {...this.props} />
          </TwoSectionMenu>
      </div>
    );
  }
}
export default BoardSettings;
