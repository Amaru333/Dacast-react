import React from 'react';
import { Tab } from '../../../components/Tab/Tab';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { TabsContainer, TabsContainerWrapper } from '../../shared/TabsStyle';
import { AppRoutes } from '../../constants/AppRoutes';
import { userToken } from '../../utils/services/token/tokenService';
import { PreviewModal } from '../../shared/Common/PreviewModal';

export const VideoTabs = (props: {videoId: string}) => {
    const accountId = userToken.getUserInfoItem('parent-id') || userToken.getUserInfoItem('user-id')
    const [previewModalOpen, setPreviewModalOpen] = React.useState<boolean>(false)

    const handleVideoSubRoutes = () => {
        return AppRoutes.filter((route) => route.path.indexOf('videos') > -1 && route.name !== 'Videos' && (route.associatePrivilege ? route.associatePrivilege.some(p => userToken.getPrivilege(p)) : true ) ).map((route) => {
            return {
                ...route, path: '/videos/' + props.videoId + '/' + route.path.split('/')[route.path.split('/').length -1]
            }
        })
    }

    return (
        <>
            <TabsContainerWrapper>
                <TabsContainer>
                    <Tab orientation='horizontal' list={handleVideoSubRoutes()} />
                </TabsContainer>

                <Button className="ml3" sizeButton="large" typeButton="primary" onClick={() => setPreviewModalOpen(true)}>Preview</Button>
            </TabsContainerWrapper>
            {
                previewModalOpen && <PreviewModal contentId={accountId + '-vod-' + props.videoId} toggle={setPreviewModalOpen} isOpened={previewModalOpen} contentType={'vod'} />
            }
        </>
    )
}
