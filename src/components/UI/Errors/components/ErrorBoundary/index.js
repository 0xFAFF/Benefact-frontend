import React from "react";
import "./index.scss";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    if (error) {
      console.log(error);
      console.warn(error);
      this.setState({ hasError: true });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div id="error-boundary">
          <div className="container">
            <div>Oops! Something went wrong! :(</div>
            <div>Refresh the page and try again.</div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
