import React from "react";
import { Confirm } from "../../../../Popup";
import DisplayTag from "../../../../BoardComponents/Tags/DisplayTag";
import "./index.scss";

class DeleteTagWrapper extends React.Component {
  state = {
    tag: null
  };

  onAcceptHandler = () => {
    this.props.deleteComponent("tags", "DELETE", { id: this.state.tag.id });
    this.props.resetDeleteComponentHandler();
  };

  onCancelHandler = () => {
    this.setState({ tag: null });
  };

  render() {
    const { tags } = this.props;
    return (
      <div id="delete-tag-outer">
        {!this.state.tag ? (
          <React.Fragment>
            <div className="title">Tags</div>
            <div className="delete-button-container">
              <div className="delete-ul-container">
                <ul className="delete-tag-ul">
                  {tags.map(tag => {
                    return (
                      <div
                        className="delete-tag-li-container"
                        key={tag.id}
                        onClick={() => this.setState({ tag })}
                      >
                        <DisplayTag tag={tag} />
                      </div>
                    );
                  })}
                </ul>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <Confirm
            onAcceptHandler={this.onAcceptHandler}
            onCancelHandler={this.onCancelHandler}
          >
            <div id="selected-tag">
              <ul className="delete-tag-ul">
                <div className="delete-selected-tag-li-container">
                  <DisplayTag tag={this.state.tag} />
                </div>
              </ul>
            </div>
          </Confirm>
        )}
      </div>
    );
  }
}
export default DeleteTagWrapper;
