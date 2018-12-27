import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TagsConsumer } from "../../BoardComponents/Tags/TagsContext";
import { SelectTag, CreateTag } from "./components";
import { TopDelete, Back } from "../../Popup";

class TagPopup extends React.Component {
  render() {
    const modalContainer = document.getElementById("modal-container");
    const style = {
      top: modalContainer.getBoundingClientRect().top,
      left: modalContainer.getBoundingClientRect().right
    };
    return (
      <div id="tag-pop-portal">
        <div className="portal-outer-container">
          <div className="tag-popup" style={style}>
            <TagsConsumer>
              {tagsList => {
                return (
                  <React.Fragment>
                    <TopDelete onClick={this.props.onClose} />
                    {this.props.option === "select" && (
                      <React.Fragment>
                        <p>Select A Tag</p>
                        <SelectTag
                          tagsList={tagsList}
                          onChangeHandler={this.props.onChangeHandler}
                          cardTags={this.props.cardTags}
                          handleOptionSelect={this.props.handleOptionSelect}
                        />
                        <div
                          className="create-tag-container"
                          onClick={() =>
                            this.props.handleOptionSelect("create")
                          }
                        >
                          <FontAwesomeIcon icon="plus" size="sm" />
                          <span>Create New Tag</span>
                        </div>
                      </React.Fragment>
                    )}
                    {this.props.option === "create" && (
                      <React.Fragment>
                        <Back
                          onClick={() =>
                            this.props.handleOptionSelect("select")
                          }
                        />
                        <CreateTag
                          onAcceptHandler={() =>
                            this.props.handleOptionSelect("select")
                          }
                          currSelectedTag={this.props.currSelectedTag}
                          addNewTag={this.props.addNewTag}
                          updateBoardContent={this.props.updateBoardContent}
                          onClose={this.props.onClose}
                        />
                      </React.Fragment>
                    )}
                  </React.Fragment>
                );
              }}
            </TagsConsumer>
          </div>
        </div>
      </div>
    );
  }
}

TagPopup.propTypes = {
  top: PropTypes.number,
  left: PropTypes.number,
  closePortal: PropTypes.func
};
export default TagPopup;
