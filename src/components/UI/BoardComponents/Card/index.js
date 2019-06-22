import React from "react";
import PropTypes from "prop-types";
import { Tags } from "../../BoardComponents";
import { Voting } from "./components";
import IconRow from "./IconRow";
import { PageProp } from "components/Pages/PageContext";
import { Draggable } from "components/DND";
import "./index.scss";

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
    const { page, card, index, openCard } = this.props;
    const { hasPrivilege } = page;
    const cardDiv = props => (
      <div id="card-draggable" {...props} onClick={() => openCard(card)}>
        <div className="card-draggable-container col">
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
        </div>
      </div>
    );
    return (
      <>
        {hasPrivilege("developer") ? (
          <Draggable type="card" id={`card-${card.id}`} index={index}>
            {(provided, snapshot) => {
              return cardDiv({
                className: snapshot.isDragging ? "card-is-dragging" : "",
                ref: provided.innerRef,
                ...provided.draggableProps,
                ...provided.dragHandleProps
              });
            }}
          </Draggable>
        ) : (
          cardDiv({ className: "editable" })
        )}
      </>
    );
  }
}

export default PageProp(Card);
