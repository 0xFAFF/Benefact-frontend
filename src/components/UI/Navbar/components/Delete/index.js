import React from "react";
import DeleteColumnWrapper from "./DeleteColumnWrapper";
import DeleteCardWrapper from "./DeleteCardWrapper";
import DeleteTagWrapper from "./DeleteTagWrapper";
import { Back } from "../../../Popup";
import "./index.scss";

class Delete extends React.Component {
  state = {
    component: null,
    params: {}
  };

  resetDeleteComponentHandler = () => {
    this.setState({ component: null });
  };

  render() {
    const buttonConfigs = [
      {
        title: "Column",
        component: DeleteColumnWrapper,
        params: {
          deleteComponent: this.props.deleteComponent,
          columns: this.props.columns,
          cardMap: this.props.cardMap
        }
      },
      {
        title: "Card",
        component: DeleteCardWrapper,
        params: {
          deleteComponent: this.props.deleteComponent,
          columns: this.props.columns,
          cardMap: this.props.cardMap
        }
      },
      {
        title: "Tag",
        component: DeleteTagWrapper,
        params: {
          deleteComponent: this.props.deleteComponent,
          tags: this.props.tags
        }
      }
    ];
    return (
      <div id="delete-popup">
        {!this.state.component && (
          <div className="component-less">
            <div className="title">Delete a Component</div>
            <div className="delete-button-group">
              {buttonConfigs.map(btn => (
                <button
                  className="delete-popup-button"
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
            <Back
              title={"Back"}
              onClick={() => this.resetDeleteComponentHandler()}
            />
            <this.state.component
              {...this.state.params}
              {...this.props}
              resetDeleteComponentHandler={this.resetDeleteComponentHandler}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Delete;
