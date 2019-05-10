import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PageProp } from "components/Pages/PageContext";
import "./CreateBoard.scss";

class CreateBoard extends React.Component {
  state = {
    fields: {
      title: "",
      urlName: ""
    }
  };

  onInputChangeHandler = (e, field) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [field]: e.target.value
      }
    });
  };

  onCreateBoard = async () => {
    const {
      fields: { title, urlName }
    } = this.state;
    if (!title || !urlName) {
      console.warn("There's an empty field");
      return;
    }

    const queryParams = {
      title,
      urlName
    };
    await this.props.page.compFetch("boards", "ADD", queryParams).then(result => {
      if (result) {
        this.props.page.closeModal();
        this.props.page.history.push(`/board/${urlName}`);
      }
    });
  };

  handlePressEnter = e => {
    if (e.key === "Enter") {
      this.onCreateBoard();
    }
  };

  render() {
    return (
      <div id="create-board" className="flex col" onKeyPress={this.handlePressEnter}>
        <div className="create-board-header">Create a New Board</div>
        <div className="input-container flex row">
          <div className="input-icon">
            <FontAwesomeIcon icon="columns" size="lg" />
          </div>
          <input
            autoFocus
            className="input-field"
            id="boardTitle"
            name="boardTitle"
            placeholder="Board Title"
            value={this.state.title}
            onChange={e => this.onInputChangeHandler(e, "title")}
          />
        </div>
        <div className="input-container flex row">
          <div className="input-icon">
            <FontAwesomeIcon icon="link" size="lg" />
          </div>
          <input
            className="input-field"
            id="urlName"
            name="urlName"
            placeholder="URL Name"
            value={this.state.urlName}
            onChange={e => this.onInputChangeHandler(e, "urlName")}
          />
        </div>
        <button className="create-board-button" onClick={this.onCreateBoard}>
          Create Board
        </button>
      </div>
    );
  }
}

export default PageProp(CreateBoard);
