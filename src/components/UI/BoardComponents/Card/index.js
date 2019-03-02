import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import NaturalDragAnimation from "natural-drag-animation-rbdnd";
import marked from "marked";
import { Modal, MarkdownEditor } from "../../../UI";
import { Tags, Voting } from "../../BoardComponents";
import IconRow from "./IconRow";
import "./index.scss";

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
              <NaturalDragAnimation
                style={{ ...provided.draggableProps.style }}
                snapshot={snapshot}
                animationRotationFade={0.6}
                rotationMultiplier={2.0}
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
                            <Voting votes={votes} />
                            <IconRow {...card} />
                          </div>
                        </div>
                        <Tags tagIds={card.tagIds} />
                      </div>
                    </div>
                  </div>
                )}
              </NaturalDragAnimation>
            );
          }}
        </Draggable>
        <Modal onClose={this.handleCloseModal} isOpen={this.state.showModal}>
          <MarkdownEditor
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
