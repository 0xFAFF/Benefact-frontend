import React from "react";
import { Confirm } from "../../../../Popup";
import { getCards } from "../../../../../../utils";
import "./index.scss";

class DeleteColumnWrapper extends React.Component {
  state = {
    column: null
  };

  onAcceptHandler = () => {
    this.props.deleteComponent("columns", "DELETE", {
      id: this.state.column.id
    });
    this.props.onClose();
  };

  onCancelHandler = () => {
    this.setState({ column: null });
  };

  render() {
    const { columns, cardMap } = this.props;
    return (
      <div id="delete-column-outer">
        {!this.state.column ? (
          <React.Fragment>
            <div className="title">Columns</div>
            <div className="delete-button-group">
              {columns.map(column => {
                const cardNumber = getCards(cardMap, column.id).length;
                return (
                  <button
                    onClick={() => {
                      if (cardNumber === 0) {
                        this.setState({ column });
                      }
                    }}
                    className={`delete-button ${
                      cardNumber ? "unselectable" : "selectable"
                    }`}
                    key={column.id}
                  >
                    ({cardNumber}) {column.title}
                  </button>
                );
              })}
            </div>
          </React.Fragment>
        ) : (
          <Confirm
            onAcceptHandler={this.onAcceptHandler}
            onCancelHandler={this.onCancelHandler}
          >
            <div id="selected-column">Column: {this.state.column.title}</div>
          </Confirm>
        )}
      </div>
    );
  }
}
export default DeleteColumnWrapper;
