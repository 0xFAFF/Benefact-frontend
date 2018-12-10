import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PortalWithState } from "react-portal";
import AbsolutePositionPortal from "./AbsolutePositionPortal";
import "./index.scss";

class AddTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portalPosition: {
        top: 35,
        left: 0
      },
      option: "select"
    };
  }

  handleOptionSelect = option => {
    this.setState({ option });
  };

  render() {
    return (
      <PortalWithState closeOnEsc>
        {({ openPortal, closePortal, isOpen, portal }) => (
          <React.Fragment>
            <div
              ref={m => (this.addTagDiv = m)}
              id="add-tag"
              onClick={e => {
                const bodyRect = document.body.getBoundingClientRect();
                const targetRect = this.addTagDiv.getBoundingClientRect();
                openPortal(e);
                this.setState({
                  option: "select",
                  top:
                    targetRect.top -
                    bodyRect.top +
                    this.state.portalPosition.top,
                  left:
                    targetRect.left -
                    bodyRect.left +
                    this.state.portalPosition.left
                });
              }}
            >
              <FontAwesomeIcon icon="plus" size="sm" />
            </div>
            {portal(
              <AbsolutePositionPortal
                left={this.state.left}
                top={this.state.top}
                cardTags={this.props.cardTags}
                onChangeHandler={this.props.onChangeHandler}
                option={this.state.option}
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
