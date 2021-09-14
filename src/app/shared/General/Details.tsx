import React from 'react';
import { Button } from '../../../components/FormsComponents/Button/Button'
import { Toggle } from '../../../components/Toggle/toggle'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { InputTags } from '../../../components/FormsComponents/Input/InputTags'
import { LinkBoxLabel, LinkBox, LinkText, ClassHalfXsFullMd } from './GeneralStyle'
import { IconStyle } from '../../../shared/Common/Icon';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { Text } from '../../../components/Typography/Text'
import { updateClipboard } from '../../utils/utils'
import { ContentDetails } from '../../redux-flow/store/Content/General/types';
import { userToken } from '../../utils/services/token/tokenService';
import { dacastSdk } from '../../utils/services/axios/axiosClient';
import { ContentType } from '../../redux-flow/store/Common/types';
import { useTranslation } from 'react-i18next';

export const GeneralDetails = (props: {contentDetails: ContentDetails, localContentDetails: ContentDetails, contentType: ContentType, setHasChanged: React.Dispatch<React.SetStateAction<boolean>>, setLocalContentDetails: React.Dispatch<React.SetStateAction<ContentDetails>>, setEncoderModalOpen?: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const accountId = userToken.getUserInfoItem('parent-id') || userToken.getUserInfoItem('user-id')
    const { t } = useTranslation()

    function saveFile(filename: string) {
        dacastSdk.getDownloadVodUrl(props.contentDetails.id)
        .then((response) => {
            var a = document.createElement("a")
            a.target = '_blank'
            a.href = response.url
            a.setAttribute("download", filename)
            a.click()
        })
    }

        const handleOnlineToggle = (contentType: ContentType) => {
            switch (contentType) {
                case "vod":
                    return "Video"
                case "live":
                    return "Live Stream"
                case "playlist":
                    return "Playlist"
                case "expo":
                    return "Expo"
            }
        }

    return (
        <div className="col col-12">
            <header className="flex justify-between mb2">
                <Text size={20} weight="med">{t('common_content_general_details_title')}</Text>
                { 
                    (userToken.getPrivilege('privilege-web-download') && props.contentType === 'vod') && 
                        <Button onClick={() => saveFile(props.localContentDetails.title)} sizeButton="xs" typeButton="secondary">Download</Button>
                }
                {
                    props.contentType === 'live' &&
                        <Button onClick={() => props.setEncoderModalOpen(true)} sizeButton="xs" typeButton="secondary" >{t('live_stream_general_encoder_modal_title')}</Button>
                }
            </header>
            <Toggle
                className="col col-12 mb2"
                defaultChecked={props.localContentDetails.online}
                onChange={() => {props.setLocalContentDetails({ ...props.localContentDetails, online: !props.localContentDetails.online });props.setHasChanged(true)}}
                label={handleOnlineToggle(props.contentType) + " Online"}
            />
            <div className="col col-12">
                <Input
                    className={ClassHalfXsFullMd + "pr2 mb2"}
                    label={t('common_content_list_table_header_title')}
                    value={props.localContentDetails.title}
                    isError={!props.localContentDetails.title || props.localContentDetails.title.length === 0}
                    help={(!props.localContentDetails.title || props.localContentDetails.title.length === 0) && "Required"}
                    onChange={event => {props.setLocalContentDetails({...props.localContentDetails, title: event.currentTarget.value });props.setHasChanged(true)}}
                />
                {   
                    props.contentType !== "expo" &&
                        <InputTags
                            className={ClassHalfXsFullMd + "mb2"}
                            label={t('common_navigation_bar_menu_item_folders')}
                            disabled
                            greyBackground
                            defaultTags={props.contentDetails.folders} 
                        />
                }
            </div>
            
            <Input
                className={ClassHalfXsFullMd + "pr2 mb2"}
                type="textarea"
                label={t('common_content_general_description_input_title')}
                value={props.localContentDetails.description ? props.localContentDetails.description : ''}
                onChange={event => {props.setLocalContentDetails({ ...props.localContentDetails, description: event.currentTarget.value });props.setHasChanged(true)}}
            />
            <div className={"col col-12 sm-col-6  flex flex-column"}>
                <LinkBoxLabel>
                    <Text size={14} weight="med">{t('common_content_general_content_id_input_title')}</Text>
                </LinkBoxLabel>
                <LinkBox>
                    <LinkText size={14} weight="reg">{accountId + '-' + props.contentType + '-' + props.contentDetails.id}</LinkText>
                    <IconStyle className='pointer' id="copyContentIdTooltip" onClick={() => updateClipboard(accountId + '-' + props.contentType + '-' + props.contentDetails.id, 'Content ID Copied')}>file_copy_outlined</IconStyle>
                    <Tooltip target="copyContentIdTooltip">{t('common_tooltip_copy_to_clipboard_message')}</Tooltip>
                </LinkBox>
            </div>
        </div>
    )
}