import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import { getCards } from "../../../utils";
import Views from "./Views";
import { Modal } from "../../UI";
import { PageWrapper } from "../../Pages";
import { PacmanLoader } from "../../UI/Loader";
import CardEditor from "components/UI/BoardComponents/Card/CardEditor";
import { navbarConfigs } from "./navbarConfigs";

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

  dataSource = () => {
    return this.props.compFetch("cards", "GET").then(result => {
      let updatedResult = { ...result };
      const { columns = [] } = updatedResult;
      updatedResult = {
        ...updatedResult,
        columnOrder: columns.map(column => column.id),
        ...this.getAllCards(result)
      };
      updatedResult = {
        ...updatedResult,
        view: "kanban",
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
      return updatedResult;
    });
  };

  componentDidMount = () => {
    this.props.setChild(this);
    this.props.setNavbarConfigs(navbarConfigs);
  };

  createFilterGroup = () => {
    let newData = { ...this.props.page.data };
    newData.filters.groups.push({
      filterBy: {
        tags: [],
        columnId: "",
        title: ""
      },
      matchBy: "all"
    });
    this.props.page.updateData(newData);
  };

  updateFilterGroupIndex = index => {
    let newData = { ...this.props.page.data };
    newData.filters.currGroupIndex = index;
    this.props.page.updateData(newData);
  };

  onChangeFilterHandler = (e, key, groupIndex = 0) => {
    if (key === "matchBy") {
      let newData = { ...this.props.page.data };
      newData.filters.groups[groupIndex] = {
        ...newData.filters.groups[groupIndex],
        matchBy: e
      };
      this.props.page.updateData(newData);
    } else if (key === "tags") {
      let selectedTags = [...this.props.page.data.filters.groups[groupIndex].filterBy.tags];
      const selectedTagIndex = selectedTags.findIndex(tag => tag.id === e.id);
      if (selectedTagIndex > -1) {
        selectedTags.splice(selectedTagIndex, 1);
      } else {
        selectedTags.push(e);
      }
      let newData = { ...this.props.page.data };
      newData.filters.groups[groupIndex] = {
        ...newData.filters.groups[groupIndex],
        filterBy: {
          ...newData.filters.groups[groupIndex].filterBy,
          tags: selectedTags
        }
      };
      this.props.page.updateData(newData);
    } else if (key === "columnId") {
      e.persist();
      let newData = { ...this.props.page.data };
      newData.filters.groups[groupIndex] = {
        ...newData.filters.groups[groupIndex],
        filterBy: {
          ...newData.filters.groups[groupIndex].filterBy,
          columnId: e.target.value === "" ? null : parseInt(e.target.value)
        }
      };
      this.props.page.updateData(newData);
    } else if (key === "title") {
      e.persist();
      let newData = { ...this.props.page.data };
      newData.filters.groups[groupIndex] = {
        ...newData.filters.groups[groupIndex],
        filterBy: {
          ...newData.filters.groups[groupIndex].filterBy,
          title: e.target.value
        }
      };
      this.props.page.updateData(newData);
    }
  };

  selectFilters = () => {
    let queryParams = {};
    const {
      filters: { groups = [] }
    } = this.props.page.data;
    groups.forEach((group, index) => {
      const { matchBy, filterBy } = group;
      const { tags, columnId, title } = filterBy;
      let params;
      if (matchBy === "all") {
        params = {};
        Object.entries(filterBy).forEach(([filterKey, filterValue]) => {
          if (filterKey === "tags" && filterValue.length > 0) {
            params[filterKey] = filterValue.map(tag => tag.id);
          } else if ((filterKey === "columnId" || filterKey === "title") && filterValue !== "") {
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

    !isEmpty(queryParams) ? this.updateFilters(queryParams) : this.updateFilters();
  };

  resetFilters = () => {
    let newData = { ...this.props.page.data };
    newData.filters = {
      ...newData.filters,
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
    };
    this.props.page.updateData(newData);
    this.updateFilters();
  };

  handleResetBoard = data => {
    const { columns = [], cards = {}, tags = [], users = [] } = data;
    let columnOrder = columns.map(column => column.id);
    let newData = { ...this.props.page.data };
    newData = {
      ...newData,
      cards,
      columns,
      tags,
      columnOrder,
      users
    };
    this.props.page.updateData(newData);
  };

  handleUpdate = async (type, action, queryParams, errorHandler) => {
    await this.props.compFetch(type, action, queryParams, errorHandler).then(async _ => {
      if (this.props.page.data.filters.active) {
        this.selectFilters();
      } else {
        await this.dataSource();
      }
    });
  };

  updateFilters = async queryParams => {
    await this.props.compFetch("cards", "GET", queryParams).then(result => {
      this.handleResetBoard(result);
      let newData = { ...this.props.page.data };
      if (queryParams) {
        newData.filters = {
          ...newData.filters,
          active: true
        };
      } else {
        newData.filters = {
          ...newData.filters,
          active: false
        };
      }
      this.props.page.updateData(newData);
    });
  };

  updateBoardContent = async (newContent, type) => {
    let boardType;
    let newData = { ...this.props.page.data };
    if (type === "cards") {
      let cardGroups = { ...this.props.page.data[type] };
      const cards = Object.entries(cardGroups).map(([cardGroupKey, cardGroupValue]) => {
        const cardIndex = cardGroupValue.findIndex(type => type.id === newContent.id);
        if (cardIndex > -1) {
          cardGroupValue[cardIndex] = newContent;
        }
        return { [cardGroupKey]: [...cardGroupValue] };
      });
      newData = {
        ...newData,
        cards: Object.assign(...cards)
      };
    } else {
      boardType = [...this.props.page.data[type]];
      boardType[boardType.findIndex(type => type.id === newContent.id)] = newContent;
      newData = {
        ...newData,
        [type]: boardType
      };
    }
    await this.props.compFetch(type, "UPDATE", newContent).then(_ => {
      this.props.page.updateData(newData);
    });
  };

  kanbanOnDragEnd = async (result, groupName) => {
    const { destination, source, draggableId, type } = result;
    // check if there is a destination
    if (!destination) return;

    // check if droppable has moved
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Move columns around
    if (type === "column") {
      let newData = { ...this.props.page.data };
      const newColumnOrder = [...this.props.page.data.columnOrder];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      let draggedColumn = [...this.props.page.data.columns].find(
        column => column.index === source.index
      );
      draggedColumn.index = destination.index;
      newData = {
        ...newData,
        columnOrder: newColumnOrder
      };
      await this.props.page.updateData(newData);
      return this.handleUpdate("columns", "UPDATE", draggedColumn);
    }
    // source column of droppable
    const start = this.props.page.data.columns.find(
      column => `col-${column.id}` === source.droppableId
    );
    // destination column of droppable
    const finish = this.props.page.data.columns.find(
      column => `col-${column.id}` === destination.droppableId
    );

    // Moving within one column
    if (start === finish) {
      // new cards nonmutated array
      let cardsSrcCol = getCards(this.props.page.data.cards[groupName], source.droppableId, "col-");
      let cardsNotSrcDestCols = this.props.page.data.cards[groupName].filter(
        card =>
          `col-${card.columnId}` !== source.droppableId &&
          `col-${card.columnId}` !== destination.droppableId
      );
      const draggedCard = cardsSrcCol.find(card => `card-${card.id}` === draggableId);

      let newIndex = cardsSrcCol[destination.index]["index"];
      draggedCard["index"] = newIndex;
      // Orders array for inserting droppable in new spot
      cardsSrcCol.splice(source.index, 1);
      cardsSrcCol.splice(destination.index, 0, draggedCard);
      let newData = { ...this.props.page.data };
      newData = {
        ...newData,
        cards: {
          ...newData.cards,
          [groupName]: [...cardsSrcCol, ...cardsNotSrcDestCols]
        }
      };
      this.props.page.updateData(newData);
      return this.handleUpdate("cards", "UPDATE", draggedCard);
    }

    // Moving card from one column to another
    let cardsSrcCol = getCards(this.props.page.data.cards[groupName], source.droppableId, "col-");
    let cardsDestCol = getCards(
      this.props.page.data.cards[groupName],
      destination.droppableId,
      "col-"
    );
    let cardsNotSrcDestCols = this.props.page.data.cards[groupName].filter(
      card =>
        `col-${card.columnId}` !== source.droppableId &&
        `col-${card.columnId}` !== destination.droppableId
    );
    const draggedCard = cardsSrcCol.find(card => `card-${card.id}` === draggableId);

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

    let newData = { ...this.props.page.data };
    newData = {
      ...newData,
      cards: {
        ...newData.cards,
        [groupName]: [...cardsSrcCol, ...cardsDestCol, ...cardsNotSrcDestCols]
      }
    };
    this.props.page.updateData(newData);
    return this.handleUpdate("cards", "UPDATE", draggedCard);
  };

  listOnDragEnd = (result, groupName) => {
    const { destination, source, draggableId } = result;
    // check if there is a destination
    if (!destination) return;
    // check if droppable has moved
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    let cards = [...this.props.page.data.cards[groupName]];
    const draggedCard = cards.find(card => `card-${card.id}` === draggableId);
    draggedCard.index = destination.index;
    // Orders array for inserting droppable in new spot
    cards.splice(source.index, 1);
    cards.splice(destination.index, 0, draggedCard);
    let newData = { ...this.props.page.data };
    newData = {
      ...newData,
      cards: {
        ...newData.cards,
        [groupName]: [...cards]
      }
    };
    this.props.page.updateData(newData);
    return this.handleUpdate("cards", "UPDATE", draggedCard);
  };

  addComponent = (componentType, content) => {
    const updatedComponent = { ...content };
    return this.handleUpdate(componentType, "ADD", updatedComponent);
  };

  deleteComponent = (componentType, content) => {
    return this.handleUpdate(componentType, "DELETE", content);
  };

  handleBoardView = view => {
    let newData = { ...this.props.page.data };
    newData = {
      ...newData,
      view
    };
    this.props.page.updateData(newData);
  };

  getAllCards = data => {
    const { cards = {} } = data;
    const cardGroups = Object.values(cards);
    if (cardGroups.length > 0) return { allCards: cardGroups[0] };
    return [];
  };

  closeCard = () => {
    this.props.history.push(`/board/${this.props.boardId}`);
  };

  render() {
    const {
      cardId,
      boardId,
      page: { hasPrivilege, data },
      isLoading
    } = this.props;
    const cardsById =
      data.cards &&
      data.cards.all &&
      data.cards.all.reduce((all, card) => {
        all[card.id] = card;
        return all;
      }, {});

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

    const editingCard = cardId && cardsById && cardsById[cardId];
    return (
      <>
        {isLoading ? (
          <PacmanLoader />
        ) : (
          <>
            <Views
              {...data}
              kanbanFunctions={kanbanFunctions}
              listFunctions={listFunctions}
              filtersActive={this.props.page.data.filters.active}
              openCard={id => this.props.history.push(`/board/${boardId}/card/${id}`)}
            />
            {editingCard && (
              <Modal isOpen onClose={this.closeCard}>
                <CardEditor
                  allowEdit={hasPrivilege("developer", editingCard.authorId)}
                  onClose={this.closeCard}
                  handleUpdate={this.handleUpdate}
                  updateBoardContent={this.updateBoardContent}
                  deleteComponent={this.deleteComponent}
                  content={editingCard}
                  {...data}
                  showDeleteModal
                />
              </Modal>
            )}
          </>
        )}
      </>
    );
  }
}

export default PageWrapper(Board);
