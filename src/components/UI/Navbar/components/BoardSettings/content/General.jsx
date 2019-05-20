import React from "react";
import { ContentSection } from "../content";

export class General extends React.Component {
  state = {};

  componentDidMount() {
    const { defaultPrivilege, description } = this.props.general;
    this.setState({
      defaultPrivilege,
      description
    });
  }

  render() {
    const sectionConfigs = [
      {
        header: "Description",
        content: (
          <input
            name="description"
            value={this.state.description || ""}
            onChange={e => this.setState({ description: e.target.value })}
          />
        )
      },
      {
        header: "Default Privilege",
        content: (
          <input
            name="defaultPrivilege"
            value={this.state.defaultPrivilege || ""}
            onChange={e => this.setState({ defaultPrivilege: e.target.value })}
          />
        )
      },
      {
        uid: "create_board_link",
        header: "Board Invite Link"
      }
    ];
    return (
      <>
        {sectionConfigs.map(section => (
          <ContentSection key={section.header} {...section} {...this.props} />
        ))}
      </>
    );
  }
}
