import React from "react";
import PropTypes from "prop-types";
import { TagsConsumer } from "../../../Views/Kanban/Tags/TagsContext";
import SelectTag from "./SelectTag";
import CreateTag from "./CreateTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AbsolutePositionPortal extends React.Component {
  render() {
    const style = {
      top: this.props.top,
      left: this.props.left
    };

    return (
      <div className="absolute-position-portal" style={style}>
        <TagsConsumer>
          {tagsList => {
            return (
              <React.Fragment>
                {this.props.option === "select" && (
                  <React.Fragment>
                    <p>Select an available tag</p>
                    <SelectTag
                      tagsList={tagsList}
                      onChangeHandler={this.props.onChangeHandler}
                      cardTags={this.props.cardTags}
                    />
                    <div
                      className="create-tag-container"
                      onClick={() => this.props.handleOptionSelect("create")}
                    >
                      <FontAwesomeIcon icon="plus" size="sm" />
                    </div>
                  </React.Fragment>
                )}
                {this.props.option === "create" && (
                  <CreateTag
                    handleOptionSelect={this.props.handleOptionSelect}
                  />
                )}
              </React.Fragment>
            );
          }}
        </TagsConsumer>
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
