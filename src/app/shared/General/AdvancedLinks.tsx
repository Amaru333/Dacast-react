import React from 'react';
import { IconStyle } from '../../../shared/Common/Icon';
import { Text } from '../../../components/Typography/Text'
import { LinkBoxContainer, LinkBoxLabel, LinkBox, LinkText, ExpandableContainer } from "../../shared/General/GeneralStyle"
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { updateClipboard } from '../../utils/utils';
import { ContentDetails } from '../../redux-flow/store/Content/General/types';
import { userToken } from '../../utils/services/token/tokenService';
import { ContentType } from '../../redux-flow/store/Common/types';
import { useTranslation } from 'react-i18next';

export const GeneralAdvancedLinks = (props: {contentDetails: ContentDetails, contentType: ContentType}) => {

    const [advancedLinksExpanded, setAdvancedLinksExpanded] = React.useState<boolean>(false)
    const { t } = useTranslation()

    let m3u8Privilege = props.contentType === 'live' ? userToken.getPrivilege('privilege-unsecure-m3u8') : userToken.getPrivilege('privilege-unsecure-m3u8-vod');
    const advancedLinksOptions = [
        { id: "thumbnail", label: "common_content_general_images_thumbnail_title", enabled: true, link: props.contentDetails.thumbnail ? props.contentDetails.thumbnail.url : '' },
        { id: "splashscreen", label: "common_content_general_images_splashscreen_title", enabled: true, link: props.contentDetails.splashscreen ? props.contentDetails.splashscreen.url : '' },
        { id: "poster", label: "common_content_general_images_poster_title", enabled: true, link: props.contentDetails.poster ? props.contentDetails.poster.url : '' },
        { id: "m3u8", label: "M3U8", enabled: m3u8Privilege && props.contentDetails.unsecureM3u8Url, link: props.contentDetails.unsecureM3u8Url ? props.contentDetails.unsecureM3u8Url : "" }
    ]

    return (
        <div className="col col-12 advancedVideoLinks">
            <div onClick={() => setAdvancedLinksExpanded(!advancedLinksExpanded)}>
                <IconStyle className="col col-1 pointer">{advancedLinksExpanded ? "expand_less" : "expand_more"}</IconStyle>
                <Text className="col col-11 pointer" size={20} weight="med">{t('common_content_general_advanced_links_title')}</Text>
            </div>
            <ExpandableContainer className="col col-12" isExpanded={advancedLinksExpanded}>
                {advancedLinksOptions.filter(item => item.enabled).map((item) => {
                    {
                        if (item.link && item.link !== '') {
                            if(item.id === 'm3u8') {
                                return (
                                    <div key={item.id} className='flex flex-column col col-6 mt2'>
                                        <LinkBoxContainer>
                                            <LinkBoxLabel>
                                                <Text size={14} weight="med">{t('item.label')}</Text>
                                            </LinkBoxLabel>
                                            <LinkBox>
                                                <LinkText size={14}>
                                                    <Text size={14} weight="reg">{item.link}</Text>
                                                </LinkText>
                                                <IconStyle className='pointer' id={item.id} onClick={() => updateClipboard(item.link, `${item.label} Link Copied`)}>file_copy_outlined</IconStyle>
                                                <Tooltip target={item.id}>{t('common_tooltip_copy_to_clipboard_message')}</Tooltip>
                                            </LinkBox>
                                        </LinkBoxContainer>
                                        <Text size={10} color='gray-3'>By using m3u8, your content will lose the security features that Dacast offers. In addition, your content will also lose the analytics and tracking features that Dacast provides.</Text>
                                    </div>
                                )
                            }

                            return (
                                <LinkBoxContainer key={item.id} className="col col-6 mt2">
                                    <LinkBoxLabel>
                                        <Text size={14} weight="med">{t('item.label')}</Text>
                                    </LinkBoxLabel>
                                    <LinkBox>
                                        <LinkText size={14}>
                                            <Text size={14} weight="reg">{item.link}</Text>
                                        </LinkText>
                                        <IconStyle className='pointer' id={item.id} onClick={() => updateClipboard(item.link, `${item.label} Link Copied`)}>file_copy_outlined</IconStyle>
                                        <Tooltip target={item.id}>{t('common_tooltip_copy_to_clipboard_message')}</Tooltip>
                                    </LinkBox>
                                </LinkBoxContainer>
                            )
                        }
                    }
                })}
            </ExpandableContainer>
        </div>
    )
}