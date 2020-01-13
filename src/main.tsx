import * as React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { Router, Switch, Route, Redirect} from 'react-router-dom';
import { ApplicationState } from "./redux-flow/store";
import { MainMenu } from './containers/Navigation/Navigation';
import { AppRoutes } from './constants/AppRoutes';
import styled, { ThemeProvider, css } from 'styled-components';
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
import Login from '../src/containers/Register/Login/Login';
import { isLoggedIn } from './utils/token';
import { NotFound } from './containers/404page';
import Toasts from './containers/Others/Toasts';

// Any additional component props go here.
interface MainProps {
    store: Store<ApplicationState>;
}

const returnRouter = (props: Routes[]) => {
    return (
        props.map((route: Routes, i: number) => {
            return !route.slug ? <PrivateRoute key={i.toString()}
                path={route.path}
                // pass the sub-routes down to keep nesting
                component={route.component}
            />
                : route.slug.map((subroute, index) => {
                    return <PrivateRoute key={'subroute'+index}
                        path={subroute.path}
                        component={subroute.component}                          
                    />
                })
        })
    )
}

const PrivateRoute = (props: {key: string; component: any; path: string}) => {
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
                <FullContent isLocked={menuLocked} isMobile={isMobile} navBarWidth={currentNavWidth} isOpen={isOpen}>
                    <Header isOpen={isOpen} setOpen={setOpen} isMobile={isMobile} />
                    <Content isMobile={isMobile} isOpen={isOpen}>
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
                                <Route exact path='/'><Login history={history} /></Route>
                                <Route path='/login'><Login history={history} /></Route>
                                {returnRouter(AppRoutes)}
                                <Route path='*' ><NotFound /></Route>
                            </Switch>
                    </>
                </Router>
            </ThemeProvider>

        </Provider>
    );
};

const Content = styled.div<{isOpen: boolean; isMobile: boolean}>`
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

const FullContent = styled.div<{isOpen: boolean; navBarWidth: string; isMobile: boolean; isLocked: boolean}>`
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
