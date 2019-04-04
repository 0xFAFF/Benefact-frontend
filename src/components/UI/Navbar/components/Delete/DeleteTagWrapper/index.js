import React from "react";
import PropTypes from "prop-types";
import { Confirm, Back } from "../../../../Popup";
import DisplayTag from "../../../../BoardComponents/Tags/DisplayTag";
import "./index.scss";

class DeleteTagWrapper extends React.Component {
  static propTypes = {
    tags: PropTypes.array,
    deleteComponent: PropTypes.func,
    onClose: PropTypes.func
  };

  state = {
    tag: null
  };

  onAcceptHandler = () => {
    this.props.deleteComponent("tags", { id: this.state.tag.id });
    this.props.onClose();
  };

  onCancelHandler = () => {
    this.setState({ tag: null });
  };

  render() {
    const { tags } = this.props;
    return (
      <div id="delete-tag-outer">
        {!this.state.tag ? (
          <>
            <Back
              title={"Back"}
              onClick={() => this.props.resetDeleteComponentHandler()}
            />
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
          </>
        ) : (
          <Confirm
            onAcceptHandler={this.onAcceptHandler}
            onCancelHandler={this.onCancelHandler}
          >
            <Back title={"Back"} onClick={() => this.onCancelHandler()} />
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
