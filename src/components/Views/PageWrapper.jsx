import React from "react";
import PropTypes from "prop-types";
import { fetching, notifyToast } from "../../utils";
import { URLS } from "../../constants";
import { PacmanLoader } from "../UI/Loader";

function PageWrapper(Component) {
  return class extends React.Component {
    static propTypes = {
      boardId: PropTypes.string,
    };
    constructor(props) {
      super(props)
      this.state = {
        isLoading: false,
      };
      this.errorHandler = e => notifyToast("error", e.message, "top-center");
      this.dataSource = null;
      this.extraProps = {
        compFetch: this.compFetch,
        dataSource: d => this.dataSource = d,
        handleError: h => this.errorHandler = h,
      };
    }
    componentDidMount = async () => {
      let data = null;
      if (this.dataSource) {
        data = await this.dataSource({ ...this.props, ...this.extraProps });
      }
      this.setState({ data, isLoading: false });
    }

    compFetch = async (type, action, queryParams, errorHandler) => {
      const { boardId, token } = this.props;
      return await fetching(URLS(type, action, { boardId }), queryParams, token)
        .then(async res => {
          if (res.status === 200)
            return res.json();
          else {
            const error = { status: res.status, message: await res.text() }
            errorHandler = errorHandler || this.errorHandler;
            if (errorHandler)
              errorHandler(error);
            else
              console.warn(error)
          }
        })
    };

    render = () => {
      if (this.state.isLoading) {
        return <PacmanLoader />;
      }
      return <Component data={this.state.data} {...this.extraProps} {...this.props} />;
    }
  }
}

export default PageWrapper;