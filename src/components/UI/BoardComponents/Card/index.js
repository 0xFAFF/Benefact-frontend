import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import marked from "marked";
import { Modal, MarkdownEditor } from "../../../UI";
import Tags from "../Tags";
import "./index.scss";

class Card extends React.Component {
  static propTypes = {
    card: PropTypes.object,
    index: PropTypes.number,
    columns: PropTypes.array,
    showDeleteModal: PropTypes.bool,
    updateBoardContent: PropTypes.func,
    addComponent: PropTypes.func,
    deleteComponent: PropTypes.func
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
    const { id = "N/A", title = "N/A" } = this.props.card;
    const cardDescription = "ID: " + id + "\n" + title;
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
    return (
      <div>
        <Draggable
          draggableId={`card-${card.id}`}
          index={index}
          isDragDisabled={this.state.isDragDisabled}
        >
          {(provided, snapshot) => {
            return (
              <div
                id="card-draggable"
                className={snapshot.isDragging ? "card-is-dragging" : ""}
                ref={provided.innerRef}
                {...provided.draggableProps}
                style={{ ...provided.draggableProps.style }}
                {...provided.dragHandleProps}
                onClick={this.handleOpenModal}
              >
                <div className="card-description">
                  <div dangerouslySetInnerHTML={this.rawMarkup()} />
                </div>
                <Tags tagIds={card.tagIds} />
              </div>
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
