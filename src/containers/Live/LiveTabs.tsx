import React from 'react';
import { Tab } from '../../components/Tab/Tab';
import {useRouteMatch, Switch, Route} from "react-router-dom";
import { Routes } from '../Navigation/NavigationTypes';
import { Button } from '../../components/FormsComponents/Button/Button';
import { Icon } from '@material-ui/core';
import { LiveSubRoutes } from '../../constants/LiveSubRoutes';
import { TabsContainer } from '../../shared/TabsStyle';

export const LiveTabs = (props: {history: any; liveId: string; setShowLiveTabs: Function}) => {
    const {path} = useRouteMatch();

    React.useEffect(() => {
        props.history.push('/livestreams/'+props.liveId+'/general')
    }, [])

    const handleLiveSubRoutes = () => {
        return LiveSubRoutes.map((route) => {
            return {
                ...route, path: path + '/' + props.liveId + route.path
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
            <TabsContainer>
                <Button onClick={(event) => {event.preventDefault();props.history.push('/videos');props.setShowLiveTabs(false);}} className='mx2' sizeButton='xs' typeButton='secondary'><Icon>keyboard_arrow_left</Icon></Button>
                <Tab orientation='horizontal' list={handleLiveSubRoutes()} history={props.history}/>
            </TabsContainer>
            <Switch>
                {returnRouter(handleLiveSubRoutes())}
            </Switch>
        </div>
    )
}