import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { Tags } from "../../BoardComponents";
import { Voting } from "./components";
import IconRow from "./IconRow";
import UnnaturalDND from "components/UnnaturalDND";
import { PageProp } from "components/Pages/PageContext";
import { Tooltip } from "components/UI";
import "./index.scss";

class Card extends React.Component {
  static propTypes = {
    card: PropTypes.object,
    index: PropTypes.number,
    columns: PropTypes.array,
    updateBoardContent: PropTypes.func,
    addComponent: PropTypes.func,
    deleteComponent: PropTypes.func,
    handleResetBoard: PropTypes.func,
    handleUpdate: PropTypes.func
  };

  onUpdateVote = async voteType => {
    let queryParams = {};
    if (voteType === "add") {
      queryParams = {
        cardId: this.props.card.id,
        count: 1
      };
    } else if (voteType === "subtract") {
      queryParams = {
        cardId: this.props.card.id,
        count: -1
      };
    }

    await this.props.handleUpdate("votes", "UPDATE", queryParams);
  };

  cardDiv = (card, props) => (
    <div id="card-draggable" {...props} onClick={() => props.openCard(card.id)}>
      <div className="card-draggable-container">
        <div className="col">
          <div className="card-title row">{card.title}</div>
          <div className="row">
            <Tags tagIds={card.tagIds} />
          </div>
        </div>
        <div className="pull-right col">
          <Voting votes={card.votes} onUpdateVote={this.onUpdateVote} />
          <IconRow {...card} />
        </div>
      </div>
    </div>
  );

  render() {
    const { card, index, openCard } = this.props;
    const { hasPrivilege } = this.props.page;
    return (
      <div>
        <Tooltip id="card" />
        {hasPrivilege("developer") ? (
          <Draggable draggableId={`card-${card.id}`} index={index}>
            {(provided, snapshot) => {
              return (
                <UnnaturalDND style={{ ...provided.draggableProps.style }} snapshot={snapshot}>
                  {style =>
                    this.cardDiv(card, {
                      className: snapshot.isDragging ? "card-is-dragging" : "",
                      ref: provided.innerRef,
                      ...provided.draggableProps,
                      ...provided.dragHandleProps,
                      style: style,
                      openCard
                    })
                  }
                </UnnaturalDND>
              );
            }}
          </Draggable>
        ) : (
          this.cardDiv(card, { className: "editable", openCard })
        )}
      </div>
    );
  }
}

export default PageProp(Card);
