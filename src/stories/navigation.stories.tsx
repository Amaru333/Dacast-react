import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { storiesOf } from '@storybook/react'
import { MainMenu} from '../containers/Navigation/Navigation';
import { AppRoutes } from '../constants/AppRoutes';


const returnRouter = (props:any) => {
    return (
        props.map((route: any, i: number) => {
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

storiesOf('Navigation', module)
    .add('Navigation', () => ( 
        <React.Fragment>
            <Router>
                <MainMenu routes={AppRoutes}/>
                <Switch>
                    {returnRouter(AppRoutes)}
                </Switch>
            </Router>

        </React.Fragment>
    ))