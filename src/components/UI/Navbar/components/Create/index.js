import React from "react";
import AddColumnWrapper from "./AddColumnWrapper";
import AddCardWrapper from "./AddCardWrapper";
import AddTagWrapper from "./AddTagWrapper";
import { Back } from "../../../Popup";
import "./index.scss";

class Create extends React.Component {
  state = {
    component: null,
    params: {}
  };

  resetCreateComponentHandler = () => {
    this.setState({ component: null });
  };

  render() {
    const buttonConfigs = [
      {
        title: "Column",
        component: AddColumnWrapper,
        params: {
          addNewColumn: this.props.addNewColumn
        }
      },
      {
        title: "Card",
        component: AddCardWrapper,
        params: {
          cardMap: this.props.cardMap,
          addNewCard: this.props.addNewCard
        }
      },
      {
        title: "Tag",
        component: AddTagWrapper,
        params: {
          addNewTag: this.props.addNewTag
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
              setPopupStyle={this.props.setPopupStyle}
              resetCreateComponentHandler={this.resetCreateComponentHandler}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Create;
