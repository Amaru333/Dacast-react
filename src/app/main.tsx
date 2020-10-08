/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { BrowserRouter, Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom';
import { ApplicationState } from "./redux-flow/store";
import { MainMenu } from './containers/Navigation/Navigation';
import { AppRoutes } from './constants/AppRoutes';
import styled, { ThemeProvider, css } from 'styled-components';
import { Theme } from '../styled/themes/dacast-theme';
import { createBrowserHistory } from 'history';
import TagManager from 'react-gtm-module'
import { loadReCaptcha } from 'react-recaptcha-v3'

const history = createBrowserHistory();
import {
    isMobile
} from "react-device-detect";

// Import Main styles for this application
import "../scss/style.scss";
import { Routes } from './containers/Navigation/NavigationTypes';
import Header from '../components/Header/Header';
import { responsiveMenu } from './utils/custom-hooks/reponsiveNavHook';
import { userToken } from './utils/services/token/tokenService';
import Toasts from './containers/Others/Toasts';
import { updateTitleApp } from './utils/utils';
import ScrollToTop, { useMedia } from '../utils/utils'
import Dashboard from './containers/Dashboard/Dashboard';

import ReactDOM from 'react-dom';
import { Icon } from '@material-ui/core';
import Login from './containers/Register/Login/Login';
import { Privilege } from './constants/PrivilegesName';
import { NotFound } from './containers/404page';
import { AddStreamModal } from './containers/Navigation/AddStreamModal';
import { AddPlaylistModal } from './containers/Navigation/AddPlaylistModal'
import { ErrorPlaceholder } from '../components/Error/ErrorPlaceholder';
import { store } from '.';
import { getContentListAction } from './redux-flow/store/Content/List/actions';
import EventHooker from './utils/services/event/eventHooker';

// Any additional component props go here.
interface MainProps {
    store: Store<ApplicationState>;
}

const refreshSpan = 60000
const refreshEvery = 5000
let fastRefreshUntil = 0
let timeoutId: NodeJS.Timeout | null = null
const timeoutFunc = () => {
    store.dispatch(getContentListAction(null, 'vod') as any)
    if(new Date().getTime() < fastRefreshUntil) {
        timeoutId = setTimeout(timeoutFunc, refreshEvery)
    }
}

EventHooker.subscribe('EVENT_VOD_UPLOADED', () => {
    fastRefreshUntil = new Date().getTime() + refreshSpan
    if(timeoutId === null) { 
        timeoutId = setTimeout(timeoutFunc, refreshEvery)
    }
})

export const PrivateRoute = (props: { key: string; component: any; path: string; exact?: boolean; associatePrivilege?: Privilege }) => {
    let mobileWidth = useMedia('(max-width:780px');

    if (userToken.isLoggedIn()) {
        if (props.associatePrivilege && !userToken.getPrivilege(props.associatePrivilege)) {
            return <NotFound />
        }
        return (
            <Route
                path={props.path}
                exact={props.exact ? true : false}
            >
                <Content isMobile={isMobile || mobileWidth} >
                    <ErrorBoundary>
                        <props.component {...props} />
                    </ErrorBoundary>
                </Content>
                <div id="navigationConfirmationModal"></div>
            </Route>
        )
    } else {
        return <Redirect to='/' />;
    }
}

export const updateStateTitle = (pathname: string) => {
    var result = AppRoutes.filter(item => pathname.includes(item.path));
    if (/\d/.test(pathname)) { return; }
    if (result.length) {
        if (result[0].slug) {
            let match = result[0].slug.filter(subRoute => { return subRoute.path === pathname; });
            if (match[0]) {
                updateTitleApp(match[0].name);
            } else {
                updateTitleApp(result[0].name);
            }
        } else {
            updateTitleApp(result[0].name);
        }
    }
}

history.listen((location) => {
    updateStateTitle(location.pathname)
});

class ErrorBoundary extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            hasError: false,
            info: '',
            errorDetails: null
        };
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true, info: info.componentStack, errorDetails: error.message });
        // You can also log the error to an error reporting service
        //   logErrorToMyService(error, info);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <ErrorPlaceholder />
        }
        return this.props.children;
    }
}

// Create an intersection type of the component props and our Redux props.
const AppContent = (props: { routes: any }) => {
    let location = useLocation()
    let history = useHistory()


    ScrollToTop()

    React.useEffect(() => {
        const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
        if (path) {
            history.replace(path);
        }
    }, [location])

    let mobileWidth = useMedia('(max-width:780px');

    const { currentNavWidth, isOpen, setOpen, menuLocked, setMenuLocked } = responsiveMenu();
    const [addStreamModalOpen, setAddStreamModalOpen] = React.useState<boolean>(false)
    const [addPlaylistModalOpen, setAddPlaylistModalOpen] = React.useState<boolean>(false)

    React.useEffect(() => {
        updateStateTitle(location.pathname);
    }, [])
    const menuHoverOpen = () => {
        if (!isOpen && !menuLocked) {
            setOpen(true)
        }
    };
    const menuHoverClose = () => {
        if (isOpen && !menuLocked) {
            setOpen(false)
        }
    };

    React.useEffect(() => {
        if (isMobile && (addStreamModalOpen || addPlaylistModalOpen)) {
            setOpen(false);
        }
    }, [addStreamModalOpen, addPlaylistModalOpen]);

    return (
        <>
            <Toasts />
            { userToken.isLoggedIn() ?
                <>
                    <MainMenu openAddStream={() => { setAddStreamModalOpen(true); }} openPlaylist={() => { setAddPlaylistModalOpen(true) }} menuLocked={menuLocked} onMouseEnter={() => menuHoverOpen()} onMouseLeave={() => menuHoverClose()} navWidth={currentNavWidth} isMobile={isMobile} isOpen={isOpen} setMenuLocked={setMenuLocked} setOpen={setOpen} className="navigation" history={history} routes={AppRoutes} />
                    <AddStreamModal toggle={() => setAddStreamModalOpen(false)} opened={addStreamModalOpen === true} />
                    <AddPlaylistModal toggle={() => setAddPlaylistModalOpen(false)} opened={addPlaylistModalOpen === true} />

                    <FullContent isLocked={menuLocked} isMobile={isMobile} navBarWidth={currentNavWidth} isOpen={isOpen}>
                        <Header isOpen={isOpen} setOpen={setOpen} isMobile={isMobile || mobileWidth} />
                        <Switch>
                            <PrivateRoute key='/' component={Dashboard} exact path='/' />
                            {props.routes}
                        </Switch>
                    </FullContent>
                </>
                :
                <>
                    <Switch>
                        <Route exact key='/' path='/'>
                            <Login />
                        </Route>
                        {props.routes}
                    </Switch>
                </>
            }
        </>
    )
}
const Main: React.FC<MainProps> = ({ store }: MainProps) => {

    const NavigationConfirmationModal = (props: { callback: Function; message: string }) => {

        return (
            <React.Fragment>
                <div className="unsavedChangesContainer">
                    <div className="unsavedChangesTitle">
                        <Icon className="material-icons-outlined" fontSize="large" style={{ color: "red" }}>report_problem</Icon>
                        <span className="unsavedChangesText-Header">Unsaved Changes</span>
                    </div>
                    <div className="unsavedChangesBody">
                        <span className="unsavedChangesText-Body">Are you sure that you want to leave this page?</span>
                        <div className="mt2">
                            <span className="unsavedChangesText-Body-Bold">{props.message ? props.message : "Please note any unsaved changes will be lost."}</span>
                        </div>
                    </div>
                    <div className="unsavedChangesFooter mt3">
                        <button onClick={() => props.callback(false)} className="unsavedChangesStayButton">Stay</button>
                        <button onClick={() => props.callback(true)} className="unsavedChangesLeaveButton">Leave</button>
                    </div>
                </div>
                <div className="unsavedChangesOverlay"></div>
            </React.Fragment>
        )
    }

    React.useEffect(() => {
        loadReCaptcha('6LekUrsZAAAAAL3l5GxJ157Yw9qWDwEOyvo_gGCy', ()=>{});
    }, [])

    // if (userToken.isLoggedIn()) {
    //     let tagManagerArgs = {
    //         gtmId: 'GTM-PHZ3Z7F',
    //         dataLayer: {
    //             'accountId': userToken.getUserInfoItem('custom:dacast_user_id'),
    //             'companyName': userToken.getUserInfoItem('custom:website'),
    //             'plan': 'Unknown yet',
    //             'signedUp': 'Unknown yet',
    //             'userId': userToken.getUserInfoItem('custom:dacast_user_id'),
    //             'userFirstName': userToken.getUserInfoItem('custom:first_name'),
    //             'userLastName': userToken.getUserInfoItem('custom:last_name'),
    //             'userEmail': userToken.getUserInfoItem('email'),
    //         }
    //     }
    //     TagManager.initialize(tagManagerArgs);
    // } else {
    //     let tagManagerArgs = { gtmId: 'GTM-PHZ3Z7F' };
    //     TagManager.initialize(tagManagerArgs);
    // }

    const getUserConfirmation = (message: string, callback: (ok: boolean) => void) => {
        const holder = document.getElementById('navigationConfirmationModal')
        const confirmAndUnmount = (answer: boolean) => {
            ReactDOM.unmountComponentAtNode(holder)
            callback(answer)
        }
        ReactDOM.render((
            <NavigationConfirmationModal callback={confirmAndUnmount} message={message} />
        ), document.getElementById('navigationConfirmationModal'))
    }

    const returnRouter = (props: Routes[]) => {
        return (
            props.map((route: Routes, i: number) => {
                if(route.name === 'impersonate') {
                    return <Route key={route.path} path={route.path}><route.component /></Route>;
                }
                if (route.isPublic) {
                    if (userToken.isLoggedIn()) {
                        if(route.path !== '*') {
                            return (<Route key={route.path} path={route.path}>
                                <Redirect
                                    to={{
                                        pathname: "/",
                                        state: { from: route.path }
                                    }}
                                />
                            </Route>)
                        } else {
                            <Route key={route.path} path={route.path}><route.component /></Route>
                        }
                        
                    } else {
                        return <Route key={route.path} path={route.path}><route.component /></Route>;
                    }
                }
                if (!route.slug) {
                    return <PrivateRoute key={i.toString()}
                        path={route.path}
                        associatePrivilege={route.associatePrivilege}
                        // pass the sub-routes down to keep nesting
                        component={route.component}
                        exact={route.isExact ? true : false}
                    />
                } else {
                    return route.slug.map((subroute, index) => {
                        return <PrivateRoute key={'subroute' + index}
                            path={subroute.path}
                            associatePrivilege={subroute.associatePrivilege}
                            component={subroute.component}
                            exact={subroute.isExact ? true : false}
                        />
                    })
                }
            })
        )
    }

    const routes = returnRouter(AppRoutes);

    return (
        <Provider store={store}>
            <ThemeProvider theme={Theme}>
                <BrowserRouter getUserConfirmation={getUserConfirmation}>
                    <AppContent routes={routes} />
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
};

const Content = styled.div<{ isMobile: boolean }>`
    position: relative;
    height: auto;
    min-height: 100vh;
    padding: 24px;
    overflow: auto;
    ${props => props.isMobile && css`
        overflow-x: hidden;
        padding: 16px;
    `}
    padding-top: 81px;
`

const FullContent = styled.div<{ isOpen: boolean; navBarWidth: string; isMobile: boolean; isLocked: boolean }>`
    margin-left: ${props => props.isMobile ? 0 : props.isLocked ? '235px' : '64px'};
    background: rgb(245, 247, 250);
    position: relative;
    padding: 0;
    min-width: 240px;
    width: ${props => props.isMobile ? "100%" : props.isLocked ? "calc(100% - 235px)" : "calc(100% - 64px)"};
`

// Normally you wouldn't need any generics here (since types infer from the passed functions).
// But since we pass some props from the `index.js` file, we have to include them.
// For an example of a `connect` function without generics, see `./containers/LayoutContainer`.
export default Main;