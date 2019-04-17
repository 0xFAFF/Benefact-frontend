import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import { getCards } from "../../../utils";
import Views from "./Views";
import { Navbar } from "../../UI";
import { TagsProvider } from "../../UI/BoardComponents/Tags/TagsContext";
import { AuthProvider } from "../../Auth/AuthContext";
import { UsersProvider } from "../../Users/UsersContext";
import { PageWrapper } from "../../Pages";
import { PacmanLoader } from "../../UI/Loader";

class Board extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      cards: PropTypes.object,
      columns: PropTypes.array,
      tags: PropTypes.array,
      users: PropTypes.array
    }),
    onLogoutHandler: PropTypes.func
  };

  state = {
    data: null,
    view: "kanban",
    cards: {},
    columns: [],
    tags: [],
    users: [],
    columnOrder: [],
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

  dataSource = async () => {
    const result = await this.props.compFetch("cards", "GET");
    this.handleResetBoard(result);
    this.getAllCards(result);
    return result;
  };

  componentDidMount = () => {
    this.props.setDataSource(this.dataSource);
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

  handleResetBoard = data => {
    const { columns = [], cards = {}, tags = [], users = [] } = data;
    let columnOrder = columns.map(column => column.id);
    this.setState({
      cards: cards,
      columns: columns,
      tags: tags,
      columnOrder: columnOrder,
      users: users
    });
  };

  handleUpdate = async (type, action, queryParams) => {
    await this.props.compFetch(type, action, queryParams).then(async _ => {
      if (this.state.filters.active) {
        this.selectFilters();
      } else {
        await this.props.dataSource().then(result => {
          this.handleResetBoard(result);
          this.getAllCards(result);
        });
      }
    });
  };

  updateFilters = async queryParams => {
    await this.props.compFetch("cards", "GET", queryParams).then(result => {
      this.handleResetBoard(result);
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
    await this.props.compFetch(type, "UPDATE", newContent).then(_ => {
      this.setState(newState);
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

  getAllCards = data => {
    const { cards = {} } = data;
    const cardGroups = Object.values(cards);
    if (cardGroups.length > 0) {
      this.setState({
        allCards: cardGroups[0]
      });
    }
  };

  render() {
    const { onLogoutHandler } = this.props;
    const { isLoading, ...baseState } = this.state;

    const generalFunctions = {
      updateBoardContent: this.updateBoardContent,
      addComponent: this.addComponent,
      deleteComponent: this.deleteComponent,
      handleUpdate: this.handleUpdate
    };

    const kanbanFunctions = {
      kanbanOnDragEnd: this.kanbanOnDragEnd,
      handleResetBoard: this.handleResetBoard,
      ...generalFunctions
    };

    const listFunctions = {
      listOnDragEnd: this.listOnDragEnd,
      ...generalFunctions
    };

    const navBarFunctions = {
      handleBoardView: this.handleBoardView,
      addComponent: this.addComponent,
      deleteComponent: this.deleteComponent,
      resetFilters: this.resetFilters,
      onChangeFilterHandler: this.onChangeFilterHandler,
      selectFilters: this.selectFilters,
      createFilterGroup: this.createFilterGroup,
      updateFilterGroupIndex: this.updateFilterGroupIndex,
      onLogoutHandler: onLogoutHandler
    };

    return (
      <AuthProvider value={this.props.token}>
        <UsersProvider value={this.state.users}>
          <TagsProvider value={this.state.tags}>
            <div id="base-container">
              <Navbar
                {...baseState}
                {...navBarFunctions}
                filtersActive={this.state.filters.active}
                resetFilters={this.resetFilters}
              />
              {this.props.isLoading ? (
                <PacmanLoader />
              ) : (
                <Views
                  {...baseState}
                  kanbanFunctions={kanbanFunctions}
                  listFunctions={listFunctions}
                  filtersActive={this.state.filters.active}
                />
              )}
            </div>
          </TagsProvider>
        </UsersProvider>
      </AuthProvider>
    );
  }
}

export default PageWrapper(Board);
