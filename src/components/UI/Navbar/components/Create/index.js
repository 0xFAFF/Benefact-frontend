import React from "react";
import PropTypes from "prop-types";
import AddColumnWrapper from "./AddColumnWrapper";
import AddCardWrapper from "./AddCardWrapper";
import AddTagWrapper from "./AddTagWrapper";
import { Back } from "../../../Popup";
import "./index.scss";

class Create extends React.Component {
  static propTypes = {
    addComponent: PropTypes.func,
    cards: PropTypes.array,
    columns: PropTypes.array,
    onClose: PropTypes.func,
    popupStyle: PropTypes.object,
    setPopupStyle: PropTypes.func
  };

  state = {
    component: null,
    params: {}
  };

  resetCreateComponentHandler = () => {
    this.setState({ component: null });
  };

  render() {
    const { addComponent, cards, columns } = this.props;
    const buttonConfigs = [
      {
        title: "Column",
        component: AddColumnWrapper,
        params: {
          addComponent: addComponent
        }
      },
      {
        title: "Card",
        component: AddCardWrapper,
        params: {
          cards: cards,
          columns: columns,
          addComponent: addComponent
        }
      },
      {
        title: "Tag",
        component: AddTagWrapper,
        params: {
          addComponent: addComponent
        }
      }
    ];
    return (
      <div id="create-popup">
        {!this.state.component && (
          <div className="component-less">
            <div className="title">Create New Component</div>
            <div className="create-button-group">
              {buttonConfigs.map(btn => (
                <button
                  key={btn.title}
                  onClick={() =>
                    this.setState({
                      component: btn.component,
                      params: btn.params
                    })
                  }
                >
                  {btn.title}
                </button>
              ))}
            </div>
          </div>
        )}
        {this.state.component && (
          <React.Fragment>
            <Back onClick={() => this.resetCreateComponentHandler()} />
            <this.state.component
              {...this.state.params}
              {...this.props}
              resetCreateComponentHandler={this.resetCreateComponentHandler}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Create;
