import React from 'react';
import { Tab } from '../../../components/Tab/Tab';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { TabsContainer, TabsContainerWrapper } from '../../shared/TabsStyle';
import { AppRoutes } from '../../constants/AppRoutes';
import { userToken } from '../../utils/services/token/tokenService';
import { PreviewModal } from '../../shared/Common/PreviewModal';
import { useTranslation } from 'react-i18next';

export const PlaylistsTabs = (props: {playlistId: string}) => {
    const accountId = userToken.getUserInfoItem('parent-id') || userToken.getUserInfoItem('user-id')
    const [previewModalOpen, setPreviewModalOpen] = React.useState<boolean>(false)
    const { t } = useTranslation()
    
    const handlePlaylistSubRoutes = () => {
        return AppRoutes.filter((route) => route.path.indexOf('playlists') > -1 && route.name !== 'common_navigation_bar_menu_item_playlists' && (route.associatePrivilege ? route.associatePrivilege.some(p => userToken.getPrivilege(p)) : true ) ).map((route) => {
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

                <Button className="ml3" sizeButton="large" typeButton="primary" onClick={() => setPreviewModalOpen(true)}>{t('common_button_text_preview')}</Button>
            </TabsContainerWrapper>
            {
                previewModalOpen && <PreviewModal contentId={accountId + '-playlist-' + props.playlistId} toggle={setPreviewModalOpen} isOpened={previewModalOpen} contentType={'playlist'} />
            }
        </>
    )
}
