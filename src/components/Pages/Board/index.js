import React from "react";
import PropTypes from "prop-types";
import { getCards } from "../../../utils";
import Views from "./Views";
import { Modal, Settings } from "components/UI";
import { PageWrapper } from "../../Pages";
import CardEditor from "components/UI/BoardComponents/Card/CardEditor";
import { navbarConfigs } from "./navbarConfigs";
import { AcceptCancelButtons, Button, Segment } from "components/UI/PageComponents";
import { isEmpty } from "utils/formatting";

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
        result.userMap = result.roles.reduce((users, role) => {
          users[role.userId] = role.user;
          return users;
        }, {});
        let data = { ...result, ...this.getCardLookup(result) };
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
      if (!isEmpty(terms.length)) {
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
    await this.props.page.refreshData(
      this.props.compFetch(type, action, queryParams, errorHandler)
    );
  };

  updateBoardContent = async (newContent, type) => {
    await this.handleUpdate(type, "UPDATE", newContent);
  };

  kanbanOnDragEnd = async (result, groupName) => {
    const { compFetch, updatePage } = this.props.page;
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
      await updatePage({ data: newData });
      return this.handleUpdate("columns", "UPDATE", draggedColumn);
    }
    if (type === "card") {
      const destId = +destination.droppableId.replace(/^\D+/g, "");
      let cards = this.props.page.data.cards[groupName];
      const draggedCardIndex = cards.findIndex(card => `card-${card.id}` === draggableId);
      const draggedCard = cards[draggedCardIndex];
      // Setting parent
      if (destination.droppableId.includes("card")) {
        draggedCard.parentId = destId;
        return this.handleUpdate("cards", "UPDATE", { id: draggedCard.id, parentId: destId });
      }
      // source column of droppable
      const start = this.props.page.data.columns.find(
        column => `col-${column.id}` === source.droppableId
      );
      // destination column of droppable
      const finish = this.props.page.data.columns.find(
        column => `col-${column.id}` === destination.droppableId
      );
      let cardsDstCol = getCards(
        this.props.page.data.cards[groupName],
        destination.droppableId,
        "col-"
      );
      // Setting column
      draggedCard.columnId = destId;
      const draggedCardColIndex = cardsDstCol.findIndex(card => `card-${card.id}` === draggableId);
      const isEnd =
        destination.index >= (start === finish ? cardsDstCol.length - 1 : cardsDstCol.length);
      const moveAfter = isEnd || (start === finish && destination.index > draggedCardColIndex);
      const targetCard = cardsDstCol[isEnd ? cardsDstCol.length - 1 : destination.index];
      if (targetCard) {
        // Orders array for inserting droppable in new spot
        cards.splice(draggedCardIndex, 1);
        const targetCardIndex = cards.findIndex(card => card.id === targetCard.id);
        cards.splice(targetCardIndex + (moveAfter ? 1 : 0), 0, draggedCard);
      }
      let newData = { ...this.props.page.data };
      newData = {
        ...newData,
        cards: {
          ...newData.cards,
          [groupName]: [...cards]
        }
      };
      await updatePage({ data: newData });
      return compFetch("cards", "MOVE", {
        cardId: draggedCard.id,
        targetCardId: targetCard && targetCard.id,
        columnId: start === finish ? undefined : destId,
        moveAfter
      });
    }
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

  getCardLookup = data => {
    let { cards } = data;
    const cardGroups = Object.values(cards);
    if (cardGroups.length > 0)
      return { cardLookup: Object.fromEntries(cardGroups[0].map(c => [c.id, c])) };
    return { cardLookup: {} };
  };

  closeCard = () => {
    this.props.history.push(
      `/board/${this.props.boardId}${this.props.view === "kanban" ? "" : "/list"}`
    );
  };

  openCard = ({ id }) =>
    this.props.history.push(
      `/board/${this.props.boardId}${this.props.view === "kanban" ? "/kanban" : "/list"}/card/${id}`
    );

  goHome = () => this.props.history.push("/");

  render() {
    const {
      cardId,
      boardId,
      page: { hasPrivilege, data, filters, refreshData, compFetch },
      view,
      editSettings
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
            onAccept={() => refreshData(compFetch("boards", "JOIN"))}
            onCancel={this.goHome}
          />
        </Segment>
      );
      const isPrivate = data.defaultPrivilege === 0;
      const title = isPrivate ? "Private Board" : "Join Board";
      return (
        <Modal title={title} isOpen shouldCloseOnOverlayClick={false} onClose={this.goHome}>
          {isPrivate ? <PrivateBoard /> : <JoinBoard />}
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
          openCard={this.openCard}
        />
        {editingCard && (
          <Modal isOpen onClose={this.closeCard}>
            <CardEditor
              allowEdit={hasPrivilege("developer", editingCard.authorId)}
              onClose={this.closeCard}
              handleUpdate={this.handleUpdate}
              updateBoardContent={this.updateBoardContent}
              openCard={this.openCard}
              content={editingCard}
              {...data}
              showDeleteModal
            />
          </Modal>
        )}
        {editSettings && (
          <Modal isOpen onClose={this.closeCard}>
            <Settings handleUpdate={this.handleUpdate} />
          </Modal>
        )}
      </>
    );
  }
}

export default PageWrapper(Board);
