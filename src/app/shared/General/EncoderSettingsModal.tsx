import React, { Dispatch, SetStateAction } from 'react';
import { Bubble } from '../../../components/Bubble/Bubble';
import { Modal, ModalContent, ModalFooter } from '../../../components/Modal/Modal';
import { IconStyle } from '../../../shared/Common/Icon';
import { getKnowledgebaseLink } from '../../constants/KnowledgbaseLinks';
import { LiveDetails } from '../../redux-flow/store/Content/General/types';
import { segmentService } from '../../utils/services/segment/segmentService';
import { updateClipboard } from '../../utils/utils';
import { BubbleContent } from '../Security/SecurityStyle';
import { LinkBoxContainer, ClassHalfXsFullMd, LinkBoxLabel, LinkBox, LinkText,  EncoderSettingsContainer } from './GeneralStyle';
import {Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { Trans, useTranslation } from 'react-i18next';


export const EncoderSettingsModal = (props: {toggle: Dispatch<SetStateAction<boolean>>; opened: boolean; generateEncoderKey: (liveId: string) => Promise<void>; contentDetails: LiveDetails; }) => {

    let encoderPreference = JSON.parse(localStorage.getItem('userEncoderPreference'))
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const [selectedEncoder, setSelectedEncoder] = React.useState(encoderPreference ? encoderPreference : {title: "Generic RTMP Encoder", data: {primaryPublishURL: "live_stream_general_encoder_modal_url_field_title", backupPublishURL: "live_stream_general_encoder_modal_backup_url_field_title", username: "live_stream_general_encoder_modal_username_field_title", password: "live_stream_general_encoder_modal_password_field_title", streamKey: "live_stream_general_encoder_modal_stream_key_field_title"}}) 
    const { t } = useTranslation()

    const encoderList = [
        {title: "Generic RTMP Encoder", data: {primaryPublishURL: "live_stream_general_encoder_modal_url_field_title", backupPublishURL: "live_stream_general_encoder_modal_backup_url_field_title", username: "live_stream_general_encoder_modal_username_field_title", password: "live_stream_general_encoder_modal_password_field_title", streamKey: "live_stream_general_encoder_modal_stream_key_field_title"}},
        {title: "OBS Open Broadcaster Software", data: {encoderKey: "live_stream_general_encoder_modal_encoder_key_field_title"}},
        {title: "Sling Studio", data: {primaryPublishURL: "live_stream_general_encoder_modal_stream_url_field_title", streamKey: "Stream Name"}},
        {title: "Telestream Wirecast", data: {primaryPublishURL: "live_stream_general_encoder_modal_address_field_title", backupPublishURL: "live_stream_general_encoder_modal_backup_address_field_title", username: "live_stream_general_encoder_modal_username_field_title", password: "live_stream_general_encoder_modal_password_field_title", streamKey: "Stream"}},
        {title: "Teradek", data: {primaryPublishURL: "live_stream_general_encoder_modal_server_url_field_title", backupPublishURL: "live_stream_general_encoder_modal_backup_server_url_field_title", username: "live_stream_general_encoder_modal_username_field_title", password: "live_stream_general_encoder_modal_password_field_title", streamKey: "Stream"}},
        {title: "Vid Blaster", data: {primaryPublishURL: "URL/IP: Port", backupPublishURL: "live_stream_general_encoder_modal_backup_url_field_title", username: "live_stream_general_encoder_modal_username_field_title", password: "live_stream_general_encoder_modal_password_field_title", streamKey: "Stream"}},
        {title: "vMix", data: {primaryPublishURL: "live_stream_general_encoder_modal_url_field_title", backupPublishURL: "live_stream_general_encoder_modal_backup_url_field_title", username: "live_stream_general_encoder_modal_username_field_title", password: "live_stream_general_encoder_modal_password_field_title", streamKey: "Stream Name or Key"}}
    ]

    const handleGenerateKeyClick = () => {
        setButtonLoading(true)
        props.generateEncoderKey(props.contentDetails.id)
        .then(() => setButtonLoading(false))
        .catch(() => setButtonLoading(false))
    }

    const formatURL = (baseURL: string) => {
        switch(selectedEncoder.title) {
            case 'Teradek':
                return baseURL + '/_definst_'
            case 'Sling Studio':
                const splitURL = baseURL.split('rtmp://')
                return 'rtmp://' + props.contentDetails.username + ':' + props.contentDetails.password + '@' + splitURL[1]
            default:
                return baseURL
        }
    }

    const handleSelectedEncoder = (encoder: DropdownSingleListItem) => {
        setSelectedEncoder(encoder)
        localStorage.setItem('userEncoderPreference', JSON.stringify(encoder))
    }
    return (
        <Modal allowNavigation={false} hasClose={false} size="large" modalTitle={t('live_stream_general_encoder_modal_title')} opened={props.opened} toggle={() => props.toggle(!props.opened)} >
        <ModalContent>
            <div className="col col-12">
                <Bubble type='info' className='my2'>
                    <BubbleContent>
                        <Text weight="reg" size={16} >
                            <Trans i18nKey="live_stream_general_encoder_modal_info_text">
                                Correct <a href={getKnowledgebaseLink("Encoder Setup")} target="_blank">Encoder Setup</a> is required — <a href='/help'>contact us</a> if you need help.
                            </Trans>
                            </Text>
                        </BubbleContent>
                    </Bubble>
                    <DropdownSingle
                        className="col col-6 mb2"
                        id="encoderList"
                        dropdownTitle={t('live_stream_general_encoder_modal_dropdown_title')}
                        list={encoderList}
                        dropdownDefaultSelect={selectedEncoder.title}
                        callback={(item: DropdownSingleListItem) => {handleSelectedEncoder(item)}}
                    />
                    <EncoderSettingsContainer className="col col-12">
                    <div className="col col-12">
                       { selectedEncoder.data.primaryPublishURL &&
                            <LinkBoxContainer className={ClassHalfXsFullMd + " mb2"}>
                                <LinkBoxLabel>
                                    <Text size={14} weight="med">{t(selectedEncoder.data.primaryPublishURL)}</Text>
                                    <IconStyle id="primaryPublishURLTooltip">info_outlined</IconStyle>
                                    <Tooltip target="primaryPublishURLTooltip">{t('live_stream_general_encoder_modal_url_field_tooltip')}</Tooltip>
                                </LinkBoxLabel>
                                <LinkBox backgroundColor="white">
                                    <LinkText size={14} weight="reg">{props.contentDetails.primaryPublishURL}</LinkText>
                                    <IconStyle className='pointer' onClick={() => {updateClipboard(props.contentDetails.primaryPublishURL, "Copied to clipboard");segmentService.track('Livestream Created', {action: 'Setup Livestream', 'livestream_id': props.contentDetails.id, step: 2}) } }>file_copy</IconStyle>
                                </LinkBox>
                            </LinkBoxContainer>
                        }
                        {
                            selectedEncoder.data.backupPublishURL &&
                                <LinkBoxContainer className={ClassHalfXsFullMd + " mb2"}>
                                    <LinkBoxLabel>
                                        <Text size={14} weight="med">{t(selectedEncoder.data.backupPublishURL)}</Text>
                                        <IconStyle id="backupPublishURLTooltip">info_outlined</IconStyle>
                                        <Tooltip target="backupPublishURLTooltip">{t('live_stream_general_encoder_modal_backup_url_field_tooltip')}</Tooltip>
                                    </LinkBoxLabel>
                                    <LinkBox backgroundColor="white">
                                        <LinkText size={14} weight="reg">{formatURL(props.contentDetails.backupPublishURL)}</LinkText>
                                        <IconStyle className='pointer' onClick={() => updateClipboard(formatURL(props.contentDetails.backupPublishURL), "Copied to clipboard")}>file_copy</IconStyle>
                                    </LinkBox>
                                </LinkBoxContainer>
                        }
                    </div>
                    {
                        selectedEncoder.data.username &&
                            <LinkBoxContainer className={ClassHalfXsFullMd + " mb2"}>
                                <LinkBoxLabel>
                                    <Text size={14} weight="med">{t(selectedEncoder.data.username)}</Text>
                                </LinkBoxLabel>
                                <LinkBox backgroundColor="white">
                                    <LinkText size={14} weight="reg">{props.contentDetails.username}</LinkText>
                                    <IconStyle className='pointer' onClick={() => updateClipboard(props.contentDetails.username, "Copied to clipboard")}>file_copy</IconStyle>
                                </LinkBox>
                            </LinkBoxContainer>
                    }
                    {
                        selectedEncoder.data.password &&
                            <LinkBoxContainer className={ClassHalfXsFullMd + " mb2"}>
                                <LinkBoxLabel>
                                    <Text size={14} weight="med">{t(selectedEncoder.data.password)}</Text>
                                </LinkBoxLabel>
                                <LinkBox backgroundColor="white">
                                    <LinkText size={14} weight="reg">{props.contentDetails.password}</LinkText>
                                    <IconStyle className='pointer' onClick={() => updateClipboard(props.contentDetails.password, "Copied to clipboard")}>file_copy</IconStyle>
                                </LinkBox>
                            </LinkBoxContainer>
                    }
                    { selectedEncoder.data.streamKey &&
                        props.contentDetails.streamKeys.map((streamKey, i) => {
                            return(
                                <LinkBoxContainer key={streamKey} className={ClassHalfXsFullMd + " mb2"}>
                                    <LinkBoxLabel>
                                        <Text size={14} weight="med">{t(selectedEncoder.data.streamKey) + (i >= 1 ? ` ${i + 1}` : '')}</Text>
                                        <IconStyle id={"streamKeyTooltip" + i}>info_outlined</IconStyle>
                                        <Tooltip target={"streamKeyTooltip" + i}>{t('live_stream_general_encoder_modal_stream_key_field_tooltip')}</Tooltip>
                                    </LinkBoxLabel>
                                    <LinkBox backgroundColor="white">
                                        <LinkText size={14} weight="reg">{streamKey}</LinkText>
                                        <IconStyle className='pointer' onClick={() => updateClipboard(streamKey, "Copied to clipboard")}>file_copy</IconStyle>
                                    </LinkBox>
                                </LinkBoxContainer>
                            )
                        })
                    }
                    { selectedEncoder.data.encoderKey &&
                        <div className='flex items-center'>
                            <LinkBoxContainer className="col col-6 mb2">
                                <LinkBoxLabel>
                                    <Text size={14} weight="med">{t(selectedEncoder.data.encoderKey)}</Text>
                                </LinkBoxLabel>
                                <LinkBox backgroundColor="white">
                                    <LinkText size={14} weight="reg">{props.contentDetails.encoderKey}</LinkText>
                                    <IconStyle className='pointer' onClick={() => updateClipboard(props.contentDetails.encoderKey, "Copied to clipboard")}>file_copy</IconStyle>
                                </LinkBox>
                            </LinkBoxContainer>
                            <Button className='mr2 mt2' onClick={handleGenerateKeyClick} isLoading={buttonLoading} sizeButton='small' buttonColor='blue' typeButton='primary'>
                                {props.contentDetails.encoderKey ? 'Refresh' : t('common_button_text_generate')}
                            </Button>
                        </div>
                    }
                    </EncoderSettingsContainer>
                </div>
                <div className="flex flex-column col col-12 mt2">
                    {
                        selectedEncoder.title === 'OBS Open Broadcaster Software' &&
                        <Text className='py2'>
                            <Trans i18nKey='live_stream_general_encoder_modal_obs_version_info_text'>
                                For OBS Studio Versions prior to 27.0.0, please use <Text weight='med' color='dark-violet' className='link' onClick={() => {setSelectedEncoder(encoderList.find(e => e.title === 'Generic RTMP Encoder'))}}>Generic RTMP Encoder settings.</Text>
                            </Trans>
                        </Text>
                    }
                    <Text className='py2' size={14} weight="reg">
                        <Trans i18nKey='live_stream_general_encoder_modal_guide_link'>
                            Quick guide for live streaming with <a href={getKnowledgebaseLink(selectedEncoder.title)} target="_blank" rel="noopener noreferrer">{{encoderName: selectedEncoder.title}}</a>
                        </Trans>
                    </Text>
                </div>
            </ModalContent>
            <ModalFooter className="mt1" >
                <Button onClick={() => props.toggle(false)}>{t('common_button_text_close')}</Button>
            </ModalFooter>
        </Modal>
    )
}
