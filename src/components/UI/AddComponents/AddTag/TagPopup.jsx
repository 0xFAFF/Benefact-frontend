import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TagsConsumer } from "../../BoardComponents/Tags/TagsContext";
import { SelectTag, CreateTag } from "./components";
import { Back } from "../../Popup";

class TagPopup extends React.Component {
  state = {
    option: "select",
    currSelectedTag: null
  };

  handleOptionSelect = (option, tag) => {
    this.setState({ option, currSelectedTag: tag ? tag : null });
  };

  render() {
    return (
      <div className="tag-popup">
        <TagsConsumer>
          {tagsList => {
            return (
              <React.Fragment>
                {this.state.option === "select" && (
                  <React.Fragment>
                    <p>Select A Tag</p>
                    <SelectTag
                      tagsList={tagsList}
                      onChangeHandler={this.props.onChangeHandler}
                      cardTags={this.props.cardTags}
                      handleOptionSelect={this.handleOptionSelect}
                    />
                    <div
                      className="create-tag-container"
                      onClick={() => this.handleOptionSelect("create")}
                    >
                      <FontAwesomeIcon icon="plus" size="sm" />
                      <span>Create New Tag</span>
                    </div>
                  </React.Fragment>
                )}
                {this.state.option === "create" && (
                  <React.Fragment>
                    <Back onClick={() => this.handleOptionSelect("select")} />
                    <CreateTag
                      onAcceptHandler={() => this.handleOptionSelect("select")}
                      currSelectedTag={this.state.currSelectedTag}
                      addComponent={this.props.addComponent}
                      updateBoardContent={this.props.updateBoardContent}
                      onClose={this.onClose}
                    />
                  </React.Fragment>
                )}
              </React.Fragment>
            );
          }}
        </TagsConsumer>
      </div>
    );
  }
}

export default TagPopup;
