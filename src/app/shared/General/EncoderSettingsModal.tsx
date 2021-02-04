import React, { Dispatch, SetStateAction } from 'react';
import { Bubble } from '../../../components/Bubble/Bubble';
import { Modal, ModalContent, ModalFooter } from '../../../components/Modal/Modal';
import { IconStyle } from '../../../shared/Common/Icon';
import { getKnowledgebaseLink } from '../../constants/KnowledgbaseLinks';
import { ContentDetails } from '../../redux-flow/store/Content/General/types';
import { segmentService } from '../../utils/services/segment/segmentService';
import { updateClipboard } from '../../utils/utils';
import { BubbleContent } from '../Security/SecurityStyle';
import { LinkBoxContainer, ClassHalfXsFullMd, LinkBoxLabel, LinkBox, LinkText } from './GeneralStyle';
import {Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';


export const EncoderSettingsModal = (props: {toggle: Dispatch<SetStateAction<boolean>>; opened: boolean; generateEncoderKey: (liveId: string) => Promise<void>; contentDetails: ContentDetails; }) => {

    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const [selectedEncoder, setSelectedEncoder] = React.useState({title: "Generic RTMP Encoder", data: {primaryPublishURL: "URL", backupPublishURL: "Backup URL", username: "Username", password: "Password", streamKey: "Stream Name or Key"}}) 

    const encoderList = [
        {title: "Generic RTMP Encoder", data: {primaryPublishURL: "URL", backupPublishURL: "Backup URL", username: "Username", password: "Password", streamKey: "Stream Name or Key"}},
        {title: "OBS Open Broadcaster Software", data: {primaryPublishURL: "Server", backupPublishURL: "Backup Server", username: "Username", password: "Password", streamKey: "Stream Key"}}
    ]

    const handleGenerateKeyClick = () => {
        setButtonLoading(true)
        props.generateEncoderKey(props.contentDetails.id)
        .then(() => setButtonLoading(false))
        .catch(() => setButtonLoading(false))

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
                        id="encoderList"
                        dropdownTitle="RTMP Encoders"
                        list={encoderList}
                        dropdownDefaultSelect={selectedEncoder.title}
                        callback={(item: DropdownSingleListItem) => {setSelectedEncoder(item)}}
                    />
                    <LinkBoxContainer className={ClassHalfXsFullMd + " mb2"}>
                        <LinkBoxLabel>
                            <Text size={14} weight="med">{selectedEncoder.data.primaryPublishURL}</Text>
                        </LinkBoxLabel>
                        <LinkBox>
                            <LinkText size={14} weight="reg">{props.contentDetails.primaryPublishURL}</LinkText>
                            <IconStyle className='pointer' onClick={() => {updateClipboard(props.contentDetails.primaryPublishURL, "Copied to clipboard");segmentService.track('Livestream Created', {action: 'Setup Livestream', 'livestream_id': props.contentDetails.id, step: 2}) } }>file_copy</IconStyle>
                        </LinkBox>
                    </LinkBoxContainer>
                    <LinkBoxContainer className={ClassHalfXsFullMd + " mb2"}>
                        <LinkBoxLabel>
                            <Text size={14} weight="med">{selectedEncoder.data.backupPublishURL}</Text>
                        </LinkBoxLabel>
                        <LinkBox>
                            <LinkText size={14} weight="reg">{props.contentDetails.backupPublishURL}</LinkText>
                            <IconStyle className='pointer' onClick={() => updateClipboard(props.contentDetails.backupPublishURL, "Copied to clipboard")}>file_copy</IconStyle>
                        </LinkBox>
                    </LinkBoxContainer>
                    <LinkBoxContainer className={ClassHalfXsFullMd + " mb2"}>
                        <LinkBoxLabel>
                            <Text size={14} weight="med">{selectedEncoder.data.username}</Text>
                        </LinkBoxLabel>
                        <LinkBox>
                            <LinkText size={14} weight="reg">{props.contentDetails.username}</LinkText>
                            <IconStyle className='pointer' onClick={() => updateClipboard(props.contentDetails.username, "Copied to clipboard")}>file_copy</IconStyle>
                        </LinkBox>
                    </LinkBoxContainer>
                    <LinkBoxContainer className={ClassHalfXsFullMd + " mb2"}>
                        <LinkBoxLabel>
                            <Text size={14} weight="med">{selectedEncoder.data.password}</Text>
                        </LinkBoxLabel>
                        <LinkBox>
                            <LinkText size={14} weight="reg">{props.contentDetails.password}</LinkText>
                            <IconStyle className='pointer' onClick={() => updateClipboard(props.contentDetails.password, "Copied to clipboard")}>file_copy</IconStyle>
                        </LinkBox>
                    </LinkBoxContainer>
                    {props.contentDetails.streamKeys.map((streamKey, i) => {
                        return(
                        <LinkBoxContainer key={streamKey} className={ClassHalfXsFullMd + " mb2"}>
                        <LinkBoxLabel>
                            <Text size={14} weight="med">{selectedEncoder.data.streamKey + (i >= 1 ? ` ${i + 1}` : '')}</Text>
                        </LinkBoxLabel>
                        <LinkBox>
                            <LinkText size={14} weight="reg">{streamKey}</LinkText>
                            <IconStyle className='pointer' onClick={() => updateClipboard(streamKey, "Copied to clipboard")}>file_copy</IconStyle>
                        </LinkBox>
                    </LinkBoxContainer>
                        )
                    })}
                    <div>
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
                    </div>

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