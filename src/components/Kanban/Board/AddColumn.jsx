import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AddColumn extends React.Component {
  state = {
    openMenu: false,
    title: ""
  };

  toggleMenu = bool => {
    this.setState({ openMenu: bool, title: "" });
  };

  onTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  render() {
    return (
      <div
        className={`add-column-container ${
          !this.state.openMenu ? "closed" : "open"
        }`}
      >
        {!this.state.openMenu && (
          <div
            className="add-column-closed-menu"
            onClick={() => this.toggleMenu(true)}
          >
            <FontAwesomeIcon icon="plus" size="sm" />
            <span>Add another column</span>
          </div>
        )}
        {this.state.openMenu && (
          <div className="add-column-open-menu">
            <label>Enter column title...</label>
            <input value={this.state.title} onChange={this.onTitleChange} />
            <div>
              <button
                onClick={() => {
                  this.props.addNewColumn(this.state.title);
                  this.toggleMenu(false);
                }}
              >
                Add Column
              </button>
              <span>
                <FontAwesomeIcon
                  icon="times"
                  size="lg"
                  style={{ cursor: "pointer" }}
                  onClick={() => this.toggleMenu(false)}
                />
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AddColumn;
