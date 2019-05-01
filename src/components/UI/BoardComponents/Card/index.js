import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { Tags } from "../../BoardComponents";
import { Voting } from "./components";
import IconRow from "./IconRow";
import CardEditor from "./CardEditor";
import UnnaturalDND from "components/UnnaturalDND";
import { PageProp } from "components/Pages/PageContext";
import { Tooltip, ModalWrapper } from "components/UI";
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

  constructor(props) {
    super(props);
    this.EditorModal = ModalWrapper(this, "editorOpen");
  }

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

  render() {
    const { card, index, showModal, closeModal, ...rest } = this.props;
    const { votes } = card;
    return (
      <div>
        <Tooltip id="card" />
        <Draggable draggableId={`card-${card.id}`} index={index}>
          {(provided, snapshot) => {
            return (
              <UnnaturalDND style={{ ...provided.draggableProps.style }} snapshot={snapshot}>
                {style => (
                  <div
                    id="card-draggable"
                    className={snapshot.isDragging ? "card-is-dragging" : ""}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={style}
                    onClick={this.EditorModal.open}
                  >
                    <div className="card-draggable-container">
                      <div className="col">
                        <div className="card-title row">{this.props.card.title}</div>
                        <div className="row">
                          <Tags tagIds={card.tagIds} />
                        </div>
                      </div>
                      <div className="pull-right col">
                        <Voting votes={votes} onUpdateVote={this.onUpdateVote} />
                        <IconRow {...card} />
                      </div>
                    </div>
                  </div>
                )}
              </UnnaturalDND>
            );
          }}
        </Draggable>
        <this.EditorModal>
          <CardEditor content={card} showDeleteModal onClose={this.EditorModal.close} {...rest} />
        </this.EditorModal>
      </div>
    );
  }
}

export default PageProp(Card);
