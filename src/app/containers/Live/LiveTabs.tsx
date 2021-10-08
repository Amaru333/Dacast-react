import React from 'react';
import { Tab } from '../../../components/Tab/Tab';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { TabsContainer, TabsContainerWrapper } from '../../shared/TabsStyle';
import { AppRoutes } from '../../constants/AppRoutes';
import { userToken } from '../../utils/services/token/tokenService';
import { PreviewModal } from '../../shared/Common/PreviewModal';
import { useTranslation } from 'react-i18next';

export const LiveTabs = (props: {liveId: string; }) => {
    const accountId = userToken.getUserInfoItem('parent-id') || userToken.getUserInfoItem('user-id')
    const [previewModalOpen, setPreviewModalOpen] = React.useState<boolean>(false)
    const { t } = useTranslation()

    const handleLiveSubRoutes = () => {
        return AppRoutes.filter((route) => route.path.indexOf('livestreams') > -1 &&  route.name !== 'common_navigation_bar_menu_item_live_streams' && (route.associatePrivilege ? route.associatePrivilege.some(p => userToken.getPrivilege(p)) : true ) ).map((route) => {
            return {
                ...route, path: '/livestreams/' + props.liveId + '/' + route.path.split('/')[route.path.split('/').length -1]
            }
        })
    }

    return (
        <>
            <TabsContainerWrapper>
                <TabsContainer>
                    <Tab orientation='horizontal' list={handleLiveSubRoutes()} />
                </TabsContainer>

                <Button className="ml3" sizeButton="large" typeButton="primary" onClick={() => setPreviewModalOpen(true)}>{t('common_button_text_preview')}</Button>
            </TabsContainerWrapper>
            {
                previewModalOpen && <PreviewModal contentId={accountId + '-live-' + props.liveId} toggle={setPreviewModalOpen} isOpened={previewModalOpen} contentType={'live'} />
            }
        </>
    )
}
