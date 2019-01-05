import React from "react";
import { AcceptCancelButtons } from "../../Popup";

class AddColumn extends React.Component {
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
    const { addComponent, onAcceptHandler } = this.props;
    addComponent("columns", { title: this.state.title });
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
