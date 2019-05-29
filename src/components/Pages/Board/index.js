import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import { getCards } from "../../../utils";
import Views from "./Views";
import { Modal, ModalContainer } from "components/UI";
import { PageWrapper } from "../../Pages";
import CardEditor from "components/UI/BoardComponents/Card/CardEditor";
import { navbarConfigs } from "./navbarConfigs";
import { AcceptCancelButtons, Button, Segment } from "components/UI/PageComponents";

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

  dataSource = async page => {
    if (page.query.i) {
      await page
        .compFetch("boards", "JOIN", { Key: page.query.i })
        .then(r => r && page.history.replace(page.match.url));
    }
    return await page
      .compFetch("cards", "GET", this.filterQueryParams(page.filters))
      .then(result => {
        let { columns, cards } = result;
        result.columns = columns = columns || [];
        result.cards = cards = cards || {};
        let data = { ...result, ...this.getAllCards(result) };
        data = {
          ...data,
          columnOrder: columns.map(column => column.id)
        };
        return {
          data
        };
      });
  };

  componentDidMount = () => {
    this.props.setChild(this);
  };

  navbar = props => {
    return navbarConfigs(this, props);
  };

  filterQueryParams = filters => {
    let queryParams = { Groups: {} };
    if (!filters) return null;
    const { groups = [] } = filters;
    groups.forEach((group, index) => {
      const { filterBy } = group;
      const { tags, columns, title } = filterBy;
      let baseTerm = {};
      let terms = [];
      if (tags.length > 0) {
        baseTerm.tags = tags.map(tag => tag.id);
      }
      if (title !== "") {
        baseTerm.title = title;
      }
      if (columns.length > 0) {
        terms = columns.map(col => {
          return { columnId: col.id, ...baseTerm };
        });
      } else terms = [baseTerm];
      if (!isEmpty(terms)) {
        const keyName = `Group-${index}`;
        queryParams.Groups[keyName] = terms;
      }
    });
    return !isEmpty(queryParams.Groups) ? queryParams : null;
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
    this.props.page.updatePage(newData);
  };

  handleUpdate = async (type, action, queryParams, errorHandler) => {
    this.props.page.refreshData(this.props.compFetch(type, action, queryParams, errorHandler));
  };

  updateBoardContent = async (newContent, type) => {
    let boardType;
    let newData = { ...this.props.page.data };
    if (type === "cards") {
      let cardGroups = { ...this.props.page.data[type] };
      const cards = Object.entries(cardGroups).map(([cardGroupKey, cardGroupValue]) => {
        const cardIndex = cardGroupValue.findIndex(type => type.id === newContent.id);
        if (cardIndex !== -1) {
          cardGroupValue[cardIndex] = { ...cardGroupValue[cardIndex], ...newContent };
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
      this.props.page.updatePage(newData);
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
      await this.props.page.updatePage({ data: newData });
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
      this.props.page.updatePage({ data: newData });
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
    this.props.page.updatePage({ data: newData });
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
    this.props.page.updatePage({ data: newData });
    return this.handleUpdate("cards", "UPDATE", draggedCard);
  };

  getAllCards = data => {
    let { cards } = data;
    const cardGroups = Object.values(cards);
    if (cardGroups.length > 0) return { allCards: cardGroups[0] };
    return { allCards: [] };
  };

  closeCard = () => {
    this.props.history.push(
      `/board/${this.props.boardId}${this.props.view === "kanban" ? "" : "/list"}`
    );
  };

  goHome = () => this.props.history.push("/");

  render() {
    const {
      cardId,
      boardId,
      page: { hasPrivilege, data, filters, refreshData, compFetch },
      view
    } = this.props;
    let cardsById = {};
    if (data && data.cards) {
      Object.values(data.cards).forEach(group => {
        group.reduce((all, card) => {
          all[card.id] = card;
          return all;
        }, cardsById);
      });
    }

    const generalFunctions = {
      updateBoardContent: this.updateBoardContent,
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
    if (!data) return <></>;
    if (!data.userPrivilege) {
      const PrivateBoard = () => (
        <Segment margin center>
          This board is private, please request an invite from an administrator.
          <Button fluid title="OK" onClick={this.goHome} />
        </Segment>
      );
      const JoinBoard = () => (
        <Segment margin center>
          Would you like to join this board?
          <AcceptCancelButtons
            acceptTitle="Yes"
            cancelTitle="No"
            onAcceptHandler={() => refreshData(compFetch("boards", "JOIN"))}
            onCancelHandler={this.goHome}
          />
        </Segment>
      );
      return (
        <Modal isOpen shouldCloseOnOverlayClick={false} onClose={this.goHome}>
          {!data.defaultPrivilege ? (
            <ModalContainer componentHeader="Private Board" component={PrivateBoard} />
          ) : (
            <ModalContainer componentHeader="Join Board" component={JoinBoard} />
          )}
        </Modal>
      );
    }

    return (
      <>
        <Views
          view={view}
          {...data}
          kanbanFunctions={kanbanFunctions}
          listFunctions={listFunctions}
          filtersActive={Boolean(filters)}
          openCard={({ id }) =>
            this.props.history.push(
              `/board/${boardId}${view === "kanban" ? "" : "/list"}/card/${id}`
            )
          }
        />
        {editingCard && (
          <Modal isOpen onClose={this.closeCard}>
            <CardEditor
              allowEdit={hasPrivilege("developer", editingCard.authorId)}
              onClose={this.closeCard}
              handleUpdate={this.handleUpdate}
              updateBoardContent={this.updateBoardContent}
              content={editingCard}
              {...data}
              showDeleteModal
            />
          </Modal>
        )}
      </>
    );
  }
}

export default PageWrapper(Board);
