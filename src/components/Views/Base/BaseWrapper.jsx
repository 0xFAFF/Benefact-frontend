import React from "react";
import PropTypes from "prop-types";
import { getCards, camelCase, getFetching, fetching } from "../../../utils";
import { URLS } from "../../../constants";
import { PacmanLoader } from "../../UI/Loader";
import Base from "./Base";
import { Navbar } from "../../UI";
import { TagsProvider } from "../../UI/BoardComponents/Tags/TagsContext";

class BaseWrapper extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      cards: PropTypes.array,
      columns: PropTypes.array,
      tags: PropTypes.array
    }),
    isLoading: PropTypes.bool,
    error: PropTypes.string
  };

  state = {
    view: "kanban",
    cards: [],
    columns: [],
    tags: [],
    columnOrder: [],
    error: null
  };

  handleResetState = data => {
    const { columns = [], cards = [], tags = [] } = data;
    let columnOrder = columns.map(column => column.id);
    this.setState({
      cards: cards,
      columns: columns,
      tags: tags,
      columnOrder: columnOrder
    });
  };

  handleUpdate = async (type, action, newContent) => {
    const url = URLS(type, action);
    await fetching(url, "POST", newContent)
      .then(result => {
        if (result.hasError) {
          this.handleError(result.message);
        }
      })
      .then(async result => {
        const url = URLS("cards", "GET");
        await fetching(url, "GET").then(result => {
          let formattedData = camelCase(result.data);
          this.handleResetState(formattedData);
        });
      });
  };

  updateBoardContent = async (newContent, type) => {
    let boardType = [...this.state[type]];
    boardType[
      boardType.findIndex(type => type.id === newContent.id)
    ] = newContent;
    const newState = {
      ...this.state,
      [type]: boardType
    };
    const url = URLS(type, "UPDATE");
    await fetching(url, "POST", newContent).then(result => {
      if (result.hasError) {
        this.handleError(result.message);
      } else {
        this.setState(newState);
      }
    });
  };

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

      let newIndex = cardsSrcCol[destination.index]["index"];
      draggedCard["index"] = newIndex;
      // Orders array for inserting droppable in new spot
      cardsSrcCol.splice(source.index, 1);
      cardsSrcCol.splice(destination.index, 0, draggedCard);
      const newState = {
        ...this.state,
        cards: [...cardsSrcCol, ...cardsNotSrcDestCols]
      };
      this.setState(newState);
      this.handleUpdate("cards", "UPDATE", draggedCard);
      return;
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
    // Insert above an existing card
    if (destination.index < cardsDestCol.length) {
      let destIndex = cardsDestCol[destination.index].index;
      if (draggedCard.index < destIndex) {
        destIndex--;
      }
      draggedCard.index = destIndex;
      // Insert at the end of a column, if there are no cards don't update the card index
    } else if (cardsDestCol.length > 0) {
      let destIndex = cardsDestCol[cardsDestCol.length - 1].index;
      if (draggedCard.index > destIndex) {
        destIndex++;
      }
      draggedCard.index = destIndex;
    }

    cardsSrcCol.splice(source.index, 1);
    cardsDestCol.splice(destination.index, 0, draggedCard);

    const newState = {
      ...this.state,
      cards: [...cardsSrcCol, ...cardsDestCol, ...cardsNotSrcDestCols]
    };
    this.setState(newState);
    this.handleUpdate("cards", "UPDATE", draggedCard);
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
    this.handleUpdate("cards", "UPDATE", draggedCard);
    return;
  };

  addComponent = (componentType, content) => {
    const updatedComponent = { ...content };
    this.handleUpdate(componentType, "ADD", updatedComponent);
  };

  deleteComponent = (componentType, content) => {
    this.handleUpdate(componentType, "DELETE", content);
  };

  handleBoardView = view => {
    this.setState({ view });
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.data && this.props.data) {
      let formattedData = camelCase(this.props.data);
      this.handleResetState(formattedData);
    }
  }

  componentDidMount() {
    this.setState({ error: this.props.error });
  }

  render() {
    const { cards } = this.state;
    const { isLoading } = this.props;
    const { error = this.props.error, ...baseState } = this.state;

    const kanbanFunctions = {
      kanbanOnDragEnd: this.kanbanOnDragEnd,
      updateBoardContent: this.updateBoardContent,
      addComponent: this.addComponent,
      deleteComponent: this.deleteComponent
    };

    const listFunctions = {
      listOnDragEnd: this.listOnDragEnd,
      updateBoardContent: this.updateBoardContent,
      addComponent: this.addComponent,
      deleteComponent: this.deleteComponent
    };

    if (error) {
      return <div>Error: {error}</div>;
    } else if (isLoading || cards.length === 0) {
      return <PacmanLoader />;
    }
    return (
      <TagsProvider value={this.state.tags}>
        <div>
          <Navbar
            handleBoardView={this.handleBoardView}
            view={this.state.view}
            addComponent={this.addComponent}
            deleteComponent={this.deleteComponent}
            cards={this.state.cards}
            columns={this.state.columns}
            tags={this.state.tags}
          />
          <Base
            {...baseState}
            kanbanFunctions={kanbanFunctions}
            listFunctions={listFunctions}
          />
        </div>
      </TagsProvider>
    );
  }
}

export default getFetching(URLS("cards", "GET"))(BaseWrapper);
