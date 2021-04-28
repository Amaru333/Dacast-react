import React from 'react';
import { Tab } from '../../../components/Tab/Tab';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { TabsContainer, TabsContainerWrapper } from '../../shared/TabsStyle';
import { AppRoutes } from '../../constants/AppRoutes';
import { userToken } from '../../utils/services/token/tokenService';
import { PreviewModal } from '../../shared/Common/PreviewModal';

export const PlaylistsTabs = (props: {playlistId: string}) => {
    const accountId = userToken.getUserInfoItem('parent-id') || userToken.getUserInfoItem('user-id')
    const [previewModalOpen, setPreviewModalOpen] = React.useState<boolean>(false)

    const handlePlaylistSubRoutes = () => {
        return AppRoutes.filter((route) => route.path.indexOf('playlists') > -1 && route.name !== 'Playlists' && (route.associatePrivilege ? userToken.getPrivilege(route.associatePrivilege) : true ) ).map((route) => {
            return {
                ...route, path: '/playlists/' + props.playlistId + '/' + route.path.split('/')[route.path.split('/').length -1]
            }
        })
    }

    return (
        <>
            <TabsContainerWrapper>
                <TabsContainer>
                    <Tab orientation='horizontal' list={handlePlaylistSubRoutes()} />
                </TabsContainer>

                <Button className="ml3" sizeButton="large" typeButton="primary" onClick={() => setPreviewModalOpen(true)}>Preview</Button>
            </TabsContainerWrapper>
            {
                previewModalOpen && <PreviewModal contentId={accountId + '-playlist-' + props.playlistId} toggle={setPreviewModalOpen} isOpened={previewModalOpen} contentType={'playlist'} />
            }
        </>
    )
}
