/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { BrowserRouter, Switch, Route, useHistory, useLocation} from 'react-router-dom';
import { AdminState } from "./redux-flow/store";
import { AdminRoutes } from './constants/AdminRoutes';
import styled, { ThemeProvider, css } from 'styled-components';
import { Theme } from '../styled/themes/dacast-theme';
// Import Main styles for this application
import "../scss/style.scss";
import { Routes } from './pages/Accounts/EditPlan';
// Any additional component props go here.
interface AdminMainProps {
    store: Store<AdminState>;
}

const returnRouter = (props: Routes[]) => {
    return (
        props.map((route: Routes, i: number) => {
            return !route.slug ? <Route key={i}
                path={route.path}
                exact={route.exactPath ? true : false}
                render={props => (
                    // pass the sub-routes down to keep nesting
                    <route.component {...props} routes={route.slug} />
                )}
            />
                : route.slug.map((subroute: Routes, index: number) => {
                    return <Route key={'subroute'+index}
                        path={subroute.path}
                        exact={route.exactPath ? true : false}
                        render={props => (
                            // pass the sub-routes down to keep nesting
                            <subroute.component {...props} />
                        )}
                    />
                })

        })
    )
}

// Create an intersection type of the component props and our Redux props.
const AdminMain: React.FC<AdminMainProps> = ({ store}: AdminMainProps) => {
    let location = useLocation()
    let history = useHistory()

    React.useEffect(() => {
        const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
        if (path) {
            history.replace(path);
        }
    }, [location])

    return (
        <Provider store={store}>
            <ThemeProvider theme={Theme}>
                <BrowserRouter>
                    <>  
                        <FullContent>
                            <Content>
                                <Switch>
                                    {returnRouter(AdminRoutes)}
                                </Switch>
                            </Content>
                        </FullContent>   
                    </>
                </BrowserRouter>
            </ThemeProvider>

        </Provider>
    );
};

const Content = styled.div`
    position: relative;
    height: auto;
    min-height: 100vh;
    padding: 24px;
    overflow: auto;
    padding-top: 81px;
`

const FullContent = styled.div`
    background: rgb(245, 247, 250);
    position: relative;
    padding: 0;
    min-width: 240px;
`

// Normally you wouldn't need any generics here (since types infer from the passed functions).
// But since we pass some props from the `index.js` file, we have to include them.
// For an example of a `connect` function without generics, see `./containers/LayoutContainer`.
export default AdminMain;