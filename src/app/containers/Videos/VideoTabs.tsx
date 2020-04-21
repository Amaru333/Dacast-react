import React from 'react';
import { Tab } from '../../../components/Tab/Tab';
import { VideoSubRoutes } from '../../constants/VideoSubRoutes';
import {useRouteMatch, Switch, Route, useHistory} from "react-router-dom";
import { Routes } from '../Navigation/NavigationTypes';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { IconStyle } from '../../../shared/Common/Icon';
import { TabsContainer } from '../../shared/TabsStyle';
import { VodItem } from '../../redux-flow/store/VOD/General/types';

export const VideoTabs = (props: {video: VodItem; videoId: string; setShowVideoTabs: Function}) => {
    const {url} = useRouteMatch();
    let history = useHistory()

    React.useEffect(() => {
        if(location.pathname === '/videos') {
            history.push('/videos/'+props.videoId+'/general')
        }
    }, [])

    const handleVideoSubRoutes = () => {
        return VideoSubRoutes.map((route) => {
            return {
                ...route, path: url + '/' + props.videoId + route.path
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
                <Button onClick={(event) => {event.preventDefault();history.push('/videos');props.setShowVideoTabs(false);}} className='mx2' sizeButton='xs' typeButton='secondary' ><IconStyle>keyboard_arrow_left</IconStyle></Button>
                <Tab orientation='horizontal' list={handleVideoSubRoutes()} />
            </TabsContainer>
            <Switch>
                {returnRouter(handleVideoSubRoutes())}
            </Switch>
        </div>
    )
}