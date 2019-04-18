import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import marked from "marked";
import { Modal } from "../../../UI";
import { Tags } from "../../BoardComponents";
import { Voting } from "./components";
import IconRow from "./IconRow";
import CardEditor from "./CardEditor";
import "./index.scss";
import UnnaturalDND from "components/UnnaturalDND";

class Card extends React.Component {
  static propTypes = {
    card: PropTypes.object,
    index: PropTypes.number,
    columns: PropTypes.array,
    showDeleteModal: PropTypes.bool,
    updateBoardContent: PropTypes.func,
    addComponent: PropTypes.func,
    deleteComponent: PropTypes.func,
    handleResetBoard: PropTypes.func,
    handleUpdate: PropTypes.func
  };

  state = {
    showModal: false,
    isDragDisabled: false
  };

  handleOpenModal = () => {
    this.setState({ showModal: true, isDragDisabled: true });
  };
  handleCloseModal = () => {
    this.setState({ showModal: false, isDragDisabled: false });
  };

  rawMarkup = () => {
    const { title = "N/A" } = this.props.card;
    const cardDescription = title;
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false
      // highlight: function (code) {
      //     return hljs.highlightAuto(code).value
      // }
    });

    let rawMarkup = marked(cardDescription, { sanitize: true });
    return {
      __html: rawMarkup
    };
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

  render() {
    const { card, index, showDeleteModal = true, ...rest } = this.props;
    const { votes } = card;
    return (
      <div>
        <Draggable
          draggableId={`card-${card.id}`}
          index={index}
          isDragDisabled={this.state.isDragDisabled}
        >
          {(provided, snapshot) => {
            return (
              <UnnaturalDND
                style={{ ...provided.draggableProps.style }}
                snapshot={snapshot}
              >
                {style => (
                  <div
                    id="card-draggable"
                    className={snapshot.isDragging ? "card-is-dragging" : ""}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={style}
                    onClick={this.handleOpenModal}
                  >
                    <div className="card-draggable-container">
                      <div className="card-row">
                        <div className="card-title">
                          <div
                            className="left-side"
                            dangerouslySetInnerHTML={this.rawMarkup()}
                          />
                          <div className="right-side">
                            <Voting
                              votes={votes}
                              onUpdateVote={this.onUpdateVote}
                            />
                            <IconRow {...card} />
                          </div>
                        </div>
                        <Tags tagIds={card.tagIds} />
                      </div>
                    </div>
                  </div>
                )}
              </UnnaturalDND>
            );
          }}
        </Draggable>
        <Modal onClose={this.handleCloseModal} isOpen={this.state.showModal}>
          <CardEditor
            content={card}
            showDeleteModal={showDeleteModal}
            onAcceptHandler={this.handleCloseModal}
            onClose={this.handleCloseModal}
            {...rest}
          />
        </Modal>
      </div>
    );
  }
}

export default Card;
