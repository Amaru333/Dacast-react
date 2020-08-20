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
import { adminToken } from './utils/token';
import Login from './containers/Register/Login';
import Accounts from './containers/Accounts/Accounts';
import Header from './shared/header/Header';
import { ErrorPlaceholder } from '../components/Error/ErrorPlaceholder';
// Any additional component props go here.
interface AdminMainProps {
    store: Store<AdminState>;
}
const PrivateRoute = (props: {key: string; component: any; path: string; exact: boolean}) => {  
    return (
        adminToken.isLoggedIn() ?
            <Route 
                path={props.path}
                exact={props.exact}
            >
                <div className='flex flex-column px2' style={{backgroundColor: '#EBEFF5', minHeight: '100vh', height: 'auto'}}>
                    <Header />
                    <ErrorBoundary>
                        <props.component {...props} />
                    </ErrorBoundary>
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
                    exact={route.exactPath ? true : false}
                    // pass the sub-routes down to keep nesting
                    component={route.component}
                />
        })
    )
}

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
                {adminToken.isLoggedIn() ?
                    <PrivateRoute key='/' exact path='/' component={Accounts} />  
                    : 
                    <Route exact path='/'>                
                        <Login />
                    </Route>  
                }  
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