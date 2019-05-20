import React from "react";
import { ContentSection } from "../content";

export class General extends React.Component {
  state = {};

  componentDidMount() {
    console.log(this.props);
    const { defaultPrivilege, description } = this.props.general;
    this.setState({
      defaultPrivilege,
      description
    });
  }

  render() {
    const sectionConfigs = [
      {
        uid: "description",
        header: "Description",
        content: <input name="description" value={this.state.description} />
      },
      {
        uid: "defaultPrivilege",
        header: "Default Privilege"
      },
      {
        uid: "create_board_link",
        header: "Board Invite Link"
      }
    ];
    return (
      <>
        {sectionConfigs.map(section => (
          <ContentSection key={section.uid} {...section} {...this.props} />
        ))}
      </>
    );
  }
}
