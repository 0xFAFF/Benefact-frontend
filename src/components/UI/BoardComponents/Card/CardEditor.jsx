import React from "react";
import PropTypes from "prop-types";
import { isEqual, sortBy, get } from "lodash";
import TextArea from "react-textarea-autosize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Voting, Comments, DeleteModal, Attachments } from "components/UI/BoardComponents/Card/components";
import { Tags } from "components/UI/BoardComponents";
import { AcceptCancelButtons } from "components/UI/Popup";
import MarkdownEditor from "components/UI/MarkdownEditor/MarkdownEditor";
import EditorActivity from "components/UI/BoardComponents/Card/components/EditorActivity";
import { FileDrop, Tooltip } from "components/UI";

import "./CardEditor.scss";
import { PageProp } from "components/Pages/PageContext";

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

  onFileUpload = async file => {
    let queryParams = new FormData();
    queryParams.append("CardId", this.props.content.id);
    queryParams.append("File", file);
    await this.props.handleUpdate("files", "ADD", queryParams, (e, next) => {
      if (e.status === 413) e.message = "The file is too large";
      next();
    });
  };

  render() {
    const { page, updateBoardContent, onAcceptHandler, disableComponents = false, onClose } = this.props;
    const { hasPrivilege } = page;
    const { id = 0, title = "", description = "", tagIds = [], columnId, votes = [] } = this.state.newContent;
    return (
      <div id="editor-mode">
        <Tooltip id="card-editor" />
        <FileDrop onDrop={this.onFileUpload}>
          <EditorActivity icon="outdent" style={{ paddingTop: "10px" }} dataTip="Card Title">
            <TextArea
              id="editor-title"
              className="editable"
              spellCheck={false}
              minRows={1}
              value={title}
              onChange={e => this.onChangeHandler(e, "title")}
            />
            {this.props.showDeleteModal && (
              <div className="editor-delete-card">
                <FontAwesomeIcon
                  data-tip="Delete this card"
                  data-for="card-editor"
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
                <FontAwesomeIcon
                  data-tip="Card ID"
                  data-for="card-editor"
                  className="container-icon container-icon-padding"
                  icon={"id-card"}
                  size="lg"
                />
                <div>{id}</div>
              </div>
              <div className="editor-vote">
                <Voting defaultDisplay={true} size="lg" votes={votes} onUpdateVote={this.onUpdateVote} />
              </div>
            </div>
          )}
          <div id="editor-column" className="flex-row row-margin">
            <FontAwesomeIcon
              data-tip="Card Column"
              data-for="card-editor"
              className="container-icon container-icon-padding"
              icon={"columns"}
              size="lg"
            />
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
          <EditorActivity icon="tag" dataTip="Card Tags">
            <Tags
              tagIds={tagIds}
              displayAddTag={true}
              onChangeHandler={this.onChangeHandler}
              addComponent={this.props.addComponent}
              updateBoardContent={updateBoardContent}
            />
          </EditorActivity>
          <EditorActivity icon="newspaper" dataTip="Card Description">
            <MarkdownEditor
              className="editor-description"
              allowEdit={hasPrivilege("developer")}
              onChange={e => this.onChangeHandler(e, "description")}
              onPaste={e => {
                e.preventDefault();
              }}
              value={description}
            />
          </EditorActivity>
          {disableComponents || !this.props.content.attachments.length ? null : (
            <Attachments handleUpdate={this.props.handleUpdate} attachments={this.props.content.attachments} />
          )}
          {disableComponents ? null : <Comments {...this.props} comments={this.props.content.comments} />}
          <AcceptCancelButtons
            onAcceptHandler={() => {
              updateBoardContent(this.state.newContent, "cards").then(e => {
                onAcceptHandler && onAcceptHandler();
                onClose && onClose();
              });
            }}
            onCancelHandler={() => {
              this.setState({ addComment: "" });
              onClose && onClose();
            }}
            acceptTitle={"Save"}
            cancelTitle={"Close"}
          />
          <DeleteModal
            handleCloseModal={() => {
              this.setState({ openDeleteModal: false });
            }}
            onDelete={() => onClose && onClose()}
            isOpen={this.state.openDeleteModal}
            deleteComponent={this.props.deleteComponent}
            cardId={id}
          />
        </FileDrop>
      </div>
    );
  }
}
export default PageProp(CardEditor);
