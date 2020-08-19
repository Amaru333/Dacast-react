import React from 'react';
import { Card } from '../../../components/Card/Card';
import { Text } from "../../../components/Typography/Text"
import { Toggle } from '../../../components/Toggle/toggle';
import { Input } from '../../../components/FormsComponents/Input/Input';
import styled from 'styled-components';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Table } from '../../../components/Table/Table';
import { IconStyle, IconContainer, ActionIcon } from '../../../shared/Common/Icon';
import { Modal, ModalContent, ModalFooter } from '../../../components/Modal/Modal';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { ImageModal } from '../../shared/General/ImageModal';
import { Divider, LinkBoxContainer, LinkBoxLabel, LinkBox, LinkText, ButtonContainer, ImagesContainer, ImageContainer, ImageArea, ImageSection, SelectedImage, ButtonSection, ClassHalfXsFullMd, ExpandableContainer } from "../../shared/General/GeneralStyle"
import { InputTags } from '../../../components/FormsComponents/Input/InputTags';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { Prompt } from 'react-router';
import { updateClipboard } from '../../utils/utils';
import { userToken } from '../../utils/token';
import { languages } from 'countries-list';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { PreviewModal } from '../../shared/Common/PreviewModal';
import { logAmplitudeEvent } from '../../utils/amplitudeService';
import { SubtitleInfo, ContentDetails } from '../../redux-flow/store/Content/General/types';
import moment from 'moment';
import { Bubble } from '../../../components/Bubble/Bubble';
import { BubbleContent, ToggleTextInfo } from '../Security/SecurityStyle';
import { DateSinglePickerWrapper } from '../../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { DropdownListType } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { axiosClient } from '../../utils/axiosClient';

export interface ContentGeneralProps {
    contentType: string;
    contentDetails: ContentDetails;
    getContentDetails: (contentId: string, contentType: string) => Promise<void>
    saveContentDetails: (data: ContentDetails, contentType: string) => Promise<void>;
    getUploadUrl: (uploadType: string, contentId: string, extension: string, contentType: string, subtitleInfo?: SubtitleInfo) => Promise<void>;
    uploadFile: (data: File, uploadUrl: string, contentId: string, uploadType: string, contentType: string) => Promise<void>;
    deleteFile: (contentId: string, targetId: string, uploadType: string, contentType: string) => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
    uploadImageFromVideo?: (contentId: string, time: number, imageType: string) => Promise<void>
    deleteSubtitle?: (targetId: string, contentId: string, fileName: string, contentType: string) => Promise<void>;
    addSubtitle?: (data: File, uploadUrl: string, subtitleInfo: SubtitleInfo, contentId: string, contentType: string) => Promise<void>
}

var momentTZ = require('moment-timezone')

export const ContentGeneralPage = (props: ContentGeneralProps) => {

    const initTimestampValues = (ts: number, timezone: string): {date: string; time: string} => {
        timezone=timezone ? timezone : Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.log(timezone)
        if(ts > 0 ) {
            return {date: momentTZ(ts).tz(timezone).format('YYYY-MM-DD'), time: momentTZ(ts).tz(timezone).format('HH:mm:ss')}
        } 
        return {date: moment().toString(), time: '00:00'}
    }

    const emptySubtitle = { targetID: "", name: "", languageLongName: "", languageShortName: "", convertToUTF8: false }

    const userId = userToken.getUserInfoItem('custom:dacast_user_id')

    const [advancedLinksExpanded, setAdvancedLinksExpanded] = React.useState<boolean>(false)
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
    const [startDateTimeValue, setStartDateTimeValue] = React.useState<{date: string; time: string; timezone: string;}>(props.contentType === 'live' ? {...initTimestampValues(props.contentDetails.countdown.startTime, props.contentDetails.countdown.timezone), timezone: props.contentDetails.countdown.timezone ? props.contentDetails.countdown.timezone : momentTZ.tz.guess()} : null)
    const [encoderModalOpen, setEncoderModalOpen] = React.useState<boolean>(false)
    const [liveStreamCountdownToggle, setLiveStreamCountdownToggle] = React.useState<boolean>(props.contentType === "live" ?props.contentDetails.countdown.startTime !== 0 : null)

    let subtitleBrowseButtonRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
        setContentDetails(props.contentDetails)
    }, [props.contentDetails.title, props.contentDetails.folders, props.contentDetails.description, props.contentDetails.online]);

    React.useEffect(() => {
        if(liveStreamCountdownToggle){
            let countdownTs = liveStreamCountdownToggle ? momentTZ.tz(`${startDateTimeValue.date} ${startDateTimeValue.time}`, `${startDateTimeValue.timezone}`).valueOf() : 0
            setContentDetails({...contentDetails, countdown: {...contentDetails.countdown, startTime: countdownTs}})
        } else {
            setContentDetails({...contentDetails, countdown: {...contentDetails.countdown, startTime: 0}})
        }
    }, [liveStreamCountdownToggle, startDateTimeValue])

    const subtitlesTableHeader = (setSubtitleModalOpen: (boolean: boolean) => void) => {
        return {data: [
            {cell: <Text size={14} weight="med">Subtitles</Text>},
            {cell: <Text size={14} weight="med">Language</Text>},
            {cell: <Button onClick={() => setSubtitleModalOpen(true)} className="right mr2" sizeButton="xs" typeButton="secondary">Create Subtitle</Button>}
        ]}
    };
    
    const subtitlesTableBody = () => {
        return props.contentDetails.subtitles ? props.contentDetails.subtitles.map((value, key) => {
            return {data: [
                <div className='flex'>
                    <Text key={"generalPage_subtitles_" + value.name + key} size={14} weight="reg">{value.name}</Text>
                    {
                        !value.url && 
                            <div className='pl2 relative'>
                                <IconStyle coloricon='orange' id={'failedUploadedFileSubtitle' + key}>warning_outlined</IconStyle>
                                <Tooltip style={{width: 330}} target={"failedUploadedFileSubtitle" + key}>Your file wasn't uploaded properly! Please upload a new one.</Tooltip>
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
                    {/* <ActionIcon id={"editSubtitleTooltip" + key}><IconStyle onClick={() => editSubtitle(value)}>edit</IconStyle></ActionIcon>
                    <Tooltip target={"editSubtitleTooltip" + key}>Edit</Tooltip> */}
                </IconContainer>
            ]}
        })
        : null
    };
    
    const disabledSubtitlesTableHeader = (setSubtitleModalOpen: (boolean: boolean) => void) => {
        return {data: [
            {cell: <span key={'disabledTableHeader'}></span>},
            {cell: <Button onClick={() => setSubtitleModalOpen(true)} className="right mr2" sizeButton="xs" typeButton="secondary">Create Subtitle</Button>}
        ]}
    }
    
    const disabledSubtitlesTableBody = (text: string) => {
        return [{data: [
            <span key={'disabledTableBody'}></span>,
            <div className='left'><Text key={text}  size={14} weight='reg' color='gray-3' >{text}</Text></div>
        ]}]
    }

    React.useEffect(() => {
        if(props.contentDetails.uploadurl && subtitleModalOpen) {
            props.addSubtitle(subtitleFile, props.contentDetails.uploadurl, {...uploadedSubtitleFile, targetID: props.contentDetails.subtitles[props.contentDetails.subtitles.length - 1].targetID}, props.contentDetails.id, props.contentType).then(() =>
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
            return  `${props.contentType}-splashscreen`
        } else if (imageModalTitle === "Change Thumbnail") {
            return `${props.contentType}-thumbnail`
        } else if(imageModalTitle === 'Change Poster') {
            return `${props.contentType}-poster`
        } else {
            return ''
        }
    }

    const handleDrop = (file: FileList) => {
        const acceptedImageTypes = ['.srt', '.vtt'];
        if(file.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                setSubtitleFile(file[0])
                setUploadedSubtitleFile({...uploadedSubtitleFile, name: file[0].name})
            }
            reader.readAsDataURL(file[0])
        }
    }
    
    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(e.target.files && e.target.files.length > 0) {
            handleDrop(e.target.files);
        }
    }

    let posterEnable = Object.keys(props.contentDetails.poster).length !== 0;

    const advancedLinksOptions = [
        { id: "thumbnail", label: "Thumbnail", enabled: true, link: props.contentDetails.thumbnail.url },
        { id: "splashscreen", label: "Splashscreen", enabled: true, link: props.contentDetails.splashscreen.url },
        { id: "poster", label: "Poster", enabled: true, link: posterEnable ? props.contentDetails.poster.url : '' },
        { id: "m3u8", label: "M3U8", enabled: userToken.getPrivilege('privilege-unsecure-m3u8'), link: null }
    ]

    let splashScreenEnable = Object.keys(props.contentDetails.splashscreen).length !== 0;
    let thumbnailEnable = Object.keys(props.contentDetails.thumbnail).length !== 0;

    function saveFile(url: string, filename: string) {
        axiosClient.get(`/vods/${contentDetails.id}/download-url`
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
        }
    }

    const handleSave = () => {
        setButtonLoading(true)
        props.saveContentDetails(contentDetails, props.contentType).then(() =>  
             setButtonLoading(false)
        ).catch(() =>
             setButtonLoading(false)
        )
    }

    const handleImageDelete = (imageType: string) => {
        props.deleteFile(props.contentDetails.id, props.contentDetails[imageType].targetID, imageType, props.contentType)
    }
    
    return (
        contentDetails &&
            <React.Fragment>
                <Card className="col-12 clearfix">
                    <div className="details col col-12">
                        <header className="flex justify-between mb2">
                            <Text size={20} weight="med">Details</Text>
                            { 
                                (userToken.getPrivilege('privilege-web-download') && props.contentType === 'vod') && 
                                    <Button onClick={() => saveFile(null, contentDetails.title)} sizeButton="xs" typeButton="secondary">Download</Button>
                            }
                            {
                                props.contentType === 'live' &&
                                    <Button onClick={() => setEncoderModalOpen(true)} sizeButton="xs" typeButton="secondary" >Encoder Setup</Button>
                            }
                        </header>
                        <Toggle
                            className="col col-12 mb2"
                            defaultChecked={contentDetails.online}
                            onChange={() => {setContentDetails({ ...contentDetails, online: !contentDetails.online });}}
                            label={handleOnlineToggle(props.contentType) + " Online"}
                        />
                        <Input
                            className={ClassHalfXsFullMd + "pr2 mb2"}
                            label="Title"
                            value={contentDetails.title}
                            onChange={event => {setContentDetails({...contentDetails, title: event.currentTarget.value });}}
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
                            value={contentDetails.description ? contentDetails.description : ''}
                            onChange={event => {setContentDetails({ ...contentDetails, description: event.currentTarget.value });}}
                        />
                        <div className={"col col-3 flex flex-column"}>
                            <LinkBoxLabel>
                                <Text size={14} weight="med">Content ID</Text>
                            </LinkBoxLabel>
                            <LinkBox>
                                <LinkText size={14} weight="reg">{userId + + '-' + props.contentType + '-' + props.contentDetails.id}</LinkText>
                                <IconStyle className='pointer' id="copyContentIdTooltip" onClick={() => updateClipboard(userId + '-' + props.contentType + '-' + props.contentDetails.id, 'Content ID Copied')}>file_copy_outlined</IconStyle>
                                <Tooltip target="copyContentIdTooltip">Copy to clipboard</Tooltip>
                            </LinkBox>
                        </div>
                    </div>
                    <Divider className="col col-12" />
                    <div className='col col-12'>
                        <header className="flex justify-between">
                            <Text className='col col-12' size={20} weight='med'>Sharing</Text>
                            <Button sizeButton="xs" typeButton="secondary" onClick={() => setPreviewModalOpen(true)}>Preview</Button>
                        </header>
                        <Text className='pt2 col col-12' size={14}>The Embed Code can add content to your website and the Share Link can be shared on social media.</Text>

                        <div className={ClassHalfXsFullMd + "mt2 pr2 flex flex-column"}>
                            <LinkBoxLabel>
                                <Text size={14} weight="med">Embed Code</Text>
                            </LinkBoxLabel>
                            <LinkBox>
                                <LinkText size={14} weight="reg">
                                { props.contentDetails.embedType === "iframe" ? 
                                    `<iframe src="https://${process.env.BASE_IFRAME_URL}/${props.contentType}/${userId}/${props.contentDetails.id}" width="${props.contentDetails.embedScaling === "responsive" ? "100%" : props.contentDetails.embedSize}" height="100%" frameborder="0" scrolling="no" allow="autoplay" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>` : 
                                    `<script id="${userId}-${props.contentType}-${props.contentDetails.id}" width="${props.contentDetails.embedScaling === "responsive" ? "100%" : props.contentDetails.embedSize}" height="100%" src="https://player.dacast.com/js/player.js?contentId=${userId}-${props.contentType}-${props.contentDetails.id}"  class="dacast-video"></script>` }
                                </LinkText>
                                <IconStyle className='pointer' id="copyEmbedTooltip" onClick={() => { logAmplitudeEvent('embed video iframe'); updateClipboard(props.contentDetails.embedType === "iframe" ? 
                                    `<iframe src="https://${process.env.BASE_IFRAME_URL}/${props.contentType}/${userId}/${props.contentDetails.id}" width="${props.contentDetails.embedScaling === "responsive" ? "100%" : props.contentDetails.embedSize}" height="100%" frameborder="0" scrolling="no" allow="autoplay" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>` : 
                                    `<script id="${userId}-${props.contentType}-${props.contentDetails.id}" width="${props.contentDetails.embedScaling === "responsive" ? "100%" : props.contentDetails.embedSize}" height="100%" src="https://player.dacast.com/js/player.js?contentId=${userId}-${props.contentType}-${props.contentDetails.id}"  class="dacast-video"></script>`, 'Iframe Embed Code Copied') } }>file_copy_outlined</IconStyle>
                                <Tooltip target="copyEmbedTooltip">Copy to clipboard</Tooltip>
                            </LinkBox>
                        </div>
                        <div className={ClassHalfXsFullMd + "mt2 flex flex-column"}>
                            <LinkBoxLabel>
                                <Text size={14} weight="med">Share Link</Text>
                            </LinkBoxLabel>
                            <LinkBox>
                                <LinkText size={14} weight="reg">{`https://${process.env.BASE_IFRAME_URL}/${props.contentType}/${userId}/${props.contentDetails.id}`}</LinkText>
                                <IconStyle className='pointer' id="copyShareLinkTooltip" onClick={() => { logAmplitudeEvent('share video'); updateClipboard(`https://${process.env.BASE_IFRAME_URL}/${props.contentType}/${userId}/${props.contentDetails.id}`, 'Share Link Copied')} }>file_copy_outlined</IconStyle>
                                <Tooltip target="copyShareLinkTooltip">Copy to clipboard</Tooltip>
                            </LinkBox>
                        </div>
                        <Divider className="col col-12" />
                    </div>
                    {
                        props.contentType === "live" &&
                    <div className="settings col col-12">
                    <Text className="col col-12 mb25" size={20} weight="med">Settings</Text>
                    <div className="col col-12">
                        {
                            userToken.getPrivilege('privilege-recording') &&
                            <div className="mb2">
                                <Toggle label="Live Stream Recording" defaultChecked={contentDetails.recording} onChange={() => setContentDetails({ ...contentDetails, recording: !contentDetails.recording })}></Toggle>
                                <ToggleTextInfo className="mt1">
                                    <Text size={14} weight='reg' color='gray-1'>8 continuous hours recording limit at a time. Live Stream recording turns off after 7 days and can be turned on again.</Text>
                                </ToggleTextInfo>
                            </div>
                        }

                        <div className="mb2 clearfix">
                            <Toggle
                                label="Live Stream Start Countdown"
                                onChange={() => { setLiveStreamCountdownToggle(!liveStreamCountdownToggle) }}
                                defaultChecked={liveStreamCountdownToggle}
                            ></Toggle>
                            <ToggleTextInfo className="mt1">
                                <Text size={14} weight='reg' color='gray-1'>Note that a Paywall can stop this from being displayed.</Text>
                            </ToggleTextInfo>

                            {
                                liveStreamCountdownToggle &&
                                    <div className="col col-12">
                                        <div className='col col-12 sm-col-4 pr1'>
                                            <DateSinglePickerWrapper
                                                id="startDate"
                                                datepickerTitle='Start Date'
                                                date={moment(startDateTimeValue.date)}
                                                callback={(date: string) => {setStartDateTimeValue({...startDateTimeValue, date: date}) }}
                                            />
                                        </div>
                                        <Input
                                            type='time'
                                            className='col col-12 sm-col-4 pl1 pr1'
                                            defaultValue={startDateTimeValue.time}
                                            onChange={(event) =>{setStartDateTimeValue({...startDateTimeValue, time: event.currentTarget.value})} }
                                            disabled={false}
                                            id='promptTime'
                                            label='Prompt Time'
                                            required
                                            pattern="[0-9]{2}:[0-9]{2}"
                                            step='1'
                                        />
                                        <DropdownSingle
                                            className="col col-12 sm-col-4 pl1 "
                                            hasSearch
                                            dropdownTitle='Timezone'
                                            dropdownDefaultSelect={startDateTimeValue.timezone}
                                            id='dropdownTimezone'
                                            callback={(value: string) => {setStartDateTimeValue({...startDateTimeValue, timezone: value.split(' ')[0]})}} 
                                            list={momentTZ.tz.names().reduce((reduced: DropdownListType, item: string) => { return { ...reduced, [item + ' (' + momentTZ.tz(item).format('Z z') + ')']: false } }, {})}
                                        />
                                    </div>
                            }
                        </div>
                        {/* MAYBE V2? 
                            {
                            getPrivilege('privilege-dvr') &&
                            <div className="mb2 clearfix">
                                <Toggle label="30 Minutes Rewind" checked={newLiveDetails.rewind} callback={() => { newLiveDetails.rewind ? setNewLiveDetails({ ...newLiveDetails, rewind: false }) : setConfirmRewindModal(true) }}></Toggle>
                                <ToggleTextInfo className="mt1">
                                    <Text size={14} weight='reg' color='gray-1'>Rewind, pause, and fast-forward to catch back up to the live broadcast for up to 30 minutes. For help setting up please visit the <a href="https://www.dacast.com/support/knowledgebase/" target="_blank" rel="noopener noreferrer">Knowledge Base</a>.</Text>
                                </ToggleTextInfo>
                                {
                                    newLiveDetails.rewind &&
                                        <div className="col col-12 mb2">
                                            <Bubble type='warning' className='my2'>
                                                <BubbleContent>
                                                    <Text weight="reg" size={16}>
                                                        30 Minute Rewind will take 2 hours to take effect after enabling. Please ensure you have Purged your Live Stream before starting your encoder.
                                                    </Text>
                                                </BubbleContent>
                                            </Bubble>
                                            <Button sizeButton="xs" typeButton="secondary" onClick={() => { console.log("free the niples") }}>Purge Live Stream</Button>
                                        </div>
                                }
                            </div>
                        } */}

                    </div>
                </div>
            }
                <Divider className="col col-12" />
                    <div className="thumbnail col col-12">
                        <Text className="col col-12" size={20} weight="med">Images</Text>
                        <Text className="col col-12 pt1" size={14} weight="reg">Upload image assets for your content.</Text>
                        <ImagesContainer className="col col-12 pt2">
                            <ImageContainer className="mr2 xs-mr0 xs-mb25">
                                <div className="flex flex-center">
                                    <Text size={16} weight="med" className="mr1">Splashscreen</Text>
                                    <IconStyle id="splashscreenTooltip">info_outlined</IconStyle>
                                    <Tooltip target="splashscreenTooltip">Displayed before playback and when your content is offline</Tooltip>
                                </div>
                                <ImageArea className="mt2">
                                    <ButtonSection>
                                    {
                                        (splashScreenEnable && props.contentType !== "vod") &&
                                            <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => handleImageDelete("splashscreen") } >Delete</Button>
                                    }
                                        <Button 
                                            className="clearfix right my1 mr1" sizeButton="xs" typeButton="secondary"
                                            onClick={() => {setImageModalTitle("Change Splashscreen");setSelectedImageName(props.contentDetails.splashscreen.url);setImageModalOpen(true)}}>
                                            {
                                                splashScreenEnable ?
                                                    "Change" : "Add"
                                            }
                                        </Button>
                                    </ButtonSection> 
                                    {splashScreenEnable &&<ImageSection> <SelectedImage src={props.contentDetails.splashscreen.url} /></ImageSection>}
                                </ImageArea>
                                <Text size={10} weight="reg" color="gray-3">Minimum 480px x 480px, formats: JPG, PNG, SVG, GIF</Text>
                            </ImageContainer>
                            <ImageContainer className="mr2 xs-mb25 xs-mr0">
                                <div className="flex flex-center">
                                    <Text size={16} weight="med" className="mr1">Thumbnail</Text>
                                    <IconStyle id="thumbnailTooltip">info_outlined</IconStyle>
                                    <Tooltip target="thumbnailTooltip">A small image used in Playlists</Tooltip>
                                </div>
                                <ImageArea className="mt2">
                                    <ButtonSection>
                                    {
                                        (thumbnailEnable && props.contentType !== "vod") &&
                                            <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => handleImageDelete("thumbnail")}>Delete</Button>
                                    }
                                        <Button sizeButton="xs" className="clearfix right m1" typeButton="secondary" onClick={() => {setImageModalTitle("Change Thumbnail");setSelectedImageName(props.contentDetails.thumbnail.url);setImageModalOpen(true)}}>
                                            {
                                                thumbnailEnable  ?
                                                    "Change" : "Add"
                                            }
                                        </Button>
                                    </ButtonSection>
                                    {thumbnailEnable &&<ImageSection> <SelectedImage src={props.contentDetails.thumbnail.url} /></ImageSection> }  
                                </ImageArea>
                                <Text size={10} weight="reg" color="gray-3">Always 160px x 90px, formats: JPG, PNG, SVG, GIF</Text>
                            </ImageContainer>
                            <ImageContainer className="">
                                <div className="flex flex-center">
                                    <Text className="mr1" size={16} weight="med">Poster</Text>  
                                    <IconStyle id="posterTooltip">info_outlined</IconStyle>
                                    <Tooltip target="posterTooltip">A large image that you can use for any purpose</Tooltip>
                                </div>
                                <ImageArea className="mt2">
                                    <ButtonSection>
                                        {
                                            posterEnable && 
                                                <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => handleImageDelete("poster")}>Delete</Button>
                                        }
                                        
                                        <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {setImageModalTitle("Change Poster");setSelectedImageName(props.contentDetails.poster.url);setImageModalOpen(true)}}>
                                            {
                                                posterEnable ?
                                                    "Change" : "Add"
                                            }
                                        </Button>
                                    </ButtonSection>
                                    {posterEnable && <ImageSection> <img height='auto' width="160px" src={props.contentDetails.poster.url} /></ImageSection>}  
                                </ImageArea>
                                <Text size={10} weight="reg" color="gray-3"> Minimum 480px x 480px, formats: JPG, PNG, SVG, GIF</Text>
                            </ImageContainer>
                        </ImagesContainer>
                    </div>
                    <Divider className="col col-12" />
                    {props.contentType === "vod" && 
                    <>
                    <div className="subtitles col col-12">
                        <Text className="col col-12" size={20} weight="med">Subtitles</Text>
                        <Text className="col col-12 pt2" size={14} weight="reg">Add subtitles to improve the accessibility of your content.</Text>
                    </div>
                    {(!props.contentDetails.subtitles || props.contentDetails.subtitles.length === 0) ?
                        <Table className="col col-12" headerBackgroundColor="gray-10" header={disabledSubtitlesTableHeader(setSubtitleModalOpen)} body={disabledSubtitlesTableBody('You currently have no Subtitles')} id="subtitlesTable" />
                        : <Table className="col col-12" headerBackgroundColor="gray-10" header={subtitlesTableHeader(setSubtitleModalOpen)} body={subtitlesTableBody()} id="subtitlesTable" />
                    }
                    </>}
                    <Divider className="col col-12" />
                    <div className="col col-12 advancedVideoLinks">
                        <div onClick={() => setAdvancedLinksExpanded(!advancedLinksExpanded)}>
                            <IconStyle  className="col col-1 pointer">{advancedLinksExpanded ? "expand_less" : "expand_more"}</IconStyle>
                            <Text className="col col-11 pointer" size={20} weight="med">Advanced Video Links</Text>
                        </div>                  
                        <ExpandableContainer className="col col-12" isExpanded={advancedLinksExpanded}>
                            {advancedLinksOptions.filter(item => item.enabled).map((item) => {
                                {
                                    if(item.link && item.link !== ''){
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

                   { (subtitleModalOpen && props.contentType === "vod") &&
                    <Modal id="addSubtitles" opened={subtitleModalOpen === true} toggle={() => setSubtitleModalOpen(false)} size="small" modalTitle="Add Subtitles" hasClose={false}>
                            <ModalContent>
                                <DropdownSingle
                                    hasSearch
                                    className="col col-12"
                                    id="subtitleLanguage"
                                    dropdownTitle="Subtitle Language"
                                    list={Object.keys(languages).reduce((reduced, language) => {return {...reduced, [languages[language].name]: false}}, {})}
                                    dropdownDefaultSelect={uploadedSubtitleFile.languageLongName}
                                    callback={(value: string) => setUploadedSubtitleFile({ ...uploadedSubtitleFile, languageLongName: value, languageShortName: Object.keys(languages).find(l => languages[l].name === value)})}
                                />                                       
                                <input type='file' ref={subtitleBrowseButtonRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBrowse(e)} style={{ display: 'none' }} id='browseButtonSubtitle' />
                                <Button onClick={() => {subtitleBrowseButtonRef.current.click()} } className="mt25" typeButton="secondary" sizeButton="xs">                                    
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
                                        <IconStyle  className="col col-1 pointer">{advancedSubtitleSectionExpanded ? "expand_less" : "expand_more"}</IconStyle>
                                        <Text className="col col-11 pointer" size={16} weight="med">Advanced Settings</Text>
                                    </div>
                                    <ExpandableContainer className="flex my2" isExpanded={advancedSubtitleSectionExpanded}>
                                        <InputCheckbox className='col' id='convertToUtf8Checkbox' label='Convert to UTF-8' defaultChecked={uploadedSubtitleFile.convertToUTF8 ? uploadedSubtitleFile.convertToUTF8 : true} onChange={() => {setUploadedSubtitleFile({...uploadedSubtitleFile, convertToUTF8: !uploadedSubtitleFile.convertToUTF8})}} />
                                        <IconStyle className="ml1" style={{marginTop: 5}} fontSize="small" id="utfTooltip">info_outlined</IconStyle>
                                        <Tooltip target="utfTooltip">Uncheck if you have already converted your file to UTF-8.</Tooltip>
                                    </ExpandableContainer>
                                </div>
                                
                                
                            </ModalContent>
                            <ModalFooter>
                                <Button isLoading={subtitleButtonLoading} onClick={() => {handleSubtitleSubmit()}}  >Add</Button>
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
                    props.contentType==="live" && 
                        <Modal hasClose={false} size="large" modalTitle="Encoder Setup" opened={encoderModalOpen} toggle={() => setEncoderModalOpen(!encoderModalOpen)} >
                            <ModalContent>
                                <div className="col col-12">
                                    <Bubble type='info' className='my2'>
                                        <BubbleContent>
                                            <Text weight="reg" size={16} >
                                                Correct <a href="https://www.dacast.com/support/knowledgebase/live-encoder-configuration/" target="_blank">Encoder Setup</a> is required — <a href='/help'>contact us</a> if you need help.
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
                                            <Text size={14} weight="med">Stream Key</Text>
                                        </LinkBoxLabel>
                                        <LinkBox>
                                            <LinkText size={14} weight="reg">{props.contentDetails.streamKeys[0]}</LinkText>
                                            <IconStyle className='pointer' onClick={() => updateClipboard(props.contentDetails.streamKeys[0], "Copied to clipboard")}>file_copy</IconStyle>
                                        </LinkBox>
                                    </LinkBoxContainer>
                                    <LinkBoxContainer className={ClassHalfXsFullMd + " mb2"}>
                                        <LinkBoxLabel>
                                            <Text size={14} weight="med">Username</Text>
                                        </LinkBoxLabel>
                                        <LinkBox>
                                            <LinkText size={14} weight="reg">{props.contentDetails.username}</LinkText>
                                            <IconStyle className='pointer' onClick={() => updateClipboard(props.contentDetails.username, "Copied to clipboard!")}>file_copy</IconStyle>
                                        </LinkBox>
                                    </LinkBoxContainer>
                                    <LinkBoxContainer className={ClassHalfXsFullMd + " mb2"}>
                                        <LinkBoxLabel>
                                            <Text size={14} weight="med">Password</Text>
                                        </LinkBoxLabel>
                                        <LinkBox>
                                            <LinkText size={14} weight="reg">{props.contentDetails.password}</LinkText>
                                            <IconStyle className='pointer' onClick={() => updateClipboard(props.contentDetails.password, "Copied to clipboard!")}>file_copy</IconStyle>
                                        </LinkBox>
                                    </LinkBoxContainer>
                                    <LinkBoxContainer className={ClassHalfXsFullMd}>
                                        <LinkBoxLabel>
                                            <Text size={14} weight="med">Backup URL</Text>
                                        </LinkBoxLabel>
                                        <LinkBox>
                                            <LinkText size={14} weight="reg">{props.contentDetails.backupPublishURL}</LinkText>
                                            <IconStyle className='pointer' onClick={() => updateClipboard(props.contentDetails.backupPublishURL, "Copied to clipboard")}>file_copy</IconStyle>
                                        </LinkBox>
                                    </LinkBoxContainer>
                                </div>
                                <div className="flex col col-12 mt2">
                                    <IconStyle style={{ marginRight: "10px" }}>info_outlined</IconStyle>
                                    <Text size={14} weight="reg">Need help setting up an encoder? Visit the <a href="https://www.dacast.com/support/knowledgebase/" target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
                                </div>
                            </ModalContent>
                            <ModalFooter className="mt1" >
                                <Button onClick={() => setEncoderModalOpen(false)}>Close</Button>
                            </ModalFooter>
                        </Modal>
                    }

                        <Modal hasClose={false} icon={ stepModalRewind === 1 ? {name:'info_outlined', color: 'yellow'} : {name:'check', color: 'green'} } size="large" modalTitle={stepModalRewind === 1 ? "Is your Encoder turned off?" : "30 Minute Rewind Enabled"} opened={confirmRewindModal} toggle={() => setConfirmRewindModal(!confirmRewindModal)} >
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
               {    JSON.stringify(contentDetails) !== JSON.stringify(props.contentDetails) && 
                    <ButtonContainer>
                        <Button isLoading={buttonLoading} className="mr2" onClick={() => handleSave() }>Save</Button>
                        <Button typeButton="tertiary" onClick={() => {setContentDetails(props.contentDetails);props.showToast("Changes have been discarded", 'fixed', "success")}}>Discard</Button>
                    </ButtonContainer>
                }
                {
                    previewModalOpen && <PreviewModal contentId={userId + '-' + props.contentType + '-' + props.contentDetails.id} toggle={setPreviewModalOpen} isOpened={previewModalOpen} />
                }
                <Prompt when={JSON.stringify(contentDetails) !== JSON.stringify(props.contentDetails)} message='' />
            </React.Fragment>
            
    )

}

const SubtitleFile = styled.div`
    display: flex;
    background-color: ${props => props.theme.colors["gray-10"]};
    height: 32px;
    align-items: center;
    justify-content: space-between;
    max-width: 352px;
    
`

const SubtitleTextContainer = styled.div`
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 352px;
`