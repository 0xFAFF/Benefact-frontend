import React from "react";
import PropTypes from "prop-types";
import PageWrapper from "components/Pages/PageWrapper";
import { RenderContent } from "./content";
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
    return (
      <>
        <div id="landing-container" className="flex grow">
          <div id="tabs">
            {tabs.map(({ id, title }) => {
              return (
                <React.Fragment key={id}>
                  <div
                    key={id}
                    className={`tab ${id === this.state.activeContent ? "active" : ""}`}
                    id={title}
                    onClick={() => this.handleActiveContent(id)}
                  >
                    {title}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <div id="content">
            <RenderContent content={this.state.activeContent} {...this.props} />
          </div>
        </div>
      </>
    );
  }
}

export default PageWrapper(Landing);
