/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { BrowserRouter, Switch, Route, Redirect, useLocation, useHistory} from 'react-router-dom';
import { ApplicationState } from "./redux-flow/store";
import { MainMenu } from './containers/Navigation/Navigation';
import { AppRoutes } from './constants/AppRoutes';
import styled, { ThemeProvider, css } from 'styled-components';
import { Theme } from '../styled/themes/dacast-theme';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
import {
    isMobile
} from "react-device-detect";

// Import Main styles for this application
import "../scss/style.scss";
import { Routes } from './containers/Navigation/NavigationTypes';
import Header from '../components/Header/Header';
import { responsiveMenu } from './utils/hooksReponsiveNav';
import { isLoggedIn } from './utils/token';
import Toasts from './containers/Others/Toasts';
import { updateTitleApp } from './utils/utils';
import { useMedia } from '../utils/utils'
import Dashboard from './containers/Dashboard/Dashboard';

import ReactDOM from 'react-dom';
import { Icon } from '@material-ui/core';
import Login from './containers/Register/Login/Login';


// Any additional component props go here.
interface MainProps {
    store: Store<ApplicationState>;
}



  
export const updateStateTitle = (pathname: string) => { 
    var result = AppRoutes.filter(item => pathname.includes(item.path) );
    if( /\d/.test(pathname) ) { return; }
    if(result.length) {
        if(result[0].slug) {
            let match =  result[0].slug.filter(subRoute => {return subRoute.path === pathname; } );
            if(match[0]){
                updateTitleApp(match[0].name);
            } else {
                updateTitleApp(result[0].name);
            }
        } else {
            updateTitleApp(result[0].name);
        }
    }
}

history.listen( (location) =>  {
    updateStateTitle(location.pathname)
});

// Create an intersection type of the component props and our Redux props.

const AppContent = () => { 
    let location = useLocation()
    let history = useHistory()

    React.useEffect(() => {
        const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
        if (path) {
            history.replace(path);
        }
    }, [location])

    let mobileWidth = useMedia('(max-width:780px');

    const {currentNavWidth, isOpen, setOpen, menuLocked, setMenuLocked} = responsiveMenu();

    React.useEffect(() => {
        updateStateTitle(location.pathname)
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

    const PrivateRoute = (props: {key: string; component: any; path: string, exact?: boolean}) => {

        return (
            isLoggedIn()  ?
                <Route 
                    path={props.path}
                    exact={props.exact ? true : false}
                >
                    <MainMenu menuLocked={menuLocked} onMouseEnter={ () => menuHoverOpen()} onMouseLeave={() => menuHoverClose()} navWidth={currentNavWidth} isMobile={isMobile} isOpen={isOpen} setMenuLocked={setMenuLocked} setOpen={setOpen} className="navigation" history={history} routes={AppRoutes}/>
                    <FullContent isLocked={menuLocked} isMobile={isMobile || mobileWidth} navBarWidth={currentNavWidth} isOpen={isOpen}>
                        <Header isOpen={isOpen} setOpen={setOpen} isMobile={isMobile || mobileWidth} />
                        <Content isMobile={isMobile || mobileWidth} isOpen={isOpen}>
                            <props.component {...props} />
                        </Content>
                        <div id="navigationConfirmationModal"></div>
                    </FullContent>  
                </Route>
                : 
                <Redirect to='/' />
    
        )
    }
    
    
    const returnRouter = (props: Routes[]) => {
        return (
            props.map((route: Routes, i: number) => {
                return route.isPublic ? 
                    <Route key={route.path} path={route.path}><route.component /></Route>
                    :  !route.slug ? <PrivateRoute key={i.toString()}
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

    return (
        <>                 
        <Toasts />
            <Switch>
                {isLoggedIn() ?
                <PrivateRoute key='/' component={Dashboard} exact path='/' />                

                :
                <Route exact path='/'>
                    <Login />
                </Route>
                }                           
                {returnRouter(AppRoutes)}
            </Switch>
    </>
    )
}
const Main: React.FC<MainProps> = ({ store}: MainProps) => {

    /** TO DO: Figure out a way to implement the styled components */
    const NavigationConfirmationModal = (props: {callback: Function; message: string}) => {

        //const [isOpen, setIsOpen] = React.useState<boolean>(true);

        // <Modal icon={{name: 'warning', color: 'red'}} hasClose={false} title='Unsaved Changes' opened={isOpen} toggle={() => setIsOpen(!isOpen)}>
        //     <Text size={14} weight='reg'>{props.message}</Text>
        //     <Text className='pt2' size={14} weight='med'>Please note any unsaved changes will be lost.</Text>
        //     <div className='mt2'>
        //         <Button onClick={() => props.callback(false)} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue' >Stay</Button>
        //         <Button onClick={() => props.callback(true)} typeButton='tertiary' sizeButton='large' buttonColor='blue' >Leave</Button>
        //     </div>
        // </Modal>
        return (
            <React.Fragment>
                <div className="unsavedChangesContainer">
                    <div className="unsavedChangesTitle">
                        <Icon className="material-icons-outlined" fontSize="large" style={{color:"red"}}>report_problem</Icon>
                        <span className="unsavedChangesText-Header">Unsaved Changes</span>
                    </div>
                    <div className="unsavedChangesBody">
                        <span className="unsavedChangesText-Body">Are you sure that you want to leave this page?</span>
                        <div className="mt2">
                            <span className="unsavedChangesText-Body-Bold">Please note any unsaved changes will be lost.</span>
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

    return (
        <Provider store={store}>
            <ThemeProvider theme={Theme}>
                <BrowserRouter getUserConfirmation={getUserConfirmation}>
                    <AppContent />
                </BrowserRouter>
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