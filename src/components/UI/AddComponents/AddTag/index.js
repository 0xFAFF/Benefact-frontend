import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PortalWithState } from "react-portal";
import AbsolutePositionPortal from "./AbsolutePositionPortal";
import "./index.scss";

class AddTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: "select",
      currSelectedTag: null
    };
  }

  handleOptionSelect = (option, tag) => {
    this.setState({ option, currSelectedTag: tag ? tag : null });
  };

  render() {
    return (
      <PortalWithState closeOnEsc>
        {({ openPortal, closePortal, isOpen, portal }) => (
          <React.Fragment>
            <div
              id="add-tag"
              onClick={e => {
                openPortal(e);
                this.setState({ option: "select" });
              }}
            >
              <FontAwesomeIcon icon="plus" size="sm" />
            </div>
            {portal(
              <AbsolutePositionPortal
                cardTags={this.props.cardTags}
                onChangeHandler={this.props.onChangeHandler}
                addNewTag={this.props.addNewTag}
                option={this.state.option}
                currSelectedTag={this.state.currSelectedTag}
                updateBoardContent={this.props.updateBoardContent}
                handleOptionSelect={this.handleOptionSelect}
                onClose={closePortal}
              />
            )}
          </React.Fragment>
        )}
      </PortalWithState>
    );
  }
}

export default AddTag;
