import React from "react";
import PropTypes from "prop-types";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Card } from "../../BoardComponents";
import Header from "./Header";
import "./index.scss";

const InnerList = props => {
  const { colCards, ...rest } = props;
  return colCards.map((card, index) => <Card key={card.id} index={index} card={card} {...rest} />);
};

InnerList.propTypes = {
  colCards: PropTypes.array,
  columns: PropTypes.array,
  updateBoardContent: PropTypes.func,
  addComponent: PropTypes.func,
  deleteComponent: PropTypes.func,
  handleResetBoard: PropTypes.func,
  handleUpdateS: PropTypes.func
};

class Column extends React.Component {
  static propTypes = {
    column: PropTypes.object,
    columns: PropTypes.array,
    cards: PropTypes.array,
    colCards: PropTypes.array,
    index: PropTypes.number,
    addComponent: PropTypes.func,
    deleteComponent: PropTypes.func,
    updateBoardContent: PropTypes.func,
    handleResetBoard: PropTypes.func,
    handleUpdate: PropTypes.func
  };

  state = {
    showModal: false,
    isDragDisabled: false
  };

  handleOpenModal = () => {
    this.setState({ showModal: true, isDragDisabled: true });
  };
  handleCloseModal = () => this.setState({ showModal: false, isDragDisabled: false });

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.showModal !== this.state.showModal) {
      return true;
    } else if (nextProps.cards === this.props.cards) {
      return false;
    }
    return true;
  }

  render() {
    const {
      column,
      columns,
      cards,
      colCards,
      index,
      addComponent,
      deleteComponent,
      updateBoardContent,
      handleResetBoard,
      handleUpdate
    } = this.props;

    const draggingStyle = { backgroundColor: "#f3f3f3" };
    return (
      <Draggable draggableId={column.id} index={index} isDragDisabled={this.state.isDragDisabled}>
        {(provided, snapshot) => (
          <div
            id="column-draggable"
            className={snapshot.isDragging ? "col-is-dragging" : ""}
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={{ ...provided.draggableProps.style }}
          >
            <div className="column-container">
              <Header
                dragHandleProps={provided.dragHandleProps}
                showModal={this.state.showModal}
                handleOpenModal={this.handleOpenModal}
                handleCloseModal={this.handleCloseModal}
                title={column.title}
                columnId={column.id}
                addComponent={addComponent}
                updateBoardContent={updateBoardContent}
                cards={cards}
                columns={columns}
              />
              <Droppable droppableId={`col-${column.id}`} type="card">
                {(provided, snapshot) => (
                  <div
                    id="column-droppable"
                    ref={provided.innerRef}
                    style={snapshot.isDraggingOver ? draggingStyle : {}}
                    {...provided.droppableProps}
                  >
                    <InnerList
                      colCards={colCards}
                      columns={columns}
                      updateBoardContent={updateBoardContent}
                      addComponent={addComponent}
                      deleteComponent={deleteComponent}
                      handleResetBoard={handleResetBoard}
                      handleUpdate={handleUpdate}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

export default Column;
