import React from "react";
import PropTypes from "prop-types";
import { fetching, notifyToast, camelCase, parseQuery, middleWare } from "../../utils";
import { URLS } from "../../constants";
import { PageProvider } from "components/Pages/PageContext";

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
        data: null
      };
      this.handleError = e => notifyToast("error", e.message, "top-center");
      this.child = {};
      this.urlParams = this.props.match.params;
      this.extraProps = {
        query: parseQuery(this.props.location.search),
        compFetch: this.compFetch,
        setChild: c => (this.child = c)
      };
    }

    componentDidMount = async () => {
      this.setState({ isLoading: true });
      let data = null;
      if (this.child.dataSource) {
        data = await this.child
          .dataSource({
            ...this.props,
            ...this.extraProps
          })
          .catch(e => null);
      }
      this.setState({ data, isLoading: false });
    };

    compFetch = async (type, action, queryParams, errorHandler) => {
      const { boardId, token } = this.props;
      return await fetching(
        URLS(type, action, {
          ...(boardId && { boardId })
        }),
        queryParams,
        token
      ).then(async res => {
        let result = null;
        try {
          result = camelCase(await res.json());
        } catch (err) {
          result = { message: err.message };
        }
        if (res.status === 200) return result;
        else {
          const error = { status: res.status, ...result };
          let handle = middleWare(error, this.handleError);
          if (this.child.handleError) handle = middleWare(error, this.child.handleError, handle);
          if (errorHandler) handle = middleWare(error, this.child.handleError, handle);
          handle();
        }
      });
    };

    render = () => {
      return (
        <PageProvider value={{compFetch: this.compFetch, data: this.state.data, token: this.props.token}}>
          <Component
            data={this.state.data}
            dataSource={this.dataSource}
            isLoading={this.state.isLoading}
            {...this.extraProps}
            {...this.props}
          />
        </PageProvider>
      );
    };
  };
};

PageWrapper.propTypes = {
  Component: PropTypes.element.isRequired
};

export default PageWrapper;
