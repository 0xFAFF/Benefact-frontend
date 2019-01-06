import React from "react";
import PropTypes from "prop-types";
import DeleteColumnWrapper from "./DeleteColumnWrapper";
import DeleteCardWrapper from "./DeleteCardWrapper";
import DeleteTagWrapper from "./DeleteTagWrapper";
import { Back } from "../../../Popup";
import "./index.scss";

class Delete extends React.Component {
  static propTypes = {
    deleteComponent: PropTypes.func,
    cards: PropTypes.array,
    columns: PropTypes.array,
    tags: PropTypes.array
  };

  state = {
    component: null,
    params: {}
  };

  resetDeleteComponentHandler = () => {
    this.setState({ component: null });
  };

  render() {
    const { deleteComponent, cards, columns, tags } = this.props;

    const buttonConfigs = [
      {
        title: "Column",
        component: DeleteColumnWrapper,
        params: {
          deleteComponent: deleteComponent,
          columns: columns,
          cards: cards
        }
      },
      {
        title: "Card",
        component: DeleteCardWrapper,
        params: {
          deleteComponent: deleteComponent,
          columns: columns,
          cards: cards
        }
      },
      {
        title: "Tag",
        component: DeleteTagWrapper,
        params: {
          deleteComponent: deleteComponent,
          tags: tags
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
