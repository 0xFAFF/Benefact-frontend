import React from "react";
import "./index.scss";

const DEFAULT_HEIGHT = 20;

class TextAreaInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: DEFAULT_HEIGHT
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.setFilledTextareaHeight();
  }

  setFilledTextareaHeight = () => {
    if (this.mounted) {
      const { clientHeight } = this.ghost;
      this.setState({
        height: clientHeight
      });
    }
  };

  setValue = event => {
    const { value } = event.target;
    this.setState({ value });
  };

  getExpandableField() {
    const { height } = this.state;

    return (
      <div>
        <label htmlFor="textarea" />
        <textarea
          className="textarea"
          name="textarea"
          id="textarea"
          autoFocus={true}
          defaultValue={this.props.defaultValue || ""}
          style={{
            height
          }}
          onChange={this.setValue}
          onBlur={this.props.onBlur}
          onKeyUp={this.setFilledTextareaHeight}
        />
      </div>
    );
  }

  getGhostField() {
    return (
      <div
        className="textarea textarea--ghost"
        ref={c => (this.ghost = c)}
        aria-hidden="true"
      >
        {this.state.value}
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        {this.getExpandableField()}
        {this.getGhostField()}
      </div>
    );
  }
}

export default TextAreaInput;
