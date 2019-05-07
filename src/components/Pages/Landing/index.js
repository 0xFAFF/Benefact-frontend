import React from "react";
import PageWrapper from "components/Pages/PageWrapper";
import { RenderContent } from "./content";
import "./index.scss";

class Landing extends React.Component {
  componentDidMount = () => {
    this.props.setChild(this);
  };
  navbar = props => {
    return {
      title: "",
      buttons: []
    };
  };

  dataSource = () => this.props.compFetch("users", "CURRENT");

  state = {
    activeContent: "boards"
  };

  handleActiveContent = content => {
    this.setState({ activeContent: content });
  };

  render() {
    const tabs = [
      {
        id: "boards",
        title: "Boards"
      },
      {
        id: "myCards",
        title: "My Cards"
      }
    ];
    console.log(this.props);
    return (
      <div id="landing-container" className="flex grow">
        <div id="tabs">
          {tabs.map(({ id, title }) => {
            return (
              <div key={id} className="tab" id={title} onClick={() => this.handleActiveContent(id)}>
                {title}
              </div>
            );
          })}
        </div>
        <div id="content">
          <RenderContent content={this.state.activeContent} />
        </div>
      </div>
    );
  }
}

export default PageWrapper(Landing);
