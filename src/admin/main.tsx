/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import {
  BrowserRouter,
  Switch,
  Route,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";
import { AdminState } from "./redux-flow/store";
import { AdminRoutes } from "./constants/AdminRoutes";
import { ThemeProvider } from "styled-components";
import { Theme } from "../styled/themes/dacast-theme";
// Import Main styles for this application
import "../scss/style.scss";
import { adminToken } from "./utils/services/token/tokenService";
import Login from "./containers/Register/Login";
import Accounts from "./containers/Accounts/Accounts";
import Header from "./shared/header/Header";
import { ErrorPlaceholder } from "../components/Error/ErrorPlaceholder";
import Toasts from "./containers/Others/Toasts";
import { MainMenu } from "./shared/Navigation/Navigation";
import { isMobile } from "react-device-detect";
import { responsiveMenu, useMedia } from "../utils/utils";
import { Content, FullContent } from "../shared/Content";
import { Routes } from "./shared/Navigation/NavigationTypes";
import { store } from ".";
import EventHooker from "../utils/services/event/eventHooker";
import WebRTC from "../app/containers/WebRTC/WebRTC";

// Any additional component props go here.
interface AdminMainProps {
  store: Store<AdminState>;
}

EventHooker.subscribe("EVENT_FORCE_LOGOUT", () => {
  store.dispatch({ type: "USER_LOGOUT" });
  adminToken.resetUserInfo();
  location.reload();
});

const PrivateRoute = (props: {
  key: string;
  component: any;
  path: string;
  exact: boolean;
}) => {
  const {
    currentNavWidth,
    isOpen,
    setOpen,
    menuLocked,
    setMenuLocked,
  } = responsiveMenu();
  let mobileWidth = useMedia("(max-width:780px");

  const menuHoverOpen = () => {
    if (!isOpen && !menuLocked) {
      setOpen(true);
    }
  };
  const menuHoverClose = () => {
    if (isOpen && !menuLocked) {
      setOpen(false);
    }
  };

  return adminToken.isLoggedIn() ? (
    <Route path={props.path} exact={props.exact}>
      <React.Fragment>
        <MainMenu
          menuLocked={menuLocked}
          onMouseEnter={() => menuHoverOpen()}
          onMouseLeave={() => menuHoverClose()}
          navWidth={currentNavWidth}
          isMobile={isMobile}
          isOpen={isOpen}
          setMenuLocked={setMenuLocked}
          setOpen={setOpen}
          className="navigation"
          history={history}
          routes={AdminRoutes}
        />
        <FullContent
          isOpen={isOpen}
          isLocked={menuLocked}
          isMobile={isMobile}
          navBarWidth={currentNavWidth}
        >
          <Header
            isOpen={isOpen}
            setOpen={setOpen}
            isMobile={isMobile || mobileWidth}
          />
          <Content isMobile={isMobile}>
            <ErrorBoundary>
              <props.component {...props} />
            </ErrorBoundary>
            <Toasts />
          </Content>
        </FullContent>
      </React.Fragment>
    </Route>
  ) : (
    <Redirect to="/" />
  );
};

const returnRouter = (props: Routes[]) => {
  return props.map((route: Routes, i: number) => {
    return route.isPublic ? (
      <Route key={route.path} path={route.path}>
        <route.component />
      </Route>
    ) : (
      <PrivateRoute
        key={i.toString()}
        path={route.path}
        exact={route.exactPath ? true : false}
        // pass the sub-routes down to keep nesting
        component={route.component}
      />
    );
  });
};

class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      info: "",
      errorDetails: null,
    };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({
      hasError: true,
      info: info.componentStack,
      errorDetails: error.message,
    });
    // You can also log the error to an error reporting service
    //   logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorPlaceholder />;
    }
    return this.props.children;
  }
}

const AdminContent = () => {
  let location = useLocation();
  let history = useHistory();

  React.useEffect(() => {
    const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
    if (path) {
      history.replace(path);
    }
  }, [location]);

  return (
    <div>
      <Switch>
        {adminToken.isLoggedIn() ? (
          <PrivateRoute key="/" exact path="/" component={Accounts} />
        ) : (
          <Route exact path="/">
            <Login />
          </Route>
        )}
        {returnRouter(AdminRoutes)}
      </Switch>
    </div>
  );
};

// Create an intersection type of the component props and our Redux props.
const AdminMain: React.FC<AdminMainProps> = ({ store }: AdminMainProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <BrowserRouter>
          <AdminContent />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

// Normally you wouldn't need any generics here (since types infer from the passed functions).
// But since we pass some props from the `index.js` file, we have to include them.
// For an example of a `connect` function without generics, see `./containers/LayoutContainer`.
export default AdminMain;
