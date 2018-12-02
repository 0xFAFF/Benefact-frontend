import React from "react";
import Kanban from "./Kanban";
import List from "./List";

class Base extends React.Component {
  state = {
    view: "kanban"
  };
  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "10px"
          }}
        >
          <div style={{ marginRight: "10px" }}>View</div>
          <div>
            <button onClick={() => this.setState({ view: "kanban" })}>
              Kanban
            </button>
            <button onClick={() => this.setState({ view: "list" })}>
              List
            </button>
          </div>
        </div>
        {this.state.view === "kanban" && <Kanban />}
        {this.state.view === "list" && <List />}
      </div>
    );
  }
}

export default Base;
