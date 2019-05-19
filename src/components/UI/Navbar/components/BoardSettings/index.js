import React from "react";
import PropTypes from "prop-types";
import { General, Columns, Tags } from "./components";
import "./index.scss";

class BoardSettings extends React.Component {
  static propTypes = {};

  state = {
    section: "general"
  };

  handleSection = section => {
    this.setState({ section });
  };

  render() {
    const sections = [
      {
        uid: "general",
        label: "General",
        component: General
      },
      {
        uid: "columns",
        label: "Columns",
        component: Columns
      },
      {
        uid: "tags",
        label: "Tags",
        component: Tags
      }
    ];

    const Content = sections.find(({ uid }) => uid === this.state.section).component;

    return (
      <div id="board-settings" className="flex col">
        <div className="flex">
          <h1 className="center">Board Settings</h1>
        </div>
        <div id="container" className="flex row">
          <div id="section">
            {sections.map(({ uid, label }) => {
              return (
                <div
                  key={uid}
                  onClick={() => this.handleSection(uid)}
                  className={`section-headers ${uid === this.state.section ? "active" : ""} `}
                >
                  {label}
                </div>
              );
            })}
          </div>
          <div id="content">
            <Content />
          </div>
        </div>
      </div>
    );
  }
}
export default BoardSettings;
