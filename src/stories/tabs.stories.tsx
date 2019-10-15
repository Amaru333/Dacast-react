import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import "../scss/style.scss";
import { Tab } from '../components/Tab/Tab';
import { LoadingSpinner} from '../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ProgressBar } from '../components/FormsComponents/Progress/ProgressBar/ProgressBar';
import { Routes } from '../containers/Navigation/NavigationTypes';
import { createBrowserHistory } from 'history';
import { Router, Switch, Route} from 'react-router-dom';

const history = createBrowserHistory();

const functionTest1 = () => {
    return (
        <LoadingSpinner size="small" color="dark-violet" />
    )
}

const functionTest2 = () => {
    return (
        <LoadingSpinner size="small" color="red" />
    )
}

const functionTest3 = () => {
    return (
        <LoadingSpinner size="small" color="yellow" />
    )
}

const functionTest4 = () => {
    return (
        <LoadingSpinner size="small" color="green" />
    )
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

const routeList:Array<Routes> = [
    {
        name:'Route1',
        path:'/route1',
        component: functionTest1
    },
    {
        name:'Route2',
        path:'/route2',
        component: functionTest2
    },
    {
        name:'Route3',
        path:'/route3',
        component: functionTest3
    },
    {
        name:'Route4',
        path:'/route4',
        component: functionTest4
    }
]

storiesOf('Tabs', module)
    .add('Tab', () => {
        return ( 
            <React.Fragment>
                <Router history={history}>
                    <StorybookTabContainerStyle>
                        <Tab 
                            list={routeList}
                            history={history}
                            orientation="horizontal"
                            
                        />                    
                    </StorybookTabContainerStyle>
                    <StorybookTabContainerStyle>
                        <Tab 
                            list={routeList} 
                            orientation="vertical"
                            history={history}
                        />
                    </StorybookTabContainerStyle>
                    <Switch>
                        {returnRouter(routeList)}
                    </Switch>
                </Router>
            </React.Fragment>

        )});

const StorybookTabContainerStyle = styled.div`
    float: left;
    margin: 150px 20px 20px 60px;
`;