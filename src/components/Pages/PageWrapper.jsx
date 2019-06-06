import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import {
  fetching,
  notifyToast,
  camelCase,
  parseQuery,
  middleWare,
  hasPrivilege,
  parseToken
} from "utils";
import { URLS } from "../../constants";
import { PageProvider } from "../Pages/PageContext";
import { Modal, Navbar } from "components/UI";
import { Logout } from "components/UI/Navbar/components";
import { PacmanLoader } from "components/UI/Loader";

const PageWrapper = Component => {
  return class extends React.Component {
    mounted = true;
    static propTypes = {
      boardId: PropTypes.string,
      token: PropTypes.string,
      onLogoutHandler: PropTypes.func
    };
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        page: {},
        modal: null,
        onModalClose: null
      };
      this.child = {};
      this.urlParams = this.props.match.params;
      this.extraProps = {
        compFetch: this.compFetch,
        setChild: c => (this.child = c)
      };
    }

    handleError = e => {
      if (e.status === 401) {
        this.props.onLogoutHandler();
        this.props.history.replace("/login");
      }
      notifyToast("error", e.message);
    };

    componentDidMount = async () => {
      await this.refreshData();
      if (this.mounted) this.setState({ isLoading: false });
    };

    componentWillUnmount = () => (this.mounted = false);

    refreshData = async (promise, showLoader = true) => {
      if (showLoader) this.setState({ isLoading: true });
      if (promise) await promise;
      if (this.child.dataSource) {
        const newPage = await this.child.dataSource(this.getPage()).catch(console.error);
        if (newPage) this.updatePage(newPage);
      }
      this.setState({ isLoading: false });
    };

    updatePage = (page, callback) => {
      page = { ...this.state.page, ...page };
      this.setState({ page }, callback);
    };

    showModal = (child, onModalClose) => {
      this.setState({ modal: child, onModalClose });
    };

    closeModal = () => {
      if (this.state.onModalClose) this.state.onModalClose();
      this.setState({ modal: null, onModalClose: null });
    };

    compFetch = async (type, action, queryParams, errorHandler) => {
      const { boardId, token } = this.props;
      let handle = error => {
        let handle = middleWare(error, this.handleError);
        if (this.child.handleError) handle = middleWare(error, this.child.handleError, handle);
        if (errorHandler) handle = middleWare(error, errorHandler, handle);
        handle();
      };
      const url = URLS(type, action, { ...(boardId && { boardId }) });
      return await fetching(url, queryParams, token)
        .then(async res => {
          let result = null;
          try {
            result = camelCase(await res.json());
          } catch (err) {
            result = { message: err.message };
          }
          if (res.status === 200) return result;
          else {
            const error = { url, status: res.status, ...result };
            handle(error);
          }
        })
        .catch(e => handle({ url, message: e.message }));
    };

    hasPrivilege = (priv, ownerId) => {
      if (ownerId && this.user && this.user.id === ownerId) return true;
      if (!isEmpty(this.state.page.data) && hasPrivilege(priv, this.state.page.data.userPrivilege))
        return true;
      return false;
    };

    navbarConfigs = page => {
      const { buttons = [], title, className } = this.child.navbar
        ? this.child.navbar(page)
        : { buttons: [], title: "Benefact" };

      if (!buttons)
        return {
          listConfig: [[], [{ id: "brand", className: "brand", title: title }], []],
          navbarClassName: className
        };
      return {
        listConfig: [
          buttons,
          [{ id: "brand", className: "brand center", title: title }],
          [
            {
              id: "home",
              tooltip: "Home",
              icon: "home",
              onClick: () => this.props.history.push("/home")
            },
            {
              id: "user",
              tooltip: "User",
              icon: "user-circle",
              onClick: () => this.props.history.push("/user")
            },
            {
              id: "logout",
              tooltip: "Logout",
              icon: "sign-out-alt",
              component: Logout,
              componentHeader: "Logout?",
              params: {
                onLogoutHandler: this.props.onLogoutHandler
              }
            }
          ]
        ],
        navbarClassName: className || ""
      };
    };

    getPage = () => {
      return {
        query: parseQuery(this.props.location.search),
        showModal: this.showModal,
        closeModal: this.closeModal,
        refreshData: this.refreshData,
        compFetch: this.compFetch,
        history: this.props.history,
        match: this.props.match,
        isLoading: this.state.isLoading,
        hasPrivilege: this.hasPrivilege,
        token: this.token,
        user: this.user,
        updatePage: this.updatePage,
        ...this.state.page
      };
    };

    render = () => {
      this.token = this.props.token;
      this.user = this.props.token && parseToken(this.props.token);
      if (!this.user) this.token = null;
      const page = this.getPage();
      return (
        <PageProvider value={page}>
          {this.state.isLoading && <PacmanLoader />}
          <Navbar configs={this.navbarConfigs({ ...this.props, page })} />
          <Component
            isLoading={this.state.isLoading}
            page={page}
            {...this.extraProps}
            {...this.props}
          />
          {this.state.modal ? (
            <Modal isOpen onClose={this.closeModal}>
              {this.state.modal}
            </Modal>
          ) : null}
        </PageProvider>
      );
    };
  };
};

PageWrapper.propTypes = {
  Component: PropTypes.element.isRequired
};

export default PageWrapper;
