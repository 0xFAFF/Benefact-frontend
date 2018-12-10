import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Modal, MarkdownEditor } from "../../../UI";
import marked from "marked";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Categories from "../Tags/Categories";
import "./index.scss";

class Card extends React.Component {
  state = { showModal: false, isDragDisabled: false };
  handleShowMessageClick = () => {
    this.setState({ showModal: true, isDragDisabled: true });
  };
  handleCloseModal = () =>
    this.setState({ showModal: false, isDragDisabled: false });

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
    // const isDragDisabled = this.props.card.ID === "card-1";
    return (
      <Draggable
        draggableId={`card-${this.props.card.id}`}
        index={this.props.index}
        isDragDisabled={this.state.isDragDisabled}
      >
        {(provided, snapshot) => {
          return (
            <div
              id="card-draggable"
              className={snapshot.isDragging ? "is-dragging" : ""}
              ref={provided.innerRef}
              {...provided.draggableProps}
              style={{ ...provided.draggableProps.style }}
              {...provided.dragHandleProps}
            >
              <div className="card-description">
                <div dangerouslySetInnerHTML={this.rawMarkup()} />
                <FontAwesomeIcon
                  className="edit-icon"
                  icon="edit"
                  size="lg"
                  onClick={this.handleShowMessageClick}
                />
                {this.state.showModal ? (
                  <Modal onClose={this.handleCloseModal}>
                    <MarkdownEditor
                      content={this.props.card}
                      updateContent={this.props.updateCardContent}
                      onClose={this.handleCloseModal}
                    />
                  </Modal>
                ) : null}
              </div>
              <Categories tagIds={this.props.card.tagIds} />
            </div>
          );
        }}
      </Draggable>
    );
  }
}

export default Card;
