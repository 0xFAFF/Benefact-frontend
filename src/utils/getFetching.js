import React from "react";
import { titleCase } from ".";

const getFetching = url => Component =>
  class GetFetching extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        data: null,
        isLoading: false
      };
    }

    componentDidMount = async () => {
      this.setState({ isLoading: true });

      const config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(titleCase({ boardId: 1 }))
      };
      const result = await fetch(url, config);
      if (result.status === 200) {
        this.setState({
          data: await result.json(),
          isLoading: false
        });
      } else {
        this.setState({
          isLoading: false
        });
      }
    };

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  };

export default getFetching;
