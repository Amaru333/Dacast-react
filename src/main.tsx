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


// Import Main styles for this application
import "./scss/style.scss";
import { Routes } from './containers/Navigation/NavigationTypes';

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

    const [isOpen, setOpen] = React.useState<boolean>(true);

    React.useEffect(() => {}, [isOpen]);

    return (
        <Provider store={store}>
            <ThemeProvider theme={Theme}>
                <Router  history={history}>
                    <>
                        <MainMenu isOpen={isOpen} setOpen={setOpen} className="navigation" history={history} routes={AppRoutes}/>
                        <Content isOpen={isOpen}>
                            <Switch >
                                {returnRouter(AppRoutes)}
                            </Switch>
                        </Content>
                    </>
                </Router>
            </ThemeProvider>

        </Provider>
    );
};

const Content = styled.div<{isOpen: boolean}>`
    margin-left: ${props => props.isOpen? "235px" : "64px"};
    background: rgb(245, 247, 250);
    position: relative;
    min-height: 940px;
    padding: 24px;
`

// Normally you wouldn't need any generics here (since types infer from the passed functions).
// But since we pass some props from the `index.js` file, we have to include them.
// For an example of a `connect` function without generics, see `./containers/LayoutContainer`.
export default Main;
