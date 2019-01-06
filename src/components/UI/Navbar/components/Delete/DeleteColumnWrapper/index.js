import React from "react";
import PropTypes from "prop-types";
import { Confirm } from "../../../../Popup";
import { getCards } from "../../../../../../utils";
import "./index.scss";

class DeleteColumnWrapper extends React.Component {
  static propTypes = {
    columns: PropTypes.array,
    cards: PropTypes.array,
    deleteComponent: PropTypes.func,
    onClose: PropTypes.func
  };

  state = {
    column: null
  };

  onAcceptHandler = () => {
    this.props.deleteComponent("columns", {
      id: this.state.column.id
    });
    this.props.onClose();
  };

  onCancelHandler = () => {
    this.setState({ column: null });
  };

  render() {
    const { columns, cards } = this.props;
    return (
      <div id="delete-column-outer">
        {!this.state.column ? (
          <React.Fragment>
            <div className="title">Columns</div>
            <div className="delete-button-group">
              {columns.map(column => {
                const cardNumber = getCards(cards, column.id).length;
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
