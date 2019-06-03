import React from "react";
import PropTypes from "prop-types";
import { isEqual, sortBy, get } from "lodash";
import TextArea from "react-textarea-autosize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Voting,
  Comments,
  DeleteModal,
  Attachments
} from "components/UI/BoardComponents/Card/components";
import { Tags } from "components/UI/BoardComponents";
import { AcceptCancelButtons, StyledSelect } from "components/UI/PageComponents";
import EditorActivity from "components/UI/BoardComponents/Card/components/EditorActivity";
import { FileDrop, Tooltip, MarkdownEditor } from "components/UI";
import { PageProp } from "components/Pages/PageContext";
import { hasPrivilege, notifyToast } from "utils";
import "./CardEditor.scss";

class CardEditor extends React.Component {
  static propTypes = {
    columns: PropTypes.array,
    updateBoardContent: PropTypes.func,
    onAcceptHandler: PropTypes.func,
    onClose: PropTypes.func,
    type: PropTypes.string,
    handleResetBoard: PropTypes.func,
    handleUpdate: PropTypes.func,
    disableComponents: PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.state = {
      newContent: {}
    };
    if (props.columnId) this.state.newContent.columnId = props.columnId;
  }

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

  resetContent = () => {
    const updateKeys = ["title", "description", "tagIds"];
    const resetVals = { ...this.state.newContent };
    Object.entries(this.state.newContent).forEach(([key, value]) => {
      if (updateKeys.find(field => field === key)) {
        resetVals[key] =
          typeof value === "object" && Array.isArray(value)
            ? []
            : typeof value === "object"
            ? {}
            : "";
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

  handleOnAccept = () => {
    const { updateBoardContent, onAcceptHandler, onClose } = this.props;
    const id = this.props.content && this.props.content.id;
    updateBoardContent({ id, ...this.state.newContent }, "cards").then(e => {
      notifyToast("success", `${id ? "Updated" : "Created new card"}`, { autoClose: 2000 });
      onAcceptHandler && onAcceptHandler();
      !id && onClose && onClose();
    });
  };

  handleOnCancel = () => {
    this.setState({ addComment: "" });
    this.props.onClose && this.props.onClose();
  };

  render() {
    const {
      allowEdit = true,
      updateBoardContent,
      disableComponents = false,
      onClose,
      columns,
      roles,
      content: { id = 0 } = {},
      page: { hasPrivilege: boardPrivilege }
    } = this.props;
    const developers = [{ value: 0, title: "None" }].concat(
      roles
        .filter(r => hasPrivilege("developer", r.privilege, true))
        .map(r => {
          return { value: r.user.id, title: r.user.name };
        })
    );
    let { title, description, tagIds, columnId, assigneeId, votes } = {
      ...this.props.content,
      ...this.state.newContent
    };
    return (
      <FileDrop onDrop={this.onFileUpload}>
        <div id="editor-mode" className="section">
          <Tooltip id="card-editor" />
          <EditorActivity icon="outdent" style={{ paddingTop: "10px" }} dataTip="Card Title">
            {allowEdit ? (
              <TextArea
                id="editor-title"
                className="editable"
                placeholder="Card Title"
                spellCheck={false}
                value={title}
                onChange={e => this.onChangeHandler(e, "title")}
              />
            ) : (
              <div id="editor-title">{title}</div>
            )}
            {allowEdit && this.props.showDeleteModal && (
              <div className="editor-delete-card">
                <FontAwesomeIcon
                  data-tip="Archive this card"
                  data-for="card-editor"
                  icon="archive"
                  size="lg"
                  className="editor-delete-card-icon"
                  onClick={() => this.setState({ openDeleteModal: true })}
                />
              </div>
            )}
          </EditorActivity>
          {disableComponents ? null : (
            <EditorActivity icon="id-card" dataTip="Card ID" className="no-border center">
              {id}
              <div className="editor-vote pull-right">
                <Voting
                  defaultDisplay={true}
                  size="lg"
                  votes={votes}
                  onUpdateVote={this.onUpdateVote}
                />
              </div>
            </EditorActivity>
          )}
          <EditorActivity icon="columns" dataType="Card Column" className="no-border">
            <StyledSelect
              disabled={!(allowEdit && boardPrivilege("developer"))}
              options={columns.map(c => {
                return { value: c.id, title: c.title };
              })}
              onChange={columnId =>
                this.setState({ newContent: { ...this.state.newContent, columnId } })
              }
              value={columnId}
              className="grow"
            />
          </EditorActivity>
          <EditorActivity icon="user" dataTip="Assignee">
            <StyledSelect
              disabled={!(allowEdit && boardPrivilege("developer"))}
              options={developers}
              onChange={assigneeId =>
                this.setState({ newContent: { ...this.state.newContent, assigneeId } })
              }
              value={assigneeId || 0}
              className="grow"
            />
          </EditorActivity>
          <EditorActivity icon="tag" dataTip="Card Tags">
            <Tags
              tagIds={tagIds}
              displayAddTag={allowEdit}
              onChangeHandler={this.onChangeHandler}
              handleUpdate={this.props.handleUpdate}
              updateBoardContent={updateBoardContent}
            />
          </EditorActivity>
          <EditorActivity icon="newspaper" dataTip="Card Description">
            <MarkdownEditor
              className="editor-description"
              allowEdit={allowEdit}
              onChange={e => this.onChangeHandler(e, "description")}
              placeholder="Description"
              onPaste={e => {
                e.preventDefault();
              }}
              value={description}
            />
          </EditorActivity>
          {disableComponents || !this.props.content.attachments.length ? null : (
            <Attachments
              handleUpdate={this.props.handleUpdate}
              attachments={this.props.content.attachments}
            />
          )}
          {disableComponents ? null : (
            <Comments {...this.props} comments={this.props.content.comments} />
          )}
        </div>
        <DeleteModal
          handleCloseModal={() => {
            this.setState({ openDeleteModal: false });
          }}
          onDelete={() => onClose && onClose()}
          isOpen={this.state.openDeleteModal}
          handleUpdate={this.props.handleUpdate}
          cardId={id}
        />
        <AcceptCancelButtons
          onAcceptHandler={this.handleOnAccept}
          onCancelHandler={this.handleOnCancel}
          acceptTitle={"Save"}
          cancelTitle={"Close"}
        />
      </FileDrop>
    );
  }
}
export default PageProp(CardEditor);
