import React, { Dispatch, SetStateAction } from 'react';
import { Bubble } from '../../../components/Bubble/Bubble';
import { Modal, ModalContent, ModalFooter } from '../../../components/Modal/Modal';
import { IconStyle } from '../../../shared/Common/Icon';
import { getKnowledgebaseLink } from '../../constants/KnowledgbaseLinks';
import { ContentDetails } from '../../redux-flow/store/Content/General/types';
import { segmentService } from '../../utils/services/segment/segmentService';
import { updateClipboard } from '../../utils/utils';
import { BubbleContent } from '../Security/SecurityStyle';
import { LinkBoxContainer, ClassHalfXsFullMd, LinkBoxLabel, LinkBox, LinkText,  EncoderSettingsContainer } from './GeneralStyle';
import {Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { Tooltip } from '../../../components/Tooltip/Tooltip';


export const EncoderSettingsModal = (props: {toggle: Dispatch<SetStateAction<boolean>>; opened: boolean; generateEncoderKey: (liveId: string) => Promise<void>; contentDetails: ContentDetails; }) => {

    let encoderPreference = JSON.parse(localStorage.getItem('userEncoderPreference'))

    console.log('encoder preference', encoderPreference)

    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const [selectedEncoder, setSelectedEncoder] = React.useState(encoderPreference ? encoderPreference : {title: "Generic RTMP Encoder", data: {primaryPublishURL: "URL", backupPublishURL: "Backup URL", username: "Username", password: "Password", streamKey: "Stream Name or Key"}}) 

    const encoderList = [
        {title: "Generic RTMP Encoder", data: {primaryPublishURL: "URL", backupPublishURL: "Backup URL", username: "Username", password: "Password", streamKey: "Stream Name or Key"}},
        {title: "OBS Open Broadcaster Software", data: {primaryPublishURL: "Server", backupPublishURL: "Backup Server", username: "Username", password: "Password", streamKey: "Stream Key"}},
        {title: "Sling Studio", data: {primaryPublishURL: "Stream URL", streamKey: "Stream Name"}},
        {title: "Telestream Wirecast", data: {primaryPublishURL: "Address", backupPublishURL: "Backup Address", username: "Username", password: "Password", streamKey: "Stream"}},
        {title: "Teradeks", data: {primaryPublishURL: "Server URL", backupPublishURL: "Backup Server URL", username: "Username", password: "Password", streamKey: "Stream"}},
        {title: "Vid Blaster", data: {primaryPublishURL: "URL/IP: Port", backupPublishURL: "Backup URL", username: "Username", password: "Password", streamKey: "Stream"}},
        {title: "vMix", data: {primaryPublishURL: "URL", backupPublishURL: "Backup URL", username: "Username", password: "Password", streamKey: "Stream Name or Key"}}
    ]

    const handleGenerateKeyClick = () => {
        setButtonLoading(true)
        props.generateEncoderKey(props.contentDetails.id)
        .then(() => setButtonLoading(false))
        .catch(() => setButtonLoading(false))
    }

    const handleSelectedEncoder = (encoder: DropdownSingleListItem) => {
        setSelectedEncoder(encoder)
        localStorage.setItem('userEncoderPreference', JSON.stringify(encoder))
    }
    return (
        <Modal hasClose={false} size="large" modalTitle="Encoder Setup" opened={props.opened} toggle={() => props.toggle(!props.opened)} >
        <ModalContent>
            <div className="col col-12">
                <Bubble type='info' className='my2'>
                    <BubbleContent>
                        <Text weight="reg" size={16} >
                            Correct <a href={getKnowledgebaseLink("Encoder Setup")} target="_blank">Encoder Setup</a> is required — <a href='/help'>contact us</a> if you need help.
                            </Text>
                        </BubbleContent>
                    </Bubble>
                    <DropdownSingle
                        className="col col-6 mb2"
                        id="encoderList"
                        dropdownTitle="RTMP Encoders"
                        list={encoderList}
                        dropdownDefaultSelect={selectedEncoder.title}
                        callback={(item: DropdownSingleListItem) => {handleSelectedEncoder(item)}}
                    />
                    <EncoderSettingsContainer className="col col-12">
                    <div className="col col-12">
                        <LinkBoxContainer className={ClassHalfXsFullMd + " mb2"}>
                            <LinkBoxLabel>
                                <Text size={14} weight="med">{selectedEncoder.data.primaryPublishURL}</Text>
                                <IconStyle id="primaryPublishURLTooltip">info_outlined</IconStyle>
                                <Tooltip target="primaryPublishURLTooltip">This is your server address for live streaming.</Tooltip>
                            </LinkBoxLabel>
                            <LinkBox backgroundColour="white">
                                <LinkText size={14} weight="reg">{props.contentDetails.primaryPublishURL}</LinkText>
                                <IconStyle className='pointer' onClick={() => {updateClipboard(props.contentDetails.primaryPublishURL, "Copied to clipboard");segmentService.track('Livestream Created', {action: 'Setup Livestream', 'livestream_id': props.contentDetails.id, step: 2}) } }>file_copy</IconStyle>
                            </LinkBox>
                        </LinkBoxContainer>
                        {
                            selectedEncoder.data.backupPublishURL &&
                                <LinkBoxContainer className={ClassHalfXsFullMd + " mb2"}>
                                    <LinkBoxLabel>
                                        <Text size={14} weight="med">{selectedEncoder.data.backupPublishURL}</Text>
                                        <IconStyle id="backupPublishURLTooltip">info_outlined</IconStyle>
                                        <Tooltip target="backupPublishURLTooltip">This is your backup stream in case the Server/Stream URL/ Address does not work.</Tooltip>
                                    </LinkBoxLabel>
                                    <LinkBox backgroundColour="white">
                                        <LinkText size={14} weight="reg">{props.contentDetails.backupPublishURL}</LinkText>
                                        <IconStyle className='pointer' onClick={() => updateClipboard(props.contentDetails.backupPublishURL, "Copied to clipboard")}>file_copy</IconStyle>
                                    </LinkBox>
                                </LinkBoxContainer>
                        }
                    </div>
                    {
                        selectedEncoder.data.username &&
                            <LinkBoxContainer className={ClassHalfXsFullMd + " mb2"}>
                                <LinkBoxLabel>
                                    <Text size={14} weight="med">{selectedEncoder.data.username}</Text>
                                </LinkBoxLabel>
                                <LinkBox backgroundColour="white">
                                    <LinkText size={14} weight="reg">{props.contentDetails.username}</LinkText>
                                    <IconStyle className='pointer' onClick={() => updateClipboard(props.contentDetails.username, "Copied to clipboard")}>file_copy</IconStyle>
                                </LinkBox>
                            </LinkBoxContainer>
                    }
                    {
                        selectedEncoder.data.password &&
                            <LinkBoxContainer className={ClassHalfXsFullMd + " mb2"}>
                                <LinkBoxLabel>
                                    <Text size={14} weight="med">{selectedEncoder.data.password}</Text>
                                </LinkBoxLabel>
                                <LinkBox backgroundColour="white">
                                    <LinkText size={14} weight="reg">{props.contentDetails.password}</LinkText>
                                    <IconStyle className='pointer' onClick={() => updateClipboard(props.contentDetails.password, "Copied to clipboard")}>file_copy</IconStyle>
                                </LinkBox>
                            </LinkBoxContainer>
                    }
                    {props.contentDetails.streamKeys.map((streamKey, i) => {
                        return(
                        <LinkBoxContainer key={streamKey} className={ClassHalfXsFullMd + " mb2"}>
                        <LinkBoxLabel>
                            <Text size={14} weight="med">{selectedEncoder.data.streamKey + (i >= 1 ? ` ${i + 1}` : '')}</Text>
                            <IconStyle id="streamKeyTooltip">info_outlined</IconStyle>
                            <Tooltip target="streamKeyTooltip">This is the name/key for a rendition of your stream.</Tooltip>
                        </LinkBoxLabel>
                        <LinkBox backgroundColour="white">
                            <LinkText size={14} weight="reg">{streamKey}</LinkText>
                            <IconStyle className='pointer' onClick={() => updateClipboard(streamKey, "Copied to clipboard")}>file_copy</IconStyle>
                        </LinkBox>
                    </LinkBoxContainer>
                        )
                    })}
                    </EncoderSettingsContainer>
                    {/* <div>
                        <LinkBoxContainer className={ClassHalfXsFullMd + " mb2"}>
                            <LinkBoxLabel>
                                <Text size={14} weight="med">Encoder Key</Text>
                            </LinkBoxLabel>
                            <LinkBox>
                                <LinkText size={14} weight="reg">{props.contentDetails.encoderKey}</LinkText>
                                <IconStyle className='pointer' onClick={() => updateClipboard(props.contentDetails.encoderKey, "Copied to clipboard")}>file_copy</IconStyle>
                            </LinkBox>
                        </LinkBoxContainer>
                        <Button className='right mr2' onClick={handleGenerateKeyClick} isLoading={buttonLoading} sizeButton='small' buttonColor='blue' typeButton='primary'>
                            Generate
                        </Button>
                    </div> */}

                </div>
                
                <div className="flex col col-12 mt2">
                    <IconStyle style={{ marginRight: "10px" }}>info_outlined</IconStyle>
                    <Text size={14} weight="reg">Need help setting up an encoder? Visit the <a href={getKnowledgebaseLink('Encoder Setup')} target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
                </div>
            </ModalContent>
            <ModalFooter className="mt1" >
                <Button onClick={() => props.toggle(false)}>Close</Button>
            </ModalFooter>
        </Modal>
    )
}