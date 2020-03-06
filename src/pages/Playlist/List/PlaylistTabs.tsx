import React from 'react';
import { Tab } from '../../../components/Tab/Tab';
import {useRouteMatch, Switch, Route} from "react-router-dom";
import { Button } from '../../../components/FormsComponents/Button/Button';
import { IconStyle } from '../../../shared/Common/Icon';
import { TabsContainer } from '../../../shared/TabsStyle';
import { Routes } from '../../../containers/Navigation/NavigationTypes';
import { PlaylistItem } from '../../../redux-flow/store/Playlists/List/types';
import { PlaylistSubRoutes } from '../../../constants/PlaylistSubRoutes';

export const PlaylistsTabs = (props: {playlistId: string; playlist: PlaylistItem; history: any; setShowPlaylistTabs: Function}) => {
    const {path} = useRouteMatch();

    React.useEffect(() => {
        if(location.pathname === '/playlists') {
            props.history.push('/playlists/'+props.playlistId+'/general')
        }
    }, [])

    const handlePlaylistSubRoutes = () => {
        return PlaylistSubRoutes.map((route) => {
            return {
                ...route, path: path + '/' + props.playlistId + route.path
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
                <Button onClick={(event) => {event.preventDefault();props.history.push('/playlists');props.setShowPlaylistTabs(false);}} className='mx2' sizeButton='xs' typeButton='secondary'><IconStyle>keyboard_arrow_left</IconStyle></Button>
                <Tab orientation='horizontal' list={handlePlaylistSubRoutes()} history={props.history}/>
            </TabsContainer>
            <Switch>
                {returnRouter(handlePlaylistSubRoutes())}
            </Switch>
        </div>
    )
}