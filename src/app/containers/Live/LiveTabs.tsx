import React from 'react';
import { Tab } from '../../../components/Tab/Tab';
import { useHistory } from "react-router-dom";
import { Button } from '../../../components/FormsComponents/Button/Button';
import { IconStyle } from '../../../shared/Common/Icon';
import { TabsContainer } from '../../shared/TabsStyle';
import { AppRoutes } from '../../constants/AppRoutes';
import { userToken } from '../../utils/services/token/tokenService';

export const LiveTabs = (props: {liveId: string; }) => {
    let history = useHistory()

    const handleLiveSubRoutes = () => {
        return AppRoutes.filter((route) => route.path.indexOf('livestreams') > -1 &&  route.path.indexOf('analytics') === -1 &&  route.name !== 'Live Streams' && (route.associatePrivilege ? userToken.getPrivilege(route.associatePrivilege) : true ) ).map((route) => {
            return {
                ...route, path: '/livestreams/' + props.liveId + '/' + route.path.split('/')[route.path.split('/').length -1]
            }
        })
    }

    return (
        <div>
            <TabsContainer>
                <Tab orientation='horizontal' list={handleLiveSubRoutes()} />
            </TabsContainer>
        </div>
    )
}