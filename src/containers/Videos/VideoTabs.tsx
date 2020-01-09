import React from 'react';
import { Tab } from '../../components/Tab/Tab';
import { VideoSubRoutes } from '../../constants/VideoSubRoutes';
import {useRouteMatch, Switch, Route} from "react-router-dom";
import { Routes } from '../Navigation/NavigationTypes';

export const VideoTabs = (props: {history: any; videoId: string}) => {
    const {path} = useRouteMatch();

    const handleVideoSubRoutes = () => {
        return VideoSubRoutes.map((route) => {
            return {
                ...route, path: path + '/' + props.videoId + route.path
            }
        })
    }
    const returnRouter = (props: Routes[]) => {
        return (
            props.map((route: Routes, i: number) => {
                return !route.slug ? <Route key={i}
                    path={route.path}
                    render={props => (
                        // pass the sub-routes down to keep nesting
                        <route.component {...props} routes={route.slug} />
                    )}
                />
                    : route.slug.map((subroute, index) => {
                        return <Route key={'subroute'+index}
                            path={subroute.path}
                            render={props => (
                                // pass the sub-routes down to keep nesting
                                <subroute.component {...props} />
                            )}
                        />
                    })   
            })
        )
    }

    return (
        <div>
            <Tab orientation='horizontal' list={handleVideoSubRoutes()} history={props.history}/>
            <Switch>
                {returnRouter(handleVideoSubRoutes())}
            </Switch>
        </div>
    )
}