import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Card } from "..";
import Header from "./Header";
import "./index.scss";

class InnerList extends React.Component {
  render() {
    return this.props.cards.map((card, index) => (
      <Card
        key={card.id}
        card={card}
        index={index}
        columns={this.props.columns}
        updateBoardContent={this.props.updateBoardContent}
        addComponent={this.props.addComponent}
        deleteComponent={this.props.deleteComponent}
      />
    ));
  }
}

class Column extends React.Component {
  state = { showModal: false, isDragDisabled: false };
  handleShowMessageClick = () => {
    this.setState({ showModal: true, isDragDisabled: true });
  };
  handleCloseModal = () =>
    this.setState({ showModal: false, isDragDisabled: false });

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.showModal !== this.state.showModal) {
      return true;
    } else if (nextProps.cards === this.props.cards) {
      return false;
    }
    return true;
  }

  render() {
    const draggingStyle = {
      backgroundColor: "rgb(238, 238, 238)",
      boxShadow:
        "2px 2px 4px rgba(0, 0, 0, 0.16), 2px 2px 4px rgba(0, 0, 0, 0.23)"
    };
    return (
      <Draggable
        draggableId={this.props.column.id}
        index={this.props.index}
        isDragDisabled={this.state.isDragDisabled}
      >
        {(provided, snapshot) => (
          <div
            id="column-draggable"
            className={snapshot.isDragging ? "col-is-dragging" : ""}
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={{ ...provided.draggableProps.style }}
          >
            <Header
              dragHandleProps={provided.dragHandleProps}
              title={this.props.column.title}
              addComponent={this.props.addComponent}
              columnId={this.props.column.id}
              updateBoardContent={this.props.updateBoardContent}
              cardMap={this.props.cardMap}
              columns={this.props.columns}
              showModal={this.state.showModal}
              handleShowMessageClick={this.handleShowMessageClick}
              handleCloseModal={this.handleCloseModal}
            />
            <Droppable droppableId={`col-${this.props.column.id}`} type="card">
              {(provided, snapshot) => (
                <div
                  id="column-droppable"
                  ref={provided.innerRef}
                  style={snapshot.isDraggingOver ? draggingStyle : {}}
                  {...provided.droppableProps}
                >
                  <InnerList
                    cards={this.props.cards}
                    columns={this.props.columns}
                    updateBoardContent={this.props.updateBoardContent}
                    addComponent={this.props.addComponent}
                    deleteComponent={this.props.deleteComponent}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    );
  }
}

export default Column;
