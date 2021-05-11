import React from 'react';
import { Tab } from '../../../components/Tab/Tab';
import { useHistory } from "react-router-dom";
import { TabsContainer } from '../../shared/TabsStyle';
import { AppRoutes } from '../../constants/AppRoutes';
import { userToken } from '../../utils/services/token/tokenService';

export const VideoTabs = (props: {videoId: string}) => {
    let history = useHistory()

    const handleVideoSubRoutes = () => {
        return AppRoutes.filter((route) => route.path.indexOf('videos') > -1 && route.name !== 'Videos' && (route.associatePrivilege ? route.associatePrivilege.some(p => userToken.getPrivilege(p)) : true ) ).map((route) => {
            return {
                ...route, path: '/videos/' + props.videoId + '/' + route.path.split('/')[route.path.split('/').length -1]
            }
        })
    }

    return (
        <div>
            <TabsContainer>
                <Tab orientation='horizontal' list={handleVideoSubRoutes()} />
            </TabsContainer>
        </div>
    )
}