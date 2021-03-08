import React from "react";
import PropTypes from "prop-types";
import { Tags } from "../../BoardComponents";
import { Voting } from "./components";
import IconRow from "./IconRow";
import { PageProp } from "components/Pages/PageContext";
import { Draggable, Droppable } from "components/DND";
import "./index.scss";
import { cls } from "utils";

class Card extends React.Component {
  static propTypes = {
    card: PropTypes.object,
    index: PropTypes.number,
    columns: PropTypes.array,
    updateBoardContent: PropTypes.func,
    handleResetBoard: PropTypes.func,
    handleUpdate: PropTypes.func,
    openCard: PropTypes.func
  };

  onUpdateVote = async voteType => {
    let queryParams = {};
    if (voteType === "add") {
      queryParams = {
        cardId: this.props.card.id,
        count: 1
      };
    }
    await this.props.handleUpdate("votes", "UPDATE", queryParams);
  };

  render() {
    const { page, card, index, openCard, flat = false } = this.props;
    const { hasPrivilege } = page;
    const cardDiv = props => (
      <div
        className={cls(
          (flat || !hasPrivilege("developer")) && "editable",
          "card-draggable-container col"
        )}
        {...props}
      >
        <div className="row">
          <div className="col">{card.title}</div>
          <div className="col pull-right">
            <Voting votes={card.votes} onUpdateVote={this.onUpdateVote} />
          </div>
        </div>
        <div className="row">
          <Tags tagIds={card.tagIds} />
          <IconRow className="pull-right" card={card} userMap={page.data.userMap} />
        </div>
        {!flat &&
          card.childIds.map(id => {
            const child = page.data.cardLookup[id];
            return <Card openCard={openCard} page={page} key={child.id} card={child} flat />;
          })}
      </div>
    );
    const dropDiv = props => (
      <div
        id="card-draggable"
        {...props}
        onClick={e => {
          e.stopPropagation();
          openCard(card);
        }}
      >
        {flat ? (
          cardDiv()
        ) : (
          <Droppable id={`card-${card.id}`} type={page.shiftHeld ? "card" : "none"}>
            {(provided, snapshot) => {
              return cardDiv({
                ref: provided.innerRef,
                ...provided.droppableProps
              });
            }}
          </Droppable>
        )}
      </div>
    );
    return (
      <>
        {hasPrivilege("developer") && !flat ? (
          <Draggable type="card" id={`card-${card.id}`} index={index}>
            {(provided, snapshot) => {
              return dropDiv({
                className: snapshot.isDragging ? "card-is-dragging" : "",
                ref: provided.innerRef,
                ...provided.draggableProps,
                ...provided.dragHandleProps
              });
            }}
          </Draggable>
        ) : (
          dropDiv()
        )}
      </>
    );
  }
}

export default PageProp(Card);
