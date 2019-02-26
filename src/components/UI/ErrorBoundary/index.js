import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    console.log(error);
    if (error) {
      console.log(error);
      this.setState({ hasError: true });
    }
  }

  render() {
    console.log("TEST");
    if (this.state.hasError) {
      return <h4>Something went wrong.</h4>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
