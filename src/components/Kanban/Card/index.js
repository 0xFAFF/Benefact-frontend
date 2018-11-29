import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Modal, MarkdownEditor } from "../../UI";
import marked from "marked";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

class Card extends React.Component {
  state = { showModal: false };
  handleShowMessageClick = () => this.setState({ showModal: true });
  handleCloseModal = () => this.setState({ showModal: false });

  rawMarkup = () => {
    const { id = "N/A", title = "N/A" } = this.props.card;
    const cardDescription = "ID: " + id + "\nTitle: " + title;
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
      <Draggable draggableId={this.props.card.id} index={this.props.index}>
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
                <div style={{ cursor: "pointer" }}>
                  <FontAwesomeIcon
                    icon="edit"
                    size="lg"
                    onClick={this.handleShowMessageClick}
                  />
                </div>
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
            </div>
          );
        }}
      </Draggable>
    );
  }
}

export default Card;
