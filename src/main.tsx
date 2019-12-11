import * as React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { Router, Switch, Route, Redirect} from 'react-router-dom';
import { ApplicationState } from "./redux-flow/store";
import { MainMenu } from './containers/Navigation/Navigation';
import { AppRoutes } from './constants/AppRoutes';
import styled, { ThemeProvider } from 'styled-components';
import { Theme } from '../src/styled/themes/dacast-theme';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

import {
    isMobile
} from "react-device-detect";

// Import Main styles for this application
import "./scss/style.scss";
import { Routes } from './containers/Navigation/NavigationTypes';
import { Header } from './components/Header/Header';
import { responsiveMenu } from './utils/hooksReponsiveNav';
import Toasts from './containers/Toasts';
import Login from '../src/containers/Register/Login/Login';
import { isLoggedIn } from './utils/token';
import { LoadingSpinner } from './components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import Dashboard from './containers/Dashboard/Dashboard';
import { NotFound } from './containers/404page';

// Any additional component props go here.
interface MainProps {
    store: Store<ApplicationState>;
}

const returnRouter = (props: Routes[]) => {
    return (
        props.map((route: Routes, i: number) => {
            return !route.slug ? <Route key={i}
                path={route.path}
                render={props => (
                    // pass the sub-routes down to keep nesting
                    <route.component {...props} routes={route.slug} />
                )}
            />
                : route.slug.map((subroute, index) => {
                    return <Route key={'subroute'+index}
                        path={subroute.path}
                        render={props => (
                            // pass the sub-routes down to keep nesting
                            <subroute.component {...props} />
                        )}
                    />
                })

        })
    )
}

const test = () => {
    return <LoadingSpinner color='black' size='large' />
}

const PrivateRoute = (props:{component: any, path: string}) => {
    const {currentNavWidth, isOpen, setOpen, menuLocked, setMenuLocked} = responsiveMenu();

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
    return (
        isLoggedIn() ?
            <Route 
              path={props.path}
            >
                <MainMenu menuLocked={menuLocked} onMouseEnter={ () => menuHoverOpen()} onMouseLeave={() => menuHoverClose()} navWidth={currentNavWidth} isMobile={isMobile} isOpen={isOpen} setMenuLocked={setMenuLocked} setOpen={setOpen} className="navigation" history={history} routes={AppRoutes}/>
                <FullContent isMobile={isMobile} navBarWidth={currentNavWidth} isOpen={isOpen}>
                    <Header isOpen={isOpen} setOpen={setOpen} isMobile={isMobile} />
                    <Content isOpen={isOpen}>
                        <props.component {...props} />
                    </Content>
                </FullContent>  
            </Route>
            : 
            <Redirect to='/' />

    )
}

// Create an intersection type of the component props and our Redux props.
const Main: React.FC<MainProps> = ({ store }: MainProps) => {



    return (
        <Provider store={store}>
            <ThemeProvider theme={Theme}>
                <Router  history={history}>
                    <>
                        <Toasts />                     
                        <Switch>
                            {returnRouter(AppRoutes)}
                            <PrivateRoute path='/dashboard' component={Dashboard} />
                            <Route exact path='/'><Login history={history} /></Route>
                            <Route path='/login'><Login history={history} /></Route>
                            <Route path='*' ><NotFound /></Route>
                        </Switch>
 
                    </>
                </Router>
            </ThemeProvider>

        </Provider>
    );
};

const Content = styled.div<{isOpen: boolean}>`
    position: relative;
    height: auto;
    min-height: 100vh;
    padding: 24px;
    padding-top: 81px;
    overflow: auto;
`

const FullContent = styled.div<{isOpen: boolean; navBarWidth: string; isMobile: boolean}>`
    margin-left: ${props => props.isMobile ? 0 : props.navBarWidth};
    background: rgb(245, 247, 250);
    position: relative;
    padding: 0;
    min-width: 240px;
    width: ${props => props.isMobile ? "100%" : "calc(100% - "+props.navBarWidth+")" };
`

// Normally you wouldn't need any generics here (since types infer from the passed functions).
// But since we pass some props from the `index.js` file, we have to include them.
// For an example of a `connect` function without generics, see `./containers/LayoutContainer`.
export default Main;
