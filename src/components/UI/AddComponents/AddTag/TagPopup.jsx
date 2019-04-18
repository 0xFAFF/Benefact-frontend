import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TagsConsumer } from "../../BoardComponents/Tags/TagsContext";
import { SelectTag, CreateTag } from "./components";
import { Back } from "../../Popup";

class TagPopup extends React.Component {
  static propTypes = {
    onChangeHandler: PropTypes.func,
    cardTags: PropTypes.array,
    addComponent: PropTypes.func,
    updateBoardContent: PropTypes.func
  };

  state = {
    option: "select",
    currSelectedTag: null
  };

  handleOptionSelect = (option, tag) => {
    this.setState({ option, currSelectedTag: tag ? tag : null });
  };

  render() {
    const {
      onChangeHandler,
      cardTags,
      addComponent,
      updateBoardContent
    } = this.props;
    return (
      <div className="tag-popup">
        <TagsConsumer>
          {tagsList => {
            return (
              <>
                {this.state.option === "select" && (
                  <>
                    <p>Select A Tag</p>
                    <SelectTag
                      tagsList={tagsList}
                      onChangeHandler={onChangeHandler}
                      cardTags={cardTags}
                      handleOptionSelect={this.handleOptionSelect}
                    />
                    <div
                      className="create-tag-container"
                      onClick={() => this.handleOptionSelect("create")}
                    >
                      <FontAwesomeIcon icon="plus-circle" size="sm" />
                      <span>Create New Tag</span>
                    </div>
                  </>
                )}
                {this.state.option === "create" && (
                  <>
                    <Back onClick={() => this.handleOptionSelect("select")} />
                    <CreateTag
                      onAcceptHandler={() => this.handleOptionSelect("select")}
                      currSelectedTag={this.state.currSelectedTag}
                      addComponent={addComponent}
                      updateBoardContent={updateBoardContent}
                      onClose={this.onClose}
                    />
                  </>
                )}
              </>
            );
          }}
        </TagsConsumer>
      </div>
    );
  }
}

export default TagPopup;
