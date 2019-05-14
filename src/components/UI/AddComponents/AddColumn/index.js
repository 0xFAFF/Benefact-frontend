import React from "react";
import PropTypes from "prop-types";
import { AcceptCancelButtons } from "../../Popup";

class AddColumn extends React.Component {
  static propTypes = {
    handleUpdate: PropTypes.func,
    onAcceptHandler: PropTypes.func
  };

  state = {
    title: ""
  };

  onTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  onResetHandler = () => {
    this.setState({ title: "" });
  };

  onAcceptHandler = () => {
    const { handleUpdate, onAcceptHandler } = this.props;
    handleUpdate("columns", "ADD", { title: this.state.title });
    if (onAcceptHandler) {
      onAcceptHandler();
    }
  };

  render() {
    return (
      <div id="add-column">
        <div className="input-container">
          <label>Column Title</label>
          <input value={this.state.title} onChange={this.onTitleChange} />
        </div>
        <AcceptCancelButtons
          onAcceptHandler={this.onAcceptHandler}
          onCancelHandler={this.onResetHandler}
          acceptTitle={"Create"}
          cancelTitle={"Reset"}
        />
      </div>
    );
  }
}

export default AddColumn;
