/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { BrowserRouter, Switch, Route, useHistory, useLocation, Redirect} from 'react-router-dom';
import { AdminState } from "./redux-flow/store";
import { AdminRoutes } from './constants/AdminRoutes';
import { ThemeProvider } from 'styled-components';
import { Theme } from '../styled/themes/dacast-theme';
// Import Main styles for this application
import "../scss/style.scss";
import { Routes } from './utils/utils';
import { isLoggedIn } from './utils/token';
import Login from './containers/Register/Login';
import Accounts from './containers/Accounts/Accounts';
import Header from './shared/header/Header';
// Any additional component props go here.
interface AdminMainProps {
    store: Store<AdminState>;
}
const PrivateRoute = (props: {key: string; component: any; path: string}) => {

    
    return (
        isLoggedIn() ?
            <Route 
                path={props.path}
            >
                <div className='flex flex-column px2'>
                    <Header />
                    <props.component {...props} />
                </div> 

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
                :  <PrivateRoute key={i.toString()}
                    path={route.path}
                    // pass the sub-routes down to keep nesting
                    component={route.component}
                />
        })
    )
}

const AdminContent = () => {
    let location = useLocation()
    let history = useHistory()

    React.useEffect(() => {
        const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
        if (path) {
            history.replace(path);
        }
    }, [location])

    return (
            <div>
                <Switch>
                <Route exact path='/'>
                    {isLoggedIn() ?
                        <Accounts />
                        : <Login />
                    }
                </Route>  
                    {returnRouter(AdminRoutes)}
                </Switch>
            </div>
    )
}
 
// Create an intersection type of the component props and our Redux props.
const AdminMain: React.FC<AdminMainProps> = ({ store}: AdminMainProps) => {
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