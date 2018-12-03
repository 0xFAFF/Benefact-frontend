import React from "react";
import Kanban from "./Kanban";
import List from "./List";
import data from "../../initial-data";
import { camelCase, getCards } from "../../utils";
import "./Base.scss";

class Base extends React.Component {
  state = {
    isLoading: true,
    view: "kanban"
  };

  componentDidMount() {
    let formattedData = camelCase(data);
    this.setState({
      isLoading: false,
      ...formattedData,
      columnOrder: formattedData.columns.map(column => column.id)
    });
  }

  kanbanOnDragEnd = result => {
    const { destination, source, draggableId, type } = result;
    // check if there is a destination
    if (!destination) return;

    // check if droppable has moved
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Move columns around
    if (type === "column") {
      const newColumnOrder = Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        columnOrder: newColumnOrder
      };
      this.setState(newState);
      return;
    }

    // source column of droppable
    const start = this.state.columns.find(
      column => `col-${column.id}` === source.droppableId
    );
    // destination column of droppable
    const finish = this.state.columns.find(
      column => `col-${column.id}` === destination.droppableId
    );

    // Moving within one column
    if (start === finish) {
      // new cards nonmutated array
      let cardsSrcCol = getCards(this.state.cards, source.droppableId, "col-");
      let cardsNotSrcDestCols = this.state.cards.filter(
        card =>
          `col-${card.columnId}` !== source.droppableId &&
          `col-${card.columnId}` !== destination.droppableId
      );
      const draggedCard = cardsSrcCol.find(
        card => `card-${card.id}` === draggableId
      );
      // Orders array for inserting droppable in new spot
      cardsSrcCol.splice(source.index, 1);
      cardsSrcCol.splice(destination.index, 0, draggedCard);
      const newState = {
        ...this.state,
        cards: [...cardsSrcCol, ...cardsNotSrcDestCols]
      };
      this.setState(newState);
      return;
      // Call endpoint here to API endpoint to connect to backend as well
    }

    // Moving card from one column to another
    let cardsSrcCol = getCards(this.state.cards, source.droppableId, "col-");
    let cardsDestCol = getCards(
      this.state.cards,
      destination.droppableId,
      "col-"
    );
    let cardsNotSrcDestCols = this.state.cards.filter(
      card =>
        `col-${card.columnId}` !== source.droppableId &&
        `col-${card.columnId}` !== destination.droppableId
    );
    const draggedCard = cardsSrcCol.find(
      card => `card-${card.id}` === draggableId
    );

    // convert col-# string into integer #
    draggedCard.columnId = +destination.droppableId.replace(/^\D+/g, "");

    cardsSrcCol.splice(source.index, 1);
    cardsDestCol.splice(destination.index, 0, draggedCard);

    const newState = {
      ...this.state,
      cards: [...cardsSrcCol, ...cardsDestCol, ...cardsNotSrcDestCols]
    };
    this.setState(newState);
  };

  listOnDragEnd = result => {
    const { destination, source, draggableId } = result;
    // check if there is a destination
    if (!destination) return;
    // check if droppable has moved
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let cards = [...this.state.cards];
    const draggedCard = cards.find(card => `card-${card.id}` === draggableId);
    // Orders array for inserting droppable in new spot
    cards.splice(source.index, 1);
    cards.splice(destination.index, 0, draggedCard);
    const newState = {
      ...this.state,
      cards: [...cards]
    };
    this.setState(newState);
    return;
    // Call endpoint here to API endpoint to connect to backend as well
  };

  // Note: combine updateCardContent and updateColumnContent into one function
  updateCardContent = newContent => {
    let cards = [...this.state.cards];
    cards[cards.findIndex(card => card.id === newContent.id)] = newContent;
    const newState = {
      ...this.state,
      cards
    };
    this.setState(newState);
  };
  updateColumnContent = newContent => {
    let columns = [...this.state.columns];
    columns[
      columns.findIndex(column => column.id === newContent.id)
    ] = newContent;
    const newState = {
      ...this.state,
      columns
    };
    this.setState(newState);
  };

  addNewCard = (newContent, columnId) => {
    const newId = this.state.cards.length + 1;
    const newCard = {
      id: newId,
      title: newContent.title || "",
      description: newContent.description || "",
      categories: newContent.categories || [],
      columnId: columnId
    };
    const newState = {
      ...this.state,
      cards: [...this.state.cards, newCard]
    };
    this.setState(newState);
  };

  addNewColumn = title => {
    const newId = this.state.columns.length + 1;
    const newColumn = {
      id: newId,
      title
    };
    const newState = {
      ...this.state,
      columns: [...this.state.columns, newColumn],
      columnOrder: [...this.state.columnOrder, newId]
    };
    this.setState(newState);
  };

  addNewTag = tag => {
    const { name, color = null, character = null } = tag;
    const newId = this.state.tags.length + 1;
    const newTag = {
      id: newId,
      name,
      color,
      character
    };
    const newState = {
      ...this.state,
      tags: [...this.state.tags, newTag]
    };
    this.setState(newState);
  };

  render() {
    const { isLoading, view, ...kanbanState } = this.state;
    const { cards = [] } = this.state;
    if (isLoading || cards.length === 0) {
      return null;
    }
    const listState = {
      cards: this.state.cards,
      tags: this.state.tags
    };

    const kanbanFunctions = {
      kanbanOnDragEnd: this.kanbanOnDragEnd,
      updateCardContent: this.updateCardContent,
      updateColumnContent: this.updateColumnContent,
      addNewCard: this.addNewCard,
      addNewColumn: this.addNewColumn
    };

    const listFunctions = {
      listOnDragEnd: this.listOnDragEnd,
      updateCardContent: this.updateCardContent,
      addNewCard: this.addNewCard
    };
    return (
      <div id="views-base">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "10px"
          }}
        >
          <div className="base-button-group">
            <button
              className={`button-kanban ${
                this.state.view === "kanban" ? "button-active" : ""
              }`}
              onClick={() => this.setState({ view: "kanban" })}
            >
              Kanban
            </button>
            <button
              className={`button-list ${
                this.state.view === "list" ? "button-active" : ""
              }`}
              onClick={() => this.setState({ view: "list" })}
            >
              List
            </button>
          </div>
        </div>
        {this.state.view === "kanban" && (
          <Kanban {...kanbanState} {...kanbanFunctions} />
        )}
        {this.state.view === "list" && (
          <List {...listState} {...listFunctions} />
        )}
      </div>
    );
  }
}

export default Base;
