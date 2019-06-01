import React from "react";
import PropTypes from "prop-types";
import { SelectTag, CreateTag } from "./components";
import { PageConsumer } from "components/Pages/PageContext";
import { Button, ButtonGroup } from "components/UI/PageComponents";

class TagPopup extends React.Component {
  static propTypes = {
    onChangeHandler: PropTypes.func,
    cardTags: PropTypes.array,
    handleUpdate: PropTypes.func,
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
    const { onChangeHandler, cardTags, handleUpdate, updateBoardContent } = this.props;
    return (
      <div className="tag-popup">
        <PageConsumer>
          {page => {
            return (
              <>
                {this.state.option === "select" && (
                  <>
                    <ButtonGroup>
                      <Button onClick={() => this.handleOptionSelect("create")}>
                        Create New Tag
                      </Button>
                    </ButtonGroup>
                    <SelectTag
                      tagsList={page.data.tags}
                      onChangeHandler={onChangeHandler}
                      cardTags={cardTags}
                      handleOptionSelect={this.handleOptionSelect}
                    />
                  </>
                )}
                {this.state.option === "create" && (
                  <>
                    <ButtonGroup>
                      <Button onClick={() => this.handleOptionSelect("select")}>Back</Button>
                    </ButtonGroup>
                    <CreateTag
                      onAcceptHandler={() => this.handleOptionSelect("select")}
                      currSelectedTag={this.state.currSelectedTag}
                      handleUpdate={handleUpdate}
                      updateBoardContent={updateBoardContent}
                      onClose={this.onClose}
                    />
                  </>
                )}
              </>
            );
          }}
        </PageConsumer>
      </div>
    );
  }
}

export default TagPopup;
