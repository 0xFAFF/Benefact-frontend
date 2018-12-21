import React from "react";
import { Card } from "..";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Header from "./Header";
import "./index.scss";

class InnerList extends React.Component {
  render() {
    return this.props.cards.map((card, index) => (
      <Card
        key={card.id}
        card={card}
        index={index}
        updateBoardContent={this.props.updateBoardContent}
        addNewTag={this.props.addNewTag}
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
    return (
      <Draggable
        draggableId={this.props.column.id}
        index={this.props.index}
        isDragDisabled={this.state.isDragDisabled}
      >
        {provided => (
          <div
            id="column-draggable"
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={{ ...provided.draggableProps.style }}
          >
            <Header
              dragHandleProps={provided.dragHandleProps}
              title={this.props.column.title}
              addNewCard={this.props.addNewCard}
              columnId={this.props.column.id}
              updateBoardContent={this.props.updateBoardContent}
              cardMap={this.props.cardMap}
              showModal={this.state.showModal}
              handleShowMessageClick={this.handleShowMessageClick}
              handleCloseModal={this.handleCloseModal}
            />
            <Droppable droppableId={`col-${this.props.column.id}`} type="card">
              {(provided, snapshot) => (
                <div
                  id="column-droppable"
                  ref={provided.innerRef}
                  style={{
                    backgroundColor: snapshot.isDraggingOver
                      ? "skyblue"
                      : "inherit"
                  }}
                  {...provided.droppableProps}
                >
                  <InnerList
                    cards={this.props.cards}
                    updateBoardContent={this.props.updateBoardContent}
                    addNewTag={this.props.addNewTag}
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
