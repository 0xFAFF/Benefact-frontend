import React from "react";
import PropTypes from "prop-types";
import { isEqual, sortBy, get } from "lodash";
import TextArea from "react-textarea-autosize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Voting, Comments, DeleteModal } from "components/UI/BoardComponents/Card/components";
import { Tags } from "components/UI/BoardComponents";
import { AcceptCancelButtons } from "components/UI/Popup";
import MarkdownEditor from "components/UI/MarkdownEditor/MarkdownEditor";

import "./CardEditor.scss";

class CardEditor extends React.Component {
  static propTypes = {
    columns: PropTypes.array,
    updateBoardContent: PropTypes.func,
    addComponent: PropTypes.func,
    onAcceptHandler: PropTypes.func,
    onClose: PropTypes.func,
    type: PropTypes.string,
    deleteComponent: PropTypes.func,
    handleResetBoard: PropTypes.func,
    handleUpdate: PropTypes.func,
    disableComponents: PropTypes.bool
  };

  state = {
    newContent: {},
    addComment: "",
    editComment: {
      id: null,
      message: ""
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const prevComments = get(prevState, "newContent.comments", []);
    const nextComments = get(nextProps, "content.comments", []);
    if (!isEqual(sortBy(prevComments), sortBy(nextComments))) {
      return {
        ...prevState,
        newContent: {
          ...prevState.newContent,
          comments: nextComments
        }
      };
    }
    const prevVotes = get(prevState, "newContent.votes", []);
    const nextVotes = get(nextProps, "content.votes", []);
    if (!isEqual(sortBy(prevVotes), sortBy(nextVotes))) {
      return {
        ...prevState,
        newContent: {
          ...prevState.newContent,
          votes: nextVotes
        }
      };
    }

    return prevState;
  }

  componentDidMount() {
    const { columns = [], content = {} } = this.props;
    const { index, ...rest } = content;
    const defaultColumnId = columns[0].id;
    this.setState({
      newContent: {
        title: "",
        description: "",
        tagIds: [],
        columnId: defaultColumnId,
        ...rest
      }
    });
  }

  resetContent = () => {
    const updateKeys = ["title", "description", "tagIds"];
    const resetVals = { ...this.state.newContent };
    Object.entries(this.state.newContent).forEach(([key, value]) => {
      if (updateKeys.find(field => field === key)) {
        resetVals[key] = typeof value === "object" && Array.isArray(value) ? [] : typeof value === "object" ? {} : "";
      }
    });
    this.setState({ newContent: resetVals });
  };

  onChangeHandler = (e, key) => {
    let newState = {};
    if (key === "tag") {
      const tagIds = [...(this.state.newContent.tagIds || [])];
      const index = tagIds.findIndex(tag => tag === e);
      if (index !== -1) {
        tagIds.splice(index, 1);
      } else {
        tagIds.push(e);
      }
      newState = {
        newContent: {
          ...this.state.newContent,
          tagIds
        }
      };
    } else {
      let value = "";
      if (key === "columnId") {
        value = e.target.value === "" ? null : parseInt(e.target.value);
      } else {
        value = e.target.value;
      }
      newState = {
        newContent: {
          ...this.state.newContent,
          [key]: value
        }
      };
    }
    console.log(newState);
    this.setState(newState);
  };

  onChangeComment = (e, type) => {
    if (type === "add") this.setState({ addComment: e.target.value });
    if (type === "edit") {
      e.persist();
      this.setState(prevState => {
        return {
          ...prevState,
          editComment: {
            ...prevState.editComment,
            message: e.target.value
          }
        };
      });
    }
  };

  onUpdateComment = async (commentType, id) => {
    const {
      addComment,
      editComment: { message }
    } = this.state;
    let action = "";
    let text = "";
    const type = "comments";
    let queryParams = {};
    if (commentType === "add") {
      action = "ADD";
      text = addComment;
      queryParams = {
        cardId: id,
        text
      };
    } else if (commentType === "edit") {
      action = "UPDATE";
      text = message;
      queryParams = {
        id,
        text
      };
    } else if (commentType === "delete") {
      action = "DELETE";
      queryParams = {
        id
      };
    }

    await this.props.handleUpdate(type, action, queryParams);
    this.setState(prevState => {
      return {
        ...prevState,
        addComment: "",
        editComment: {
          ...prevState.editComment,
          id: null,
          message: ""
        }
      };
    });
  };

  onUpdateVote = async voteType => {
    let queryParams = {};
    if (voteType === "add") {
      queryParams = {
        cardId: this.props.content.id,
        count: 1
      };
    } else if (voteType === "subtract") {
      queryParams = {
        cardId: this.props.content.id,
        count: -1
      };
    }

    await this.props.handleUpdate("votes", "UPDATE", queryParams);
  };

  render() {
    const { updateBoardContent, onAcceptHandler, disableComponents = false } = this.props;
    const {
      id = 0,
      title = "",
      description = "",
      tagIds = [],
      columnId,
      comments = [],
      votes = []
    } = this.state.newContent;
    const { addComment } = this.state;
    return (
      <div id="markdown-editor">
        <div className="markdown-modes">
          <div id="editor-mode">
            <div className="editor-container">
              <FontAwesomeIcon className="container-icon" icon={"outdent"} size="lg" />
              <TextArea
                className="editor-text-area"
                id="editor-title"
                spellCheck={false}
                minRows={1}
                value={title}
                onChange={e => this.onChangeHandler(e, "title")}
              />
              {this.props.showDeleteModal && (
                <div className="editor-delete-card">
                  <FontAwesomeIcon
                    icon="trash"
                    size="lg"
                    className="editor-delete-card-icon"
                    onClick={() => this.setState({ openDeleteModal: true })}
                  />
                </div>
              )}
            </div>
            {disableComponents ? null : (
              <div className="editor-header flex-row row-margin">
                <div id="editor-id" className="flex-row">
                  <FontAwesomeIcon className="container-icon container-icon-padding" icon={"id-card"} size="lg" />
                  <div>{id}</div>
                </div>
                <div className="editor-vote">
                  <Voting defaultDisplay={true} size="lg" votes={votes} onUpdateVote={this.onUpdateVote} />
                </div>
              </div>
            )}
            <div id="editor-column" className="flex-row row-margin">
              <FontAwesomeIcon className="container-icon container-icon-padding" icon={"columns"} size="lg" />
              <div className="styled-select background-color semi-square">
                <select onChange={e => this.onChangeHandler(e, "columnId")} value={columnId}>
                  {this.props.columns.map(option => {
                    return (
                      <option key={option.id} value={option.id}>
                        {option.title}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="editor-container">
              <FontAwesomeIcon className="container-icon" style={{ paddingTop: "5px" }} icon={"tag"} size="lg" />
              <Tags
                tagIds={tagIds}
                displayAddTag={true}
                onChangeHandler={this.onChangeHandler}
                addComponent={this.props.addComponent}
                updateBoardContent={updateBoardContent}
              />
            </div>
            <div className="editor-container">
              <FontAwesomeIcon className="container-icon" style={{ paddingTop: "10px" }} icon={"newspaper"} size="lg" />
              <MarkdownEditor onChange={e => this.onChangeHandler(e, "description")} content={description}/>
              {/* <TextArea
                className="editor-text-area"
                minRows={1}
                value={description}
                onChange={e => this.onChangeHandler(e, "description")}
              /> */}
            </div>
            {disableComponents ? null : (
              <>
                <div className="editor-container">
                  <FontAwesomeIcon
                    className="container-icon"
                    style={{ paddingTop: "10px" }}
                    icon={"comment"}
                    size="lg"
                  />
                  <TextArea
                    className="editor-text-area"
                    minRows={1}
                    value={addComment}
                    onChange={e => this.onChangeComment(e, "add")}
                  />
                  <button
                    className="editor-comments-save"
                    disabled={!this.state.addComment}
                    onMouseDown={() => {
                      if (this.state.addComment) this.onUpdateComment("add", id);
                    }}
                  >
                    Add
                  </button>
                </div>

                <div className="editor-container">
                  <FontAwesomeIcon
                    className="container-icon"
                    style={{ paddingTop: comments.length > 0 ? "10px" : "0px" }}
                    icon={"comments"}
                    size="lg"
                  />
                  <Comments
                    comments={comments}
                    onUpdateComment={this.onUpdateComment}
                    onChangeComment={this.onChangeComment}
                    editComment={this.state.editComment}
                    onFocusEditComment={this.onFocusEditComment}
                  />
                </div>
              </>
            )}
            <AcceptCancelButtons
              onAcceptHandler={() => {
                updateBoardContent(this.state.newContent, "cards");
                onAcceptHandler();
              }}
              onCancelHandler={() => {
                this.setState({ addComment: "" });
                this.resetContent();
              }}
              acceptTitle={"Save"}
              cancelTitle={"Reset"}
            />
            <DeleteModal
              handleCloseModal={() => this.setState({ openDeleteModal: false })}
              isOpen={this.state.openDeleteModal}
              deleteComponent={this.props.deleteComponent}
              cardId={id}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CardEditor;
