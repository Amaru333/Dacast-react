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
import { axiosClient } from '../../utils/services/axios/axiosClient'
import { ContentDetails } from '../../redux-flow/store/Content/General/types';
import { userToken } from '../../utils/services/token/tokenService';

export const GeneralDetails = (props: {userId: string, contentDetails: ContentDetails, localContentDetails: ContentDetails, contentType: string, setHasChanged: React.Dispatch<React.SetStateAction<boolean>>, setLocalContentDetails: React.Dispatch<React.SetStateAction<ContentDetails>>, setEncoderModalOpen?: React.Dispatch<React.SetStateAction<boolean>> }) => {

    function saveFile(url: string, filename: string) {
        axiosClient.get(`/vods/${props.contentDetails.id}/download-url`
        ).then((response) => {
            var a = document.createElement("a")
            a.target = '_blank'
            a.href = response.data.data.url
            a.setAttribute("download", filename)
            a.click()
        })

        }

        const handleOnlineToggle = (contentType: string) => {
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
                <Text size={20} weight="med">Details</Text>
                { 
                    (userToken.getPrivilege('privilege-web-download') && props.contentType === 'vod') && 
                        <Button onClick={() => saveFile(null, props.localContentDetails.title)} sizeButton="xs" typeButton="secondary">Download</Button>
                }
                {
                    props.contentType === 'live' &&
                        <Button onClick={() => props.setEncoderModalOpen(true)} sizeButton="xs" typeButton="secondary" >Encoder Setup</Button>
                }
            </header>
            <Toggle
                className="col col-12 mb2"
                defaultChecked={props.localContentDetails.online}
                onChange={() => {props.setLocalContentDetails({ ...props.localContentDetails, online: !props.localContentDetails.online });props.setHasChanged(true)}}
                label={handleOnlineToggle(props.contentType) + " Online"}
            />
            <Input
                className={ClassHalfXsFullMd + "pr2 mb2"}
                label="Title"
                value={props.localContentDetails.title}
                onChange={event => {props.setLocalContentDetails({...props.localContentDetails, title: event.currentTarget.value });props.setHasChanged(true)}}
            />
            <InputTags
                className={ClassHalfXsFullMd + "mb2"}
                label="Folders"
                disabled
                greyBackground
                defaultTags={props.contentDetails.folders} 
            />

            <Input
                className={ClassHalfXsFullMd + "pr2 mb2"}
                type="textarea"
                label="Description"
                value={props.localContentDetails.description ? props.localContentDetails.description : ''}
                onChange={event => {props.setLocalContentDetails({ ...props.localContentDetails, description: event.currentTarget.value });props.setHasChanged(true)}}
            />
            <div className={"col col-3 flex flex-column"}>
                <LinkBoxLabel>
                    <Text size={14} weight="med">Content ID</Text>
                </LinkBoxLabel>
                <LinkBox>
                    <LinkText size={14} weight="reg">{props.userId + '-' + props.contentType + '-' + props.contentDetails.id}</LinkText>
                    <IconStyle className='pointer' id="copyContentIdTooltip" onClick={() => updateClipboard(props.userId + '-' + props.contentType + '-' + props.contentDetails.id, 'Content ID Copied')}>file_copy_outlined</IconStyle>
                    <Tooltip target="copyContentIdTooltip">Copy to clipboard</Tooltip>
                </LinkBox>
            </div>
        </div>
    )
}