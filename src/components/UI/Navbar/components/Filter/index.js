import React from "react";
import PropTypes from "prop-types";
import Basic from "./Basic";
import "./index.scss";

class Filter extends React.Component {
  static propTypes = {
    setPopupStyle: PropTypes.func,
    columns: PropTypes.array,
    tags: PropTypes.array,
    filters: PropTypes.object,
    resetFilters: PropTypes.func,
    onChangeFilterHandler: PropTypes.func,
    selectFilters: PropTypes.func,
    onClose: PropTypes.func
  };

  state = {
    mode: "basic"
  };

  componentDidMount() {
    this.props.setPopupStyle({ width: "400px" });
  }
  componentWillUnmount() {
    this.props.setPopupStyle({ width: "300px" });
  }

  onAcceptHandler = () => {
    this.props.selectFilters();
    this.props.onClose();
  };

  toggleMode = mode => {
    if (mode !== this.state.mode) {
      this.setState({ mode });
    }
  };

  render() {
    return (
      <div id="filter-container">
        <div className="title">Filter Cards</div>
        <div className="button-group-modes">
          <button
            className={`button-basic ${
              this.state.mode === "basic" ? "button-active" : ""
            }`}
            onClick={() => this.toggleMode("basic")}
          >
            Basic
          </button>
          <button
            className={`button-advanced ${
              this.state.mode === "advanced" ? "button-active" : ""
            }`}
            onClick={() => this.toggleMode("advanced")}
          >
            Advanced
          </button>
        </div>
        {this.state.mode === "basic" && (
          <Basic {...this.props} onAcceptHandler={this.onAcceptHandler} />
        )}
      </div>
    );
  }
}

export default Filter;
