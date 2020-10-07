import React from 'react';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { LinkBoxLabel, LinkBox, LinkText, ClassThirdXsFullMd } from './GeneralStyle';
import { IconStyle } from '../../../shared/Common/Icon';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { Text } from '../../../components/Typography/Text'
import { logAmplitudeEvent } from '../../utils/services/amplitude/amplitudeService';
import { updateClipboard } from '../../utils/utils';
import { ContentDetails } from '../../redux-flow/store/Content/General/types';

export const GeneralSharing = (props: {userId: string, contentDetails: ContentDetails, contentType: string, setPreviewModalOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
    return (
        <div className='col col-12'>
            <header className="flex justify-between">
                <Text className='col col-12' size={20} weight='med'>Sharing</Text>
                <Button sizeButton="xs" typeButton="secondary" onClick={() => props.setPreviewModalOpen(true)}>Preview</Button>
            </header>
            <Text className='pt2 col col-12' size={14}>The Embed Code can add content to your website and the Share Link can be shared on social media.</Text>

            <div className={ClassThirdXsFullMd + "mt2 pr2 flex flex-column"}>
                <LinkBoxLabel>
                    <Text size={14} weight="med">JavaScript Embed Code</Text>
                </LinkBoxLabel>
                <LinkBox>
                    <LinkText size={14} weight="reg">
                        {`<script id="${props.userId}-${props.contentType}-${props.contentDetails.id}" width="${props.contentDetails.embedScaling === "responsive" ? "100%" : props.contentDetails.embedSize}" height="100%" src="https://player.dacast.com/js/player.js?contentId=${props.userId}-${props.contentType}-${props.contentDetails.id}"  class="dacast-video"></script>`}
                    </LinkText>
                    <IconStyle className='pointer' id="copyJSEmbedTooltip" onClick={() => { logAmplitudeEvent('embed video js'); updateClipboard(`<script id="${props.userId}-${props.contentType}-${props.contentDetails.id}" width="${props.contentDetails.embedScaling === "responsive" ? "100%" : props.contentDetails.embedSize}" height="100%" src="https://player.dacast.com/js/player.js?contentId=${props.userId}-${props.contentType}-${props.contentDetails.id}"  class="dacast-video"></script>`, 'JavaScript Embed Code Copied') } }>file_copy_outlined</IconStyle>
                    <Tooltip target="copyJSEmbedTooltip">Copy to clipboard</Tooltip>
                </LinkBox>
            </div>
            <div className={ClassThirdXsFullMd + "mt2 pr2 flex flex-column"}>
                <LinkBoxLabel>
                    <Text size={14} weight="med">Iframe Embed Code</Text>
                </LinkBoxLabel>
                <LinkBox>
                    <LinkText size={14} weight="reg">
                    {`<iframe src="https://${process.env.BASE_IFRAME_URL}/${props.contentType}/${props.userId}/${props.contentDetails.id}" width="${props.contentDetails.embedScaling === "responsive" ? "100%" : props.contentDetails.embedSize}" height="100%" frameborder="0" scrolling="no" allow="autoplay" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>`}
                    </LinkText>
                    <IconStyle className='pointer' id="copyIframeEmbedTooltip" onClick={() => { logAmplitudeEvent('embed video iframe'); updateClipboard(`<iframe src="https://${process.env.BASE_IFRAME_URL}/${props.contentType}/${props.userId}/${props.contentDetails.id}" width="${props.contentDetails.embedScaling === "responsive" ? "100%" : props.contentDetails.embedSize}" height="100%" frameborder="0" scrolling="no" allow="autoplay" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>`, 'Iframe Embed Code Copied')}}>file_copy_outlined</IconStyle>
                    <Tooltip target="copyIframeEmbedTooltip">Copy to clipboard</Tooltip>
                </LinkBox>
            </div>
            <div className={ClassThirdXsFullMd + "mt2 pr2 flex flex-column"}>
                <LinkBoxLabel>
                    <Text size={14} weight="med">Share Link</Text>
                </LinkBoxLabel>
                <LinkBox>
                    <LinkText size={14} weight="reg">{`https://${process.env.BASE_IFRAME_URL}/${props.contentType}/${props.userId}/${props.contentDetails.id}`}</LinkText>
                    <IconStyle className='pointer' id="copyShareLinkTooltip" onClick={() => { logAmplitudeEvent('share video'); updateClipboard(`https://${process.env.BASE_IFRAME_URL}/${props.contentType}/${props.userId}/${props.contentDetails.id}`, 'Share Link Copied')} }>file_copy_outlined</IconStyle>
                    <Tooltip target="copyShareLinkTooltip">Copy to clipboard</Tooltip>
                </LinkBox>
            </div>
        </div>
    )
}