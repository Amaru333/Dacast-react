import React from 'react';
import { Card } from '../../../components/Card/Card';
import { Text } from "../../../components/Typography/Text"
import styled from 'styled-components';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { IconStyle, IconContainer, ActionIcon } from '../../../shared/Common/Icon';
import { Modal, ModalContent, ModalFooter } from '../../../components/Modal/Modal';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { ImageModal } from '../../shared/General/ImageModal';
import { LinkBoxContainer, LinkBoxLabel, LinkBox, LinkText, ButtonContainer, ClassHalfXsFullMd, ExpandableContainer } from "../../shared/General/GeneralStyle"
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { Prompt } from 'react-router';
import { updateClipboard } from '../../utils/utils';
import { userToken } from '../../utils/services/token/tokenService';
import { languages } from 'countries-list';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { PreviewModal } from '../../shared/Common/PreviewModal';
import { logAmplitudeEvent } from '../../utils/services/amplitude/amplitudeService';
import { SubtitleInfo, ContentDetails, DateTimeValue } from '../../redux-flow/store/Content/General/types';
import moment from 'moment';
import { Bubble } from '../../../components/Bubble/Bubble';
import { BubbleContent } from '../Security/SecurityStyle';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { getKnowledgebaseLink } from '../../constants/KnowledgbaseLinks';
import { Divider } from '../Common/MiscStyle';
import { GeneralDetails } from './Details';
import { GeneralSharing } from './Sharing';
import { GeneralSettings } from './Settings'
import { GeneralImages } from './Images'
import { GeneralAdvancedLinks } from './AdvancedLinks'
import { GeneralSubtitles } from './Subtitles';

export interface ContentGeneralProps {
    contentType: string;
    contentDetails: ContentDetails;
    getContentDetails: (contentId: string, contentType: string) => Promise<void>
    saveContentDetails: (data: ContentDetails, contentType: string) => Promise<void>;
    getUploadUrl: (uploadType: string, contentId: string, extension: string, contentType: string, subtitleInfo?: SubtitleInfo) => Promise<void>;
    uploadFile: (data: File, uploadUrl: string, contentId: string, uploadType: string, contentType: string) => Promise<void>;
    deleteFile: (contentId: string, targetId: string, contentType: string, uploadType: string) => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
    uploadImageFromVideo?: (contentId: string, time: number, imageType: string) => Promise<void>
    deleteSubtitle?: (targetId: string, contentId: string, fileName: string, contentType: string) => Promise<void>;
    addSubtitle?: (data: File, uploadUrl: string, subtitleInfo: SubtitleInfo, contentId: string, contentType: string) => Promise<void>
}

var momentTZ = require('moment-timezone')

export const ContentGeneralPage = (props: ContentGeneralProps) => {

    const initTimestampValues = (ts: number, timezone: string): { date: string; time: string } => {
        timezone = timezone ? timezone : Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (ts > 0) {
            return { date: momentTZ(ts * 1000).tz(timezone).format('YYYY-MM-DD'), time: momentTZ(ts * 1000).tz(timezone).format('HH:mm:ss') }
        }
        return { date: moment().toString(), time: '00:00' }
    }

    const emptySubtitle = { targetID: "", name: "", languageLongName: "", languageShortName: "", convertToUTF8: false }

    const userId = userToken.getUserInfoItem('custom:dacast_user_id')

    
    const [subtitleModalOpen, setSubtitleModalOpen] = React.useState<boolean>(false)
    const [imageModalOpen, setImageModalOpen] = React.useState<boolean>(false)
    const [uploadedSubtitleFile, setUploadedSubtitleFile] = React.useState<SubtitleInfo>(emptySubtitle)
    const [contentDetails, setContentDetails] = React.useState<ContentDetails>(props.contentDetails)
    const [imageModalTitle, setImageModalTitle] = React.useState<string>(null)
    const [subtitleFile, setSubtitleFile] = React.useState<File>(null)
    const [selectedImageName, setSelectedImageName] = React.useState<string>(null)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const [subtitleButtonLoading, setSubtitleButtonLoading] = React.useState<boolean>(false);
    const [previewModalOpen, setPreviewModalOpen] = React.useState<boolean>(false)
    const [advancedSubtitleSectionExpanded, setAdvancedSubtitleSectionExpanded] = React.useState<boolean>(false)
    const [confirmRewindModal, setConfirmRewindModal] = React.useState<boolean>(false)
    const [stepModalRewind, setStepModalRewind] = React.useState<1 | 2>(1)
    const [startDateTimeValue, setStartDateTimeValue] = React.useState<DateTimeValue>(props.contentType === 'live' ? {...initTimestampValues(props.contentDetails.countdown.startTime, props.contentDetails.countdown.timezone), timezone: props.contentDetails.countdown.timezone ? props.contentDetails.countdown.timezone : momentTZ.tz.guess()} : null)
    const [encoderModalOpen, setEncoderModalOpen] = React.useState<boolean>(false)
    const [liveStreamCountdownToggle, setLiveStreamCountdownToggle] = React.useState<boolean>(props.contentType === "live" ? (props.contentDetails.countdown.startTime && props.contentDetails.countdown.startTime !== 0) ? true : false : null)
    const [hasChanged, setHasChanged] = React.useState<boolean>(false)

    let subtitleBrowseButtonRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
        if (liveStreamCountdownToggle) {
            let countdownTs = liveStreamCountdownToggle ? momentTZ.tz(`${startDateTimeValue.date} ${startDateTimeValue.time}`, `${startDateTimeValue.timezone}`).valueOf() : 0
            setContentDetails({ ...contentDetails, countdown: { ...contentDetails.countdown, startTime: Math.floor(countdownTs / 1000) } })
        } else {
            setContentDetails({ ...contentDetails, countdown: { ...contentDetails.countdown, startTime: 0 } })
        }
    }, [liveStreamCountdownToggle, startDateTimeValue])

    const subtitlesTableHeader = (setSubtitleModalOpen: (boolean: boolean) => void) => {
        return {
            data: [
                { cell: <Text size={14} weight="med">Subtitles</Text> },
                { cell: <Text size={14} weight="med">Language</Text> },
                { cell: <Button onClick={() => setSubtitleModalOpen(true)} className="right mr2" sizeButton="xs" typeButton="secondary">Create Subtitle</Button> }
            ]
        }
    };

    const subtitlesTableBody = () => {
        return props.contentDetails.subtitles &&props.contentDetails.subtitles.map((value, key) => {
            return {
                data: [
                    <div className='flex'>
                        <Text key={"generalPage_subtitles_" + value.name + key} size={14} weight="reg">{value.name}</Text>
                        {
                            !value.url &&
                            <div className='pl2 relative'>
                                <IconStyle coloricon='orange' id={'failedUploadedFileSubtitle' + key}>warning_outlined</IconStyle>
                                <Tooltip style={{ width: 330 }} target={"failedUploadedFileSubtitle" + key}>Your file wasn't uploaded properly! Please upload a new one.</Tooltip>
                            </div>
                        }

                    </div>
                    ,
                    <Text key={"generalPage_subtitles_" + value.languageLongName + key} size={14} weight="reg">{value.languageLongName}</Text>,
                    <IconContainer key={"generalPage_subtitles_actionIcons" + value.name + key} className="iconAction">
                        <ActionIcon id={"downloadSubtitleTooltip" + key}><a href={value.url} download><IconStyle>get_app</IconStyle></a></ActionIcon>
                        <Tooltip target={"downloadSubtitleTooltip" + key}>Download</Tooltip>
                        <ActionIcon id={"deleteSubtitleTooltip" + key}><IconStyle onClick={() => props.deleteSubtitle(props.contentDetails.id, value.targetID, value.name, props.contentType)}>delete</IconStyle></ActionIcon>
                        <Tooltip target={"deleteSubtitleTooltip" + key}>Delete</Tooltip>
                    </IconContainer>
                ]
            }
        })
    };

    

    

    React.useEffect(() => {
        if (props.contentDetails.uploadurl && subtitleModalOpen) {
            props.addSubtitle(subtitleFile, props.contentDetails.uploadurl, { ...uploadedSubtitleFile, targetID: props.contentDetails.subtitles[props.contentDetails.subtitles.length - 1].targetID }, props.contentDetails.id, props.contentType).then(() =>
                setSubtitleButtonLoading(false)
            ).catch(() =>
                setSubtitleButtonLoading(false)
            )
            setUploadedSubtitleFile(emptySubtitle)
            setSubtitleModalOpen(false);
        }
    }, [props.contentDetails.uploadurl])

    const handleSubtitleSubmit = () => {
        setSubtitleButtonLoading(true)
        props.getUploadUrl('subtitle', props.contentDetails.id, null, props.contentType, uploadedSubtitleFile)
    }

    const handleImageModalFunction = () => {
        if (imageModalTitle === "Change Splashscreen") {
            return `${props.contentType}-splashscreen`
        } else if (imageModalTitle === "Change Thumbnail") {
            return `${props.contentType}-thumbnail`
        } else if (imageModalTitle === 'Change Poster') {
            return `${props.contentType}-poster`
        } else {
            return `${props.contentType}-poster`
        }
    }

    const handleDrop = (file: FileList) => {
        const acceptedImageTypes = ['.srt', '.vtt'];
        if (file.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                setSubtitleFile(file[0])
                setUploadedSubtitleFile({ ...uploadedSubtitleFile, name: file[0].name })
            }
            reader.readAsDataURL(file[0])
        }
    }

    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length > 0) {
            handleDrop(e.target.files);
        }
    }

    

    

    return (
        contentDetails &&
            <React.Fragment>
                <Card className="col-12 clearfix">
                    <GeneralDetails
                        userId={userId}
                        contentDetails={props.contentDetails}
                        localContentDetails={contentDetails}
                        contentType={props.contentType}
                        setHasChanged={setHasChanged}
                        setLocalContentDetails={setContentDetails}
                        setEncoderModalOpen={setEncoderModalOpen}
                    />
                    <GeneralSharing 
                        userId={userId}
                        contentDetails={props.contentDetails}
                        contentType={props.contentType}
                        setPreviewModalOpen={setPreviewModalOpen}
                    />
                    {   
                        props.contentType === "live" &&
                            <>
                                <Divider className="col col-12 mt3 mr25 mb25" />
                                <GeneralSettings 
                                    localContentDetails={contentDetails}
                                    setLocalContentDetails={setContentDetails}
                                    setHasChanged={setHasChanged}
                                    liveStreamCountdownToggle={liveStreamCountdownToggle}
                                    setLiveStreamCountdownToggle={setLiveStreamCountdownToggle}
                                    startDateTimeValue={startDateTimeValue}
                                    setStartDateTimeValue={setStartDateTimeValue}
                                />
                            </>
                    }
                    <Divider className="col col-12 mt3 mr25 mb25" />
                    <GeneralImages 
                        contentType={props.contentType}
                        localContentDetails={contentDetails}
                        setLocalContentDetails={setContentDetails}
                        contentDetails={props.contentDetails}
                        setHasChanged={setHasChanged}
                        setImageModalTitle={setImageModalTitle}
                        setSelectedImageName={setSelectedImageName}
                        setImageModalOpen={setImageModalOpen}
                        deleteFile={props.deleteFile}
                    />

                {props.contentType === "vod" &&
                    <>
                        <Divider className="col col-12 mt3 mr25 mb25" />
                        <GeneralSubtitles 
                            contentType={props.contentType}
                            contentDetails={props.contentDetails}
                            setSubtitleModalOpen={setSubtitleModalOpen}
                            deleteSubtitle={props.deleteSubtitle}
                        />
                    </>}
                <Divider className="col col-12 mt3 mr25 mb25" />
                {
                    props.contentType !== 'expo' &&
                    <GeneralAdvancedLinks contentDetails={props.contentDetails} />
                }

                {(subtitleModalOpen && props.contentType === "vod") &&
                    <Modal id="addSubtitles" opened={subtitleModalOpen === true} toggle={() => setSubtitleModalOpen(false)} size="small" modalTitle="Add Subtitles" hasClose={false}>
                        <ModalContent>
                            <DropdownSingle
                                hasSearch
                                className="col col-12"
                                id="subtitleLanguage"
                                dropdownTitle="Subtitle Language"
                                list={Object.keys(languages).reduce((reduced, language) => { return { ...reduced, [languages[language].name]: false } }, {})}
                                dropdownDefaultSelect={uploadedSubtitleFile.languageLongName}
                                callback={(value: string) => setUploadedSubtitleFile({ ...uploadedSubtitleFile, languageLongName: value, languageShortName: Object.keys(languages).find(l => languages[l].name === value) })}
                            />
                            <input type='file' ref={subtitleBrowseButtonRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBrowse(e)} style={{ display: 'none' }} id='browseButtonSubtitle' />
                            <Button onClick={() => { subtitleBrowseButtonRef.current.click() }} className="mt25" typeButton="secondary" sizeButton="xs">
                                Select Files
                                </Button>
                            <Text className="col col-12" size={10} weight="reg" color="gray-5">Max file size is 1MB, File srt or vtt</Text>
                            {uploadedSubtitleFile.name === "" ? null :
                                <SubtitleFile className="col mt1">
                                    <SubtitleTextContainer>
                                        <Text className="ml2" color="gray-1" size={14} weight="reg">{uploadedSubtitleFile.name}</Text>
                                    </SubtitleTextContainer>
                                    <button style={{ border: "none", backgroundColor: "inherit" }}>
                                        <IconStyle onClick={() => setUploadedSubtitleFile({ ...uploadedSubtitleFile, name: "" })} className='flex items-center' customsize={14}>close</IconStyle>
                                    </button>
                                </SubtitleFile>
                            }
                            <div className="col col-12">
                                <div className="flex mt25" onClick={() => setAdvancedSubtitleSectionExpanded(!advancedSubtitleSectionExpanded)}>
                                    <IconStyle className="col col-1 pointer">{advancedSubtitleSectionExpanded ? "expand_less" : "expand_more"}</IconStyle>
                                    <Text className="col col-11 pointer" size={16} weight="med">Advanced Settings</Text>
                                </div>
                                <ExpandableContainer className="flex my2" isExpanded={advancedSubtitleSectionExpanded}>
                                    <InputCheckbox className='col' id='convertToUtf8Checkbox' label='Convert to UTF-8' defaultChecked={uploadedSubtitleFile.convertToUTF8 ? uploadedSubtitleFile.convertToUTF8 : true} onChange={() => { setUploadedSubtitleFile({ ...uploadedSubtitleFile, convertToUTF8: !uploadedSubtitleFile.convertToUTF8 }) }} />
                                    <IconStyle className="ml1" style={{ marginTop: 5 }} fontSize="small" id="utfTooltip">info_outlined</IconStyle>
                                    <Tooltip target="utfTooltip">Uncheck if you have already converted your file to UTF-8.</Tooltip>
                                </ExpandableContainer>
                            </div>


                        </ModalContent>
                        <ModalFooter>
                            <Button disabled={uploadedSubtitleFile.name === "" || !uploadedSubtitleFile.languageLongName} isLoading={subtitleButtonLoading} onClick={() => { handleSubtitleSubmit() }}  >Add</Button>
                            <Button onClick={() => { setSubtitleModalOpen(false); setUploadedSubtitleFile(emptySubtitle) }} typeButton="secondary">Cancel</Button>
                        </ModalFooter>
                    </Modal>
                }
                {
                    imageModalOpen &&
                    <ImageModal
                        imageFileName={selectedImageName}
                        imageType={handleImageModalFunction()}
                        contentId={props.contentDetails.id}
                        contentType={props.contentType}
                        uploadFromVideoAction={props.uploadImageFromVideo}
                        uploadUrl={props.contentDetails.uploadurl}
                        getUploadUrl={props.getUploadUrl}
                        title={imageModalTitle}
                        toggle={() => setImageModalOpen(false)}
                        opened={imageModalOpen === true}
                        submit={props.uploadFile}
                        getContentDetails={props.getContentDetails}
                    />
                }

                {
                    props.contentType === "live" &&
                    <Modal hasClose={false} size="large" modalTitle="Encoder Setup" opened={encoderModalOpen} toggle={() => setEncoderModalOpen(!encoderModalOpen)} >
                        <ModalContent>
                            <div className="col col-12">
                                <Bubble type='info' className='my2'>
                                    <BubbleContent>
                                        <Text weight="reg" size={16} >
                                            Correct <a href={getKnowledgebaseLink("Encoder Setup")} target="_blank">Encoder Setup</a> is required — <a href='/help'>contact us</a> if you need help.
                                            </Text>
                                        </BubbleContent>
                                    </Bubble>

                                    <LinkBoxContainer className={ClassHalfXsFullMd + " mb2"}>
                                        <LinkBoxLabel>
                                            <Text size={14} weight="med">Server</Text>
                                        </LinkBoxLabel>
                                        <LinkBox>
                                            <LinkText size={14} weight="reg">{props.contentDetails.primaryPublishURL}</LinkText>
                                            <IconStyle className='pointer' onClick={() => { logAmplitudeEvent("setup encoder"); updateClipboard(props.contentDetails.primaryPublishURL, "Copied to clipboard") } }>file_copy</IconStyle>
                                        </LinkBox>
                                    </LinkBoxContainer>
                                    <LinkBoxContainer className={ClassHalfXsFullMd + " mb2"}>
                                        <LinkBoxLabel>
                                            <Text size={14} weight="med">Backup Server</Text>
                                        </LinkBoxLabel>
                                        <LinkBox>
                                            <LinkText size={14} weight="reg">{props.contentDetails.backupPublishURL}</LinkText>
                                            <IconStyle className='pointer' onClick={() => updateClipboard(props.contentDetails.backupPublishURL, "Copied to clipboard")}>file_copy</IconStyle>
                                        </LinkBox>
                                    </LinkBoxContainer>
                                    <LinkBoxContainer className={ClassHalfXsFullMd + " mb2"}>
                                        <LinkBoxLabel>
                                            <Text size={14} weight="med">Username</Text>
                                        </LinkBoxLabel>
                                        <LinkBox>
                                            <LinkText size={14} weight="reg">{props.contentDetails.username}</LinkText>
                                            <IconStyle className='pointer' onClick={() => updateClipboard(props.contentDetails.username, "Copied to clipboard")}>file_copy</IconStyle>
                                        </LinkBox>
                                    </LinkBoxContainer>
                                    <LinkBoxContainer className={ClassHalfXsFullMd + " mb2"}>
                                        <LinkBoxLabel>
                                            <Text size={14} weight="med">Password</Text>
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
                                            <Text size={14} weight="med">{"Stream Key " + (i+1)}</Text>
                                        </LinkBoxLabel>
                                        <LinkBox>
                                            <LinkText size={14} weight="reg">{streamKey}</LinkText>
                                            <IconStyle className='pointer' onClick={() => updateClipboard(streamKey, "Copied to clipboard")}>file_copy</IconStyle>
                                        </LinkBox>
                                    </LinkBoxContainer>
                                        )
                                    })}
                                </div>
                                <div className="flex col col-12 mt2">
                                    <IconStyle style={{ marginRight: "10px" }}>info_outlined</IconStyle>
                                    <Text size={14} weight="reg">Need help setting up an encoder? Visit the <a href={getKnowledgebaseLink('Encoder Setup')} target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
                                </div>
                            </ModalContent>
                            <ModalFooter className="mt1" >
                                <Button onClick={() => setEncoderModalOpen(false)}>Close</Button>
                            </ModalFooter>
                        </Modal>
                    }

                <Modal hasClose={false} icon={stepModalRewind === 1 ? { name: 'info_outlined', color: 'yellow' } : { name: 'check', color: 'green' }} size="large" modalTitle={stepModalRewind === 1 ? "Is your Encoder turned off?" : "30 Minute Rewind Enabled"} opened={confirmRewindModal} toggle={() => setConfirmRewindModal(!confirmRewindModal)} >
                    {stepModalRewind === 1 ?
                        <>
                            <ModalContent>
                                <Text weight="reg" size={14}>
                                    Please confirm you have turned off your encoder before continuing.
                                        </Text>
                                <Text weight="med" size={14}>
                                    Need step by step help? Visit the <a href="https://www.dacast.com/support/knowledgebase/" target="_blank" rel="noopener noreferrer">Knowledge Base</a>.
                                        </Text>
                            </ModalContent>
                            <ModalFooter className="mt1" >
                                <Button onClick={() => { setStepModalRewind(2) }}>Yes</Button>
                                <Button onClick={() => { setConfirmRewindModal(false) }} typeButton="tertiary">No</Button>
                            </ModalFooter>
                        </>
                        :
                        <>
                            <ModalContent>
                                <Text weight="reg" size={14}>
                                    You must now purge your live stream. 30min rewind will take effect in 2 hours.
                                        </Text>
                                <Text weight="med" size={14}>
                                    Need step by step help? Visit the <a href="https://www.dacast.com/support/knowledgebase/" target="_blank" rel="noopener noreferrer">Knowledge Base</a>.
                                        </Text>
                            </ModalContent>
                            <ModalFooter className="mt1" >
                                <Button onClick={() => { setContentDetails({ ...contentDetails, rewind: !contentDetails.rewind }); setConfirmRewindModal(false); setStepModalRewind(1) }}>Confirm</Button>
                            </ModalFooter>
                        </>
                    }


                </Modal>

            </Card>
            {
                hasChanged &&
                <ButtonContainer>
                    <Button isLoading={buttonLoading} className="mr2" onClick={() => handleSave()}>Save</Button>
                    <Button typeButton="tertiary" onClick={() => { setContentDetails(props.contentDetails); props.showToast("Changes have been discarded", 'fixed', "success"); setHasChanged(false) }}>Discard</Button>
                </ButtonContainer>
            }
            {
                previewModalOpen && <PreviewModal contentId={userId + '-' + props.contentType + '-' + props.contentDetails.id} toggle={setPreviewModalOpen} isOpened={previewModalOpen} />
            }
            <Prompt when={hasChanged} message='' />
        </React.Fragment >

    )

}

