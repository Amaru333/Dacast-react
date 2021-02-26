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

export const GeneralSharing = (props: {contentDetails: ContentDetails, contentType: string}) => {
    
    const userId = userToken.getUserInfoItem('user-id') 
    const expoBaseUrl = isProduction() ? 'https://dacastexpo.com' : 'https://singularity-expo.dacast.com'
    const [previewModalOpen, setPreviewModalOpen] = React.useState<boolean>(false)

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
                <Text className='col col-12' size={20} weight='med'>Sharing</Text>
                { props.contentType !== "expo" &&
                    <Button sizeButton="xs" typeButton="secondary" onClick={() => setPreviewModalOpen(true)}>Preview</Button>
                }
            </header>
            {
                props.contentType === 'expo' ?
                    <div className={ClassThirdXsFullMd + "mt2 pr2 flex flex-column"}>
                        <LinkBoxLabel>
                            <Text size={14} weight="med">Share Link</Text>
                        </LinkBoxLabel>
                        <LinkBox>
                            <LinkText size={14} weight="reg">{`${expoBaseUrl}?id=${props.contentDetails.id}`}</LinkText>
                            <IconStyle className='pointer' id="copyShareLinkExpoTooltip" onClick={() => {updateClipboard(`${expoBaseUrl}?id=${props.contentDetails.id}`, 'Share Link Copied');handleShareLinkClick('link')}}>file_copy_outlined</IconStyle>
                            <Tooltip target="copyShareExpoLinkTooltip">Copy to clipboard</Tooltip>
                        </LinkBox>
                    </div>
            :
                <>
                    <Text className='pt2 col col-12' size={14}>The Embed Code can add content to your website and the Share Link can be shared on social media.</Text>

                    <div className={ClassThirdXsFullMd + "mt2 pr2 flex flex-column"}>
                        <LinkBoxLabel>
                            <Text size={14} weight="med">JavaScript Embed Code</Text>
                        </LinkBoxLabel>
                        <LinkBox>
                            <LinkText size={14} weight="reg">
                                {`<script id="${userId}-${props.contentType}-${props.contentDetails.id}" width="${props.contentDetails.embedScaling === "responsive" ? "100%" : props.contentDetails.embedSize}" height="100%" src="https://player.dacast.com/js/player.js?contentId=${userId}-${props.contentType}-${props.contentDetails.id}"  class="dacast-video"></script>`}
                            </LinkText>
                            <IconStyle className='pointer' id="copyJSEmbedTooltip" onClick={() => {updateClipboard(`<script id="${userId}-${props.contentType}-${props.contentDetails.id}" width="${props.contentDetails.embedScaling === "responsive" ? "100%" : props.contentDetails.embedSize}" height="100%" src="https://player.dacast.com/js/player.js?contentId=${userId}-${props.contentType}-${props.contentDetails.id}"  class="dacast-video"></script>`, 'JavaScript Embed Code Copied');handleShareLinkClick('js') } }>file_copy_outlined</IconStyle>
                            <Tooltip target="copyJSEmbedTooltip">Copy to clipboard</Tooltip>
                        </LinkBox>
                    </div>
                    <div className={ClassThirdXsFullMd + "mt2 pr2 flex flex-column"}>
                        <LinkBoxLabel>
                            <Text size={14} weight="med">Iframe Embed Code</Text>
                        </LinkBoxLabel>
                        <LinkBox>
                            <LinkText size={14} weight="reg">
                            {`<iframe src="https://${process.env.BASE_IFRAME_URL}/${props.contentType}/${userId}/${props.contentDetails.id}" width="${props.contentDetails.embedScaling === "responsive" ? "100%" : props.contentDetails.embedSize}" height="100%" frameborder="0" scrolling="no" allow="autoplay" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>`}
                            </LinkText>
                            <IconStyle className='pointer' id="copyIframeEmbedTooltip" onClick={() => {updateClipboard(`<iframe src="https://${process.env.BASE_IFRAME_URL}/${props.contentType}/${userId}/${props.contentDetails.id}" width="${props.contentDetails.embedScaling === "responsive" ? "100%" : props.contentDetails.embedSize}" height="100%" frameborder="0" scrolling="no" allow="autoplay" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>`, 'Iframe Embed Code Copied');handleShareLinkClick('iframe')}}>file_copy_outlined</IconStyle>
                            <Tooltip target="copyIframeEmbedTooltip">Copy to clipboard</Tooltip>
                        </LinkBox>
                    </div>
                    <div className={ClassThirdXsFullMd + "mt2 pr2 flex flex-column"}>
                        <LinkBoxLabel>
                            <Text size={14} weight="med">Share Link</Text>
                        </LinkBoxLabel>
                        <LinkBox>
                            <LinkText size={14} weight="reg">{`https://${process.env.BASE_IFRAME_URL}/${props.contentType}/${userId}/${props.contentDetails.id}`}</LinkText>
                            <IconStyle className='pointer' id="copyShareLinkTooltip" onClick={() => {updateClipboard(`https://${process.env.BASE_IFRAME_URL}/${props.contentType}/${userId}/${props.contentDetails.id}`, 'Share Link Copied');handleShareLinkClick('link')} }>file_copy_outlined</IconStyle>
                            <Tooltip target="copyShareLinkTooltip">Copy to clipboard</Tooltip>
                        </LinkBox>
                    </div>
                    {
                        previewModalOpen && <PreviewModal contentId={userId + '-' + props.contentType + '-' + props.contentDetails.id} toggle={setPreviewModalOpen} isOpened={previewModalOpen} />
                    }
                </>
            }
        </div>
    )
}