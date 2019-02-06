import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import { getCards, camelCase, getFetching, fetching } from "../../../utils";
import { URLS } from "../../../constants";
import { PacmanLoader } from "../../UI/Loader";
import Base from "./Base";
import { Navbar } from "../../UI";
import { TagsProvider } from "../../UI/BoardComponents/Tags/TagsContext";

class BaseWrapper extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      cards: PropTypes.object,
      columns: PropTypes.array,
      tags: PropTypes.array
    }),
    isLoading: PropTypes.bool,
    error: PropTypes.string
  };

  state = {
    view: "kanban",
    cards: {},
    columns: [],
    tags: [],
    columnOrder: [],
    error: null,
    filters: {
      active: false,
      currGroupIndex: 0,
      groups: [
        {
          filterBy: {
            tags: [],
            columnId: "",
            title: ""
          },
          matchBy: "all"
        }
      ]
    }
  };

  createFilterGroup = () => {
    this.setState(prevState => {
      let newState = { ...prevState };
      newState.filters.groups.push({
        filterBy: {
          tags: [],
          columnId: "",
          title: ""
        },
        matchBy: "all"
      });
      return newState;
    });
  };

  updateFilterGroupIndex = index => {
    this.setState(prevState => {
      let newState = { ...prevState };
      newState.filters.currGroupIndex = index;
      return newState;
    });
  };

  onChangeFilterHandler = (e, key, groupIndex = 0) => {
    if (key === "matchBy") {
      this.setState(prevState => {
        let newState = { ...prevState };
        newState.filters.groups[groupIndex] = {
          ...prevState.filters.groups[groupIndex],
          matchBy: e
        };
        return newState;
      });
    } else if (key === "tags") {
      let selectedTags = [
        ...this.state.filters.groups[groupIndex].filterBy.tags
      ];
      const selectedTagIndex = selectedTags.findIndex(tag => tag.id === e.id);
      if (selectedTagIndex > -1) {
        selectedTags.splice(selectedTagIndex, 1);
      } else {
        selectedTags.push(e);
      }
      this.setState(prevState => {
        let newState = { ...prevState };
        newState.filters.groups[groupIndex] = {
          ...prevState.filters.groups[groupIndex],
          filterBy: {
            ...prevState.filters.groups[groupIndex].filterBy,
            tags: selectedTags
          }
        };
        return newState;
      });
    } else if (key === "columnId") {
      e.persist();
      this.setState(prevState => {
        let newState = { ...prevState };
        newState.filters.groups[groupIndex] = {
          ...prevState.filters.groups[groupIndex],
          filterBy: {
            ...prevState.filters.groups[groupIndex].filterBy,
            columnId: e.target.value === "" ? null : parseInt(e.target.value)
          }
        };
        return newState;
      });
    } else if (key === "title") {
      e.persist();
      this.setState(prevState => {
        let newState = { ...prevState };
        newState.filters.groups[groupIndex] = {
          ...prevState.filters.groups[groupIndex],
          filterBy: {
            ...prevState.filters.groups[groupIndex].filterBy,
            title: e.target.value
          }
        };
        return newState;
      });
    }
  };

  selectFilters = () => {
    let queryParams = {};
    const {
      filters: { groups = [] }
    } = this.state;
    groups.forEach((group, index) => {
      const { matchBy, filterBy } = group;
      const { tags, columnId, title } = filterBy;
      let params;
      if (matchBy === "all") {
        params = {};
        Object.entries(filterBy).forEach(([filterKey, filterValue]) => {
          if (filterKey === "tags" && filterValue.length > 0) {
            params[filterKey] = filterValue.map(tag => tag.id);
          } else if (
            (filterKey === "columnId" || filterKey === "title") &&
            filterValue !== ""
          ) {
            params[filterKey] = filterValue;
          }
        });
      } else {
        params = [];
        if (tags.length > 0) {
          params = tags.map(tag => ({
            tags: [tag.id]
          }));
        }
        if (columnId !== "") {
          params.push({ columnId: columnId });
        }
        if (title !== "") {
          params.push({ title: title });
        }
      }
      if (!isEmpty(params)) {
        const keyName = `Group-${index}`;
        queryParams = {
          Groups: {
            ...queryParams["Groups"],
            [keyName]: Array.isArray(params) ? params : [params]
          }
        };
      }
    });

    !isEmpty(queryParams)
      ? this.updateFilters(queryParams)
      : this.updateFilters();
  };

  resetFilters = () => {
    this.setState({
      filters: {
        ...this.state.filters,
        currGroupIndex: 0,
        groups: [
          {
            filterBy: {
              tags: [],
              columnId: "",
              title: ""
            },
            matchBy: "all"
          }
        ]
      }
    });
    this.updateFilters();
  };

  handleResetState = data => {
    const { columns = [], cards = {}, tags = [] } = data;
    let columnOrder = columns.map(column => column.id);
    this.setState({
      cards: cards,
      columns: columns,
      tags: tags,
      columnOrder: columnOrder
    });
  };

  handleUpdate = async (type, action, queryParams) => {
    const url = URLS(type, action);
    await fetching(url, "POST", queryParams)
      .then(result => {
        if (result.hasError) {
          this.handleError(result.message);
        }
      })
      .then(async result => {
        const url = URLS("cards", "GET");
        if (this.state.filters.active) {
          this.selectFilters();
        } else {
          await fetching(url, "GET").then(result => {
            let formattedData = camelCase(result.data);
            this.handleResetState(formattedData);
          });
        }
      });
  };

  updateFilters = async queryParams => {
    const url = URLS("cards", "GET");
    await fetching(url, "POST", queryParams).then(result => {
      let formattedData = camelCase(result.data);
      this.handleResetState(formattedData);
      if (queryParams) {
        this.setState({
          filters: {
            ...this.state.filters,
            active: true
          }
        });
      } else {
        this.setState({
          filters: {
            ...this.state.filters,
            active: false
          }
        });
      }
    });
  };

  updateBoardContent = async (newContent, type) => {
    let boardType;
    let newState;
    if (type === "cards") {
      let cardGroups = { ...this.state[type] };
      const cards = Object.entries(cardGroups).map(
        ([cardGroupKey, cardGroupValue]) => {
          const cardIndex = cardGroupValue.findIndex(
            type => type.id === newContent.id
          );
          if (cardIndex > -1) {
            cardGroupValue[cardIndex] = newContent;
          }
          return { [cardGroupKey]: [...cardGroupValue] };
        }
      );
      newState = {
        ...this.state,
        cards: Object.assign(...cards)
      };
    } else {
      boardType = [...this.state[type]];
      boardType[
        boardType.findIndex(type => type.id === newContent.id)
      ] = newContent;
      newState = {
        ...this.state,
        [type]: boardType
      };
    }
    const url = URLS(type, "UPDATE");
    await fetching(url, "POST", newContent).then(result => {
      if (result.hasError) {
        this.handleError(result.message);
      } else {
        this.setState(newState);
      }
    });
  };

  kanbanOnDragEnd = (result, groupName) => {
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
      const newColumnOrder = [...this.state.columnOrder];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      let draggedColumn = [...this.state.columns].find(
        column => column.index === source.index
      );
      draggedColumn.index = destination.index;
      const newState = {
        ...this.state,
        columnOrder: newColumnOrder
      };
      this.setState(newState);
      this.handleUpdate("columns", "UPDATE", draggedColumn);
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
      let cardsSrcCol = getCards(
        this.state.cards[groupName],
        source.droppableId,
        "col-"
      );
      let cardsNotSrcDestCols = this.state.cards[groupName].filter(
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
        cards: {
          ...this.state.cards,
          [groupName]: [...cardsSrcCol, ...cardsNotSrcDestCols]
        }
      };
      this.setState(newState);
      this.handleUpdate("cards", "UPDATE", draggedCard);
      return;
    }

    // Moving card from one column to another
    let cardsSrcCol = getCards(
      this.state.cards[groupName],
      source.droppableId,
      "col-"
    );
    let cardsDestCol = getCards(
      this.state.cards[groupName],
      destination.droppableId,
      "col-"
    );
    let cardsNotSrcDestCols = this.state.cards[groupName].filter(
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
      cards: {
        ...this.state.cards,
        [groupName]: [...cardsSrcCol, ...cardsDestCol, ...cardsNotSrcDestCols]
      }
    };
    this.setState(newState);
    this.handleUpdate("cards", "UPDATE", draggedCard);
  };

  listOnDragEnd = (result, groupName) => {
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

    let cards = [...this.state.cards[groupName]];
    const draggedCard = cards.find(card => `card-${card.id}` === draggableId);
    draggedCard.index = destination.index;
    // Orders array for inserting droppable in new spot
    cards.splice(source.index, 1);
    cards.splice(destination.index, 0, draggedCard);
    const newState = {
      ...this.state,
      cards: {
        ...this.state.cards,
        [groupName]: [...cards]
      }
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
    } else if (isLoading) {
      return <PacmanLoader />;
    }
    return (
      <TagsProvider value={this.state.tags}>
        <div id="base-container">
          <Navbar
            handleBoardView={this.handleBoardView}
            view={this.state.view}
            addComponent={this.addComponent}
            deleteComponent={this.deleteComponent}
            cards={this.state.cards}
            columns={this.state.columns}
            tags={this.state.tags}
            filters={this.state.filters}
            resetFilters={this.resetFilters}
            onChangeFilterHandler={this.onChangeFilterHandler}
            selectFilters={this.selectFilters}
            createFilterGroup={this.createFilterGroup}
            updateFilterGroupIndex={this.updateFilterGroupIndex}
          />
          <Base
            {...baseState}
            kanbanFunctions={kanbanFunctions}
            listFunctions={listFunctions}
            filtersActive={this.state.filters.active}
            resetFilters={this.resetFilters}
          />
        </div>
      </TagsProvider>
    );
  }
}

export default getFetching(URLS("cards", "GET"))(BaseWrapper);
