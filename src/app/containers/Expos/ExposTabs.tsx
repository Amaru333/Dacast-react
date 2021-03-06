import React from 'react';
import { Tab } from '../../../components/Tab/Tab';
import { TabsContainer } from '../../shared/TabsStyle';
import { AppRoutes } from '../../constants/AppRoutes';
import { userToken } from '../../utils/services/token/tokenService';

export const ExposTabs = (props: {exposId: string}) => {

    const handleExposSubRoutes = () => {
        return AppRoutes.filter((route) => route.path.indexOf('expo') > -1 && route.name !== 'Expos' && (route.associatePrivilege ? route.associatePrivilege.some(p => userToken.getPrivilege(p)) : true ) ).map((route) => {
            return {
                ...route, path: '/expos/' + props.exposId + '/' + route.path.split('/')[route.path.split('/').length -1]
            }
        })
    }

    return (
        <TabsContainer className="mb25">
            <Tab orientation='horizontal' list={handleExposSubRoutes()} />
        </TabsContainer>
    )
}