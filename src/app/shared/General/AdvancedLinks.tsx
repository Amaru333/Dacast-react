import React from 'react';
import { IconStyle } from '../../../shared/Common/Icon';
import { Text } from '../../../components/Typography/Text'
import { LinkBoxContainer, LinkBoxLabel, LinkBox, LinkText, ExpandableContainer } from "../../shared/General/GeneralStyle"
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { updateClipboard } from '../../utils/utils';
import { ContentDetails } from '../../redux-flow/store/Content/General/types';
import { userToken } from '../../utils/services/token/tokenService';
import { ContentType } from '../../redux-flow/store/Common/types';

export const GeneralAdvancedLinks = (props: {contentDetails: ContentDetails, contentType: ContentType}) => {

    const [advancedLinksExpanded, setAdvancedLinksExpanded] = React.useState<boolean>(false)

    let m3u8Privilege = props.contentType === 'live' ? userToken.getPrivilege('privilege-unsecure-m3u8') : userToken.getPrivilege('privilege-unsecure-m3u8-vod');
    const advancedLinksOptions = [
        { id: "thumbnail", label: "Thumbnail", enabled: true, link: props.contentDetails.thumbnail ? props.contentDetails.thumbnail.url : '' },
        { id: "splashscreen", label: "Splashscreen", enabled: true, link: props.contentDetails.splashscreen ? props.contentDetails.splashscreen.url : '' },
        { id: "poster", label: "Poster", enabled: true, link: props.contentDetails.poster ? props.contentDetails.poster.url : '' },
        { id: "m3u8", label: "M3U8", enabled: m3u8Privilege && props.contentDetails.unsecureM3u8Url, link: props.contentDetails.unsecureM3u8Url ? props.contentDetails.unsecureM3u8Url : "" }
    ]

    return (
        <div className="col col-12 advancedVideoLinks">
                        <div onClick={() => setAdvancedLinksExpanded(!advancedLinksExpanded)}>
                            <IconStyle className="col col-1 pointer">{advancedLinksExpanded ? "expand_less" : "expand_more"}</IconStyle>
                            <Text className="col col-11 pointer" size={20} weight="med">Advanced Video Links</Text>
                        </div>
                        <ExpandableContainer className="col col-12" isExpanded={advancedLinksExpanded}>
                            {advancedLinksOptions.filter(item => item.enabled).map((item) => {
                                {
                                    if (item.link && item.link !== '') {
                                        return (
                                            <LinkBoxContainer key={item.id} className="col col-6 mt2">
                                                <LinkBoxLabel>
                                                    <Text size={14} weight="med">{item.label}</Text>
                                                </LinkBoxLabel>
                                                <LinkBox>
                                                    <LinkText size={14}>
                                                        <Text size={14} weight="reg">{item.link}</Text>
                                                    </LinkText>
                                                    <IconStyle className='pointer' id={item.id} onClick={() => updateClipboard(item.link, `${item.label} Link Copied`)}>file_copy_outlined</IconStyle>
                                                    <Tooltip target={item.id}>Copy to clipboard</Tooltip>
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