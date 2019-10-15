import * as React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { Router, Switch, Route} from 'react-router-dom';
import { TopAppBar } from "./components/TopAppBar";
import TodoList from "./containers/TodoList";
import { ApplicationState } from "./redux-flow/store";
import { MainMenu } from './containers/Navigation/Navigation';
import { AppRoutes } from './constants/AppRoutes';
import { ThemeProvider } from 'styled-components';
import { Theme } from '../src/styled/themes/dacast-theme';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();


// Import Main styles for this application
import "./scss/style.scss";
import { Routes } from './containers/Navigation/NavigationTypes';

// Any additional component props go here.
interface MainProps {
    store: Store<ApplicationState>;
}

const returnRouter = (props: Array<Routes>) => {
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
    return (
        <Provider store={store}>
            <ThemeProvider theme={Theme}>
                <Router history={history}>
                    <MainMenu history={history} routes={AppRoutes}/>
                    <Switch>
                        {returnRouter(AppRoutes)}
                    </Switch>
                </Router>
            </ThemeProvider>
        </Provider>
    );
};

// Normally you wouldn't need any generics here (since types infer from the passed functions).
// But since we pass some props from the `index.js` file, we have to include them.
// For an example of a `connect` function without generics, see `./containers/LayoutContainer`.
export default Main;
