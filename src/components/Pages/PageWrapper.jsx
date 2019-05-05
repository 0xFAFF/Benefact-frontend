import React from "react";
import PropTypes from "prop-types";
import {
  fetching,
  notifyToast,
  camelCase,
  parseQuery,
  middleWare,
  hasPrivilege,
  parseToken
} from "../../utils";
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
        isLoading: true,
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
      await this.refreshData();
      this.setState({ isLoading: false });
    };

    refreshData = async () => {
      const data = this.child.dataSource
        ? await this.child
            .dataSource({
              ...this.props,
              ...this.extraProps
            })
            .catch(() => null)
        : null;
      this.setState({ data });
      return data;
    };

    compFetch = async (type, action, queryParams, errorHandler) => {
      const { boardId, token } = this.props;
      let handle = error => {
        let handle = middleWare(error, this.handleError);
        if (this.child.handleError) handle = middleWare(error, this.child.handleError, handle);
        if (errorHandler) handle = middleWare(error, errorHandler, handle);
        handle();
      };
      return await fetching(
        URLS(type, action, {
          ...(boardId && { boardId })
        }),
        queryParams,
        token
      )
        .then(async res => {
          let result = null;
          try {
            result = camelCase(await res.json());
          } catch (err) {
            result = { message: err.message };
          }
          if (res.status === 200) return result;
          else {
            const error = { status: res.status, ...result };
            handle(error);
          }
        })
        .catch(e => handle({ message: e.message }));
    };

    hasPrivilege = (priv, ownerId) => {
      if (ownerId && this.user && this.user.id === ownerId) return true;
      if (this.state.data && hasPrivilege(priv, this.state.data.userRole)) return true;
      return false;
    };

    render = () => {
      this.user = this.props.token && parseToken(this.props.token);
      const page = {
        compFetch: this.compFetch,
        history: this.props.history,
        refreshData: this.refreshData,
        data: this.state.data,
        isLoading: this.state.isLoading,
        hasPrivilege: this.hasPrivilege,
        token: this.props.token,
        user: this.user
      };
      return (
        <PageProvider value={page}>
          <Component
            isLoading={this.state.isLoading}
            page={page}
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
