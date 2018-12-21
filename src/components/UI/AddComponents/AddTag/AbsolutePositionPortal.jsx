import React from "react";
import PropTypes from "prop-types";
import { TagsConsumer } from "../../BoardComponents/Tags/TagsContext";
import SelectTag from "./SelectTag";
import CreateTag from "./CreateTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AbsolutePositionPortal extends React.Component {
  render() {
    const modalContainer = document.getElementById("modal-container");
    const style = {
      top: modalContainer.getBoundingClientRect().top,
      left: modalContainer.getBoundingClientRect().right
    };
    return (
      <div className="portal-outer-container">
        <div className="absolute-position-portal" style={style}>
          <TagsConsumer>
            {tagsList => {
              return (
                <React.Fragment>
                  {this.props.option === "select" && (
                    <React.Fragment>
                      <div className="top-nav">
                        <div style={{ cursor: "pointer" }}>
                          <FontAwesomeIcon
                            icon="times"
                            size="lg"
                            onClick={this.props.onClose}
                          />
                        </div>
                      </div>
                      <p>Select A Tag</p>
                      <SelectTag
                        tagsList={tagsList}
                        onChangeHandler={this.props.onChangeHandler}
                        cardTags={this.props.cardTags}
                        handleOptionSelect={this.props.handleOptionSelect}
                      />
                      <div
                        className="create-tag-container"
                        onClick={() => this.props.handleOptionSelect("create")}
                      >
                        <FontAwesomeIcon icon="plus" size="sm" />
                        <span>Create New Tag</span>
                      </div>
                    </React.Fragment>
                  )}
                  {this.props.option === "create" && (
                    <CreateTag
                      currSelectedTag={this.props.currSelectedTag}
                      handleOptionSelect={this.props.handleOptionSelect}
                      addNewTag={this.props.addNewTag}
                      updateBoardContent={this.props.updateBoardContent}
                    />
                  )}
                </React.Fragment>
              );
            }}
          </TagsConsumer>
        </div>
      </div>
    );
  }
}

AbsolutePositionPortal.propTypes = {
  top: PropTypes.number,
  left: PropTypes.number,
  closePortal: PropTypes.func
};
export default AbsolutePositionPortal;
