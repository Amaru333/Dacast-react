import React from 'react';
import { Tab } from '../../../components/Tab/Tab';
import { useHistory } from "react-router-dom";
import { Button } from '../../../components/FormsComponents/Button/Button';
import { IconStyle } from '../../../shared/Common/Icon';
import { TabsContainer } from '../../shared/TabsStyle';
import { getPrivilege } from '../../../utils/utils';
import { AppRoutes } from '../../constants/AppRoutes';

export const PlaylistsTabs = (props: {playlistId: string}) => {
    let history = useHistory()

    const handlePlaylistSubRoutes = () => {
        return AppRoutes.filter((route) => route.path.indexOf('playlists') > -1 && route.name !== 'Playlists' && (route.associatePrivilege ? getPrivilege(route.associatePrivilege) : true ) ).map((route) => {
            return {
                ...route, path: '/playlists/' + props.playlistId + '/' + route.path.split('/')[route.path.split('/').length -1]
            }
        })
    }

    return (
        <div>
            <TabsContainer>
                <Tab orientation='horizontal' list={handlePlaylistSubRoutes()} />
            </TabsContainer>
        </div>
    )
}