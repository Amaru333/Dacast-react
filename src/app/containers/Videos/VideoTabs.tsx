import React from 'react';
import { Tab } from '../../../components/Tab/Tab';
import { useHistory } from "react-router-dom";
import { Button } from '../../../components/FormsComponents/Button/Button';
import { IconStyle } from '../../../shared/Common/Icon';
import { TabsContainer } from '../../shared/TabsStyle';
import { AppRoutes } from '../../constants/AppRoutes';

export const VideoTabs = (props: {videoId: string}) => {
    let history = useHistory()

    const handleVideoSubRoutes = () => {
        return AppRoutes.filter((route) => route.path.indexOf('videos') > -1 && route.name !== 'Videos').map((route) => {
            return {
                ...route, path: '/videos/' + props.videoId + '/' + route.path.split('/')[route.path.split('/').length -1]
            }
        })
    }

    return (
        <div>
            <TabsContainer>
                <Button onClick={() => {history.push('/videos')}} className='mx2' sizeButton='xs' typeButton='secondary' ><IconStyle>keyboard_arrow_left</IconStyle></Button>
                <Tab orientation='horizontal' list={handleVideoSubRoutes()} />
            </TabsContainer>
        </div>
    )
}