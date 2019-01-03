import React from "react";
import { Confirm } from "../../../../Popup";
import Preview from "../../../../MarkdownEditor/Preview";
import "./index.scss";

class DeleteCardWrapper extends React.Component {
  state = {
    card: null
  };

  componentDidMount() {
    this.props.setPopupStyle({ width: "400px" });
  }
  componentWillUnmount() {
    this.props.setPopupStyle({ width: "300px" });
  }

  onAcceptHandler = () => {
    this.props.deleteComponent("cards", { id: this.state.card.id });
    this.props.onClose();
  };

  onCancelHandler = () => {
    this.setState({ card: null });
  };

  render() {
    const { cardMap } = this.props;
    return (
      <div id="delete-card-outer">
        {!this.state.card ? (
          <React.Fragment>
            <div className="title">Cards</div>
            <div className="delete-button-container">
              <div className="delete-button-group">
                {cardMap.map(card => {
                  return (
                    <button
                      className="delete-button"
                      key={card.id}
                      onClick={() => this.setState({ card })}
                    >
                      {card.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </React.Fragment>
        ) : (
          <Confirm
            onAcceptHandler={this.onAcceptHandler}
            onCancelHandler={this.onCancelHandler}
          >
            <div id="selected-card">
              <Preview content={this.state.card} />
            </div>
          </Confirm>
        )}
      </div>
    );
  }
}
export default DeleteCardWrapper;
