import React from 'react';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { LinkBoxLabel, LinkBox, LinkText, ClassThirdXsFullMd } from './GeneralStyle';
import { IconStyle } from '../../../shared/Common/Icon';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { Text } from '../../../components/Typography/Text'
import { updateClipboard } from '../../utils/utils';
import { ContentDetails } from '../../redux-flow/store/Content/General/types';
import { isProduction } from '../../utils/services/player/stage';
import { PreviewModal } from '../Common/PreviewModal';
import { userToken } from '../../utils/services/token/tokenService';
import { segmentService } from '../../utils/services/segment/segmentService';
import { ContentType } from '../../redux-flow/store/Common/types';
import { useTranslation } from 'react-i18next';

export const GeneralSharing = (props: {contentDetails: ContentDetails, contentType: ContentType}) => {

    const accountId = userToken.getUserInfoItem('parent-id') || userToken.getUserInfoItem('user-id')
    const expoBaseUrl = isProduction() ? 'https://dacastexpo.com' : 'https://singularity-expo.dacast.com'
    const [previewModalOpen, setPreviewModalOpen] = React.useState<boolean>(false)
    const { t } = useTranslation()
    const handleShareLinkClick = (sharingString: string) => {
        switch(props.contentType) {
            case 'expo':
                segmentService.track('Expo Created', {
                    action: 'Expo Shared',
                    'expo_id': props.contentDetails.id,
                    step: 3,
                })
                break
            case 'vod':
                segmentService.track('VOD Created', {
                    action: 'VOD Shared',
                    'vod_id': props.contentDetails.id,
                    step: 2,
                    option: sharingString
                })
                break
            case 'live':
                segmentService.track('Livestream Created', {
                    action: 'Livestream Shared',
                    'channel_id': props.contentDetails.id,
                    step: 3,
                    option: sharingString
                })
                break
            case 'playlist':
                segmentService.track('Playlist Created', {
                    action: 'Playlist Shared',
                    'playlist_id': props.contentDetails.id,
                    step: 3,
                    option: sharingString
                })
                break
            default:
                break
        }
    }

    return (
        <div className='col col-12'>
            <header className="flex justify-between">
                <Text className='col col-12' size={20} weight='med'>{t('common_content_general_sharing_title')}</Text>
                { props.contentType !== "expo" &&
                    <Button sizeButton="xs" typeButton="secondary" onClick={() => setPreviewModalOpen(true)}>{t('common_button_text_preview')}</Button>
                }
            </header>
            {
                props.contentType === 'expo' ?
                    <div className={"mt2 col lg-col-6 md-col-6 sm-col-12 col-12 xs-no-gutter pr2 flex flex-column"}>
                        <LinkBoxLabel>
                            <Text size={14} weight="med">{t('common_content_general_share_link_title')}</Text>
                        </LinkBoxLabel>
                        <LinkBox>
                            <LinkText size={14} weight="reg">{`${expoBaseUrl}?id=${props.contentDetails.id}`}</LinkText>
                            <IconStyle className='pointer' id="copyShareLinkExpoTooltip" onClick={() => {updateClipboard(`${expoBaseUrl}?id=${props.contentDetails.id}`, 'Share Link Copied');handleShareLinkClick('link')}}>file_copy</IconStyle>
                            <Tooltip target="copyShareExpoLinkTooltip">{t('common_tooltip_copy_to_clipboard_message')}</Tooltip>
                        </LinkBox>
                    </div>
            :
                <>
                    <Text className='pt2 col col-12' size={14}>{t('common_content_general_embed_code_info_text')}</Text>

                    <div className={ClassThirdXsFullMd + "mt2 pr2 flex flex-column"}>
                        <LinkBoxLabel>
                            <Text size={14} weight="med">{t('common_content_general_js_embed_code_title')}</Text>
                        </LinkBoxLabel>
                        <LinkBox>
                            <LinkText size={14} weight="reg">
                                {`<script id="${accountId}-${props.contentType}-${props.contentDetails.id}" width="${props.contentDetails.embedScaling === "responsive" ? "100%" : props.contentDetails.embedSize}" height="100%" src="https://player.dacast.com/js/player.js?contentId=${accountId}-${props.contentType}-${props.contentDetails.id}"  class="dacast-video"></script>`}
                            </LinkText>
                            <IconStyle className='pointer' id="copyJSEmbedTooltip" onClick={() => {updateClipboard(`<script id="${accountId}-${props.contentType}-${props.contentDetails.id}" width="${props.contentDetails.embedScaling === "responsive" ? "100%" : props.contentDetails.embedSize}" height="100%" src="https://player.dacast.com/js/player.js?contentId=${accountId}-${props.contentType}-${props.contentDetails.id}"  class="dacast-video"></script>`, 'JavaScript Embed Code Copied');handleShareLinkClick('js') } }>file_copy</IconStyle>
                            <Tooltip target="copyJSEmbedTooltip">{t('common_tooltip_copy_to_clipboard_message')}</Tooltip>
                        </LinkBox>
                    </div>
                    <div className={ClassThirdXsFullMd + "mt2 pr2 flex flex-column"}>
                        <LinkBoxLabel>
                            <Text size={14} weight="med">{t('common_content_general_iframe_embed_code_title')}</Text>
                        </LinkBoxLabel>
                        <LinkBox>
                            <LinkText size={14} weight="reg">
                            {`<iframe src="https://${process.env.BASE_IFRAME_URL}/${props.contentType}/${accountId}/${props.contentDetails.id}" width="${props.contentDetails.embedScaling === "responsive" ? "100%" : props.contentDetails.embedSize}" height="100%" frameborder="0" scrolling="no" allow="autoplay" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>`}
                            </LinkText>
                            <IconStyle className='pointer' id="copyIframeEmbedTooltip" onClick={() => {updateClipboard(`<iframe src="https://${process.env.BASE_IFRAME_URL}/${props.contentType}/${accountId}/${props.contentDetails.id}" width="${props.contentDetails.embedScaling === "responsive" ? "100%" : props.contentDetails.embedSize}" height="100%" frameborder="0" scrolling="no" allow="autoplay" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>`, 'Iframe Embed Code Copied');handleShareLinkClick('iframe')}}>file_copy</IconStyle>
                            <Tooltip target="copyIframeEmbedTooltip">{t('common_tooltip_copy_to_clipboard_message')}</Tooltip>
                        </LinkBox>
                    </div>
                    <div className={ClassThirdXsFullMd + "mt2 pr2 flex flex-column"}>
                        <LinkBoxLabel>
                            <Text size={14} weight="med">{t('common_content_general_share_link_title')}</Text>
                        </LinkBoxLabel>
                        <LinkBox>
                            <LinkText size={14} weight="reg">{`https://${process.env.BASE_IFRAME_URL}/${props.contentType}/${accountId}/${props.contentDetails.id}`}</LinkText>
                            <IconStyle className='pointer' id="copyShareLinkTooltip" onClick={() => {updateClipboard(`https://${process.env.BASE_IFRAME_URL}/${props.contentType}/${accountId}/${props.contentDetails.id}`, 'Share Link Copied');handleShareLinkClick('link')} }>file_copy</IconStyle>
                            <Tooltip target="copyShareLinkTooltip">{t('common_tooltip_copy_to_clipboard_message')}</Tooltip>
                        </LinkBox>
                    </div>
                    {
                        previewModalOpen && <PreviewModal contentId={accountId + '-' + props.contentType + '-' + props.contentDetails.id} toggle={setPreviewModalOpen} isOpened={previewModalOpen} contentType={props.contentType} />
                    }
                </>
            }
        </div>
    )
}
