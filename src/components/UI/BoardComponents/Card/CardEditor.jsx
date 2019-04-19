import React from "react";
import PropTypes from "prop-types";
import { isEqual, sortBy, get } from "lodash";
import TextArea from "react-textarea-autosize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Voting, Comments, DeleteModal, Attachments } from "components/UI/BoardComponents/Card/components";
import { Tags } from "components/UI/BoardComponents";
import { AcceptCancelButtons } from "components/UI/Popup";
import MarkdownEditor from "components/UI/MarkdownEditor/MarkdownEditor";

import "./CardEditor.scss";
import EditorActivity from "components/UI/BoardComponents/Card/components/EditorActivity";

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
    newContent: {}
  };

  static getDerivedStateFromProps(nextProps, prevState) {
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
    this.setState(newState);
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
    const { id = 0, title = "", description = "", tagIds = [], columnId, votes = [] } = this.state.newContent;
    return (
      <div id="editor-mode">
        <EditorActivity icon="outdent">
          <TextArea
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
        </EditorActivity>
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
        <EditorActivity icon="tag">
          <Tags
            tagIds={tagIds}
            displayAddTag={true}
            onChangeHandler={this.onChangeHandler}
            addComponent={this.props.addComponent}
            updateBoardContent={updateBoardContent}
          />
        </EditorActivity>
        <EditorActivity icon="newspaper">
          <MarkdownEditor
            className="editor-description"
            onChange={e => this.onChangeHandler(e, "description")}
            value={description}
          />
        </EditorActivity>
        <Attachments attachments={this.props.content.attachments}/>
        {disableComponents ? null : <Comments {...this.props} comments={this.props.content.comments} />}
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
    );
  }
}

export default CardEditor;
