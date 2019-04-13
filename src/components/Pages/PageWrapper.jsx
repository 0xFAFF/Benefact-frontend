import React from "react";
import PropTypes from "prop-types";
import { fetching, notifyToast, camelCase } from "../../utils";
import { URLS } from "../../constants";
import { PacmanLoader } from "../UI/Loader";

const PageWrapper = Component => {
  return class extends React.Component {
    static propTypes = {
      boardId: PropTypes.string,
      token: PropTypes.string
    };
    constructor(props) {
      super(props);
      this.state = {
        isLoading: false,
        data: null,
        dataSource: null
      };
      this.errorHandler = e => notifyToast("error", e.message, "top-center");
      this.extraProps = {
        compFetch: this.compFetch,
        handleError: h => (this.errorHandler = h)
      };
    }

    compFetch = async (type, action, queryParams, errorHandler) => {
      const { boardId, token } = this.props;
      return await fetching(
        URLS(type, action, {
          ...(boardId && { boardId })
        }),
        queryParams,
        token
      ).then(async res => {
        var result = camelCase(await res.json());
        if (res.status === 200) return result;
        else {
          const error = { status: res.status, ...result };
          errorHandler = errorHandler || this.errorHandler;
          if (errorHandler) errorHandler(error);
          else console.warn(error);
        }
      });
    };

    setDataSource = async dataSource => {
      this.setState({ dataSource });
      let data = null;
      if (dataSource) {
        data = await dataSource({
          ...this.props,
          ...this.extraProps
        });
      }
      this.setState({ data, isLoading: false });
    };

    render = () => {
      if (this.state.isLoading) {
        return <PacmanLoader />;
      }
      return (
        <Component
          data={this.state.data}
          dataSource={this.state.dataSource}
          setDataSource={this.setDataSource}
          {...this.extraProps}
          {...this.props}
        />
      );
    };
  };
};

PageWrapper.propTypes = {
  Component: PropTypes.element.isRequired
};

export default PageWrapper;
