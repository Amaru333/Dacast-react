import * as React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { Router, Switch, Route} from 'react-router-dom';
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

// Any additional component props go here.
interface MainProps {
    store: Store<ApplicationState>;
}

const returnRouter = (props: Routes[]) => {
    return (
        props.map((route: Routes, i: number) => {
            return <Route key={i}
                path={route.path}
                render={props => (
                    // pass the sub-routes down to keep nesting
                    <route.component {...props} routes={route.slug} />
                )}
            />
        })
    )
}

// Create an intersection type of the component props and our Redux props.
const Main: React.FC<MainProps> = ({ store }: MainProps) => {

    const {currentNavWidth, isOpen, setOpen} = responsiveMenu();

    return (
        <Provider store={store}>
            <ThemeProvider theme={Theme}>
                <Router  history={history}>
                    <>
                        <Toasts />
                        <MainMenu navWidth={currentNavWidth} isMobile={isMobile} isOpen={isOpen} setOpen={setOpen} className="navigation" history={history} routes={AppRoutes}/>
                        <FullContent isMobile={isMobile} navBarWidth={currentNavWidth} isOpen={isOpen}>
                            <Header isOpen={isOpen} setOpen={setOpen} isMobile={isMobile} />
                            <Content isOpen={isOpen}>
                                <Switch>
                                    {returnRouter(AppRoutes)}
                                </Switch>
                            </Content>
                        </FullContent>   
                    </>
                </Router>
            </ThemeProvider>

        </Provider>
    );
};

const Content = styled.div<{isOpen: boolean}>`
    position: relative;
    height: auto;
    padding: 24px;
    padding-top: 81px;
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
