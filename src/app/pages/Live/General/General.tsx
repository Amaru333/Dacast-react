import React from 'react';
import { Card } from '../../../../components/Card/Card';
import { Text } from "../../../../components/Typography/Text"
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Toggle } from '../../../../components/Toggle/toggle';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Divider, LinkBoxContainer, LinkBoxLabel, LinkBox, LinkText, ImagesContainer, ButtonContainer, ImageContainer, ImageArea, SelectedImage, ImageSection, ButtonSection, AdvancedLinksContainer, ClassHalfXsFullMd } from '../../../shared/General/GeneralStyle';
import { IconStyle } from '../../../../shared/Common/Icon';
import { ToggleTextInfo } from '../../Settings/Security/SecurityStyle';
import { DateSinglePickerWrapper } from '../../../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownListType } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { LiveDetails } from '../../../redux-flow/store/Live/General/types';
import { ModalFooter, Modal, ModalContent } from '../../../../components/Modal/Modal';
import { InputTags } from '../../../../components/FormsComponents/Input/InputTags';
import { ImageModal } from '../../../shared/General/ImageModal';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { Prompt, useHistory } from 'react-router';
import { updateClipboard } from '../../../utils/utils';
import { Bubble } from '../../../../components/Bubble/Bubble';
import { BubbleContent } from '../../../shared/Security/SecurityStyle';
import { getPrivilege } from '../../../../utils/utils';
import { addTokenToHeader } from '../../../utils/token';
import { LiveGeneralProps } from '../../../containers/Live/General';

var moment = require('moment-timezone');

export const LiveGeneralPage = (props: LiveGeneralProps) => {

    let history = useHistory()

    const {userId} = addTokenToHeader()

    const [imageModalOpen, setImageModalOpen] = React.useState<boolean>(false)
    const [imageModalTitle, setImageModalTitle] = React.useState<string>(null)
    const [encoderModalOpen, setEncoderModalOpen] = React.useState<boolean>(false)
    const [liveStreamCountdownToggle, setLiveStreamCountdownToggle] = React.useState<boolean>(false)
    const [newLiveDetails, setNewLiveDetails] = React.useState<LiveDetails>(props.liveDetails)
    const [advancedLinksExpanded, setAdvancedLinksExpanded] = React.useState<boolean>(false)
    const [selectedImageName, setSelectedImageName] = React.useState<string>(null)
    const [confirmRewindModal, setConfirmRewindModal] = React.useState<boolean>(false)
    const [stepModalRewind, setStepModalRewind] = React.useState<1 | 2>(1)
    const [loadingButton, setLoadingButton] = React.useState<boolean>(false)
    const [uploadedImageFiles, setUploadedImageFiles] = React.useState<any>({splashscreen: null, thumbnail: null, poster: null})

    React.useEffect(() => {
        setNewLiveDetails(props.liveDetails)
    }, [props.liveDetails]);

    React.useEffect(() => {
        setLiveStreamCountdownToggle(newLiveDetails.countdown.enabled);
    }, [newLiveDetails])



    const handleImageModalFunction = () => {
        if (imageModalTitle === "Change Splashscreen") {
            return  'live-splashscreen'
        } else if (imageModalTitle === "Change Thumbnail") {
            return 'live-thumbnail'
        } else if(imageModalTitle === 'Change Poster') {
            return 'live-poster'
        } else {
            return ''
        }
    }

    const liveAdvancedLinksOptions = [
        { id: "splashscreen", label: "Splashscreen", enabled: true, link: props.liveDetails.thumbnail.url },
        { id: "thumbnail", label: "Thumbnail", enabled: true, link: props.liveDetails.thumbnail.url },
        { id: "poster", label: "Poster", enabled: true, link: props.liveDetails.poster.url },
        { id: "embed", label: "Embed Code", enabled: true, link: `<script id="live-${props.liveDetails.id}" width="590" height="431" src="https://player.dacast.com/js/player.js?contentId=live-${props.liveDetails.id}"  class="dacast-video"></script>` },
        { id: "m3u8", label: "M3U8", enabled: getPrivilege('privilege-unsecure-m3u8'), link: 'todo' }
    ]

    let splashScreenEnable = Object.keys(props.liveDetails.splashscreen).length !== 0;
    let thumbnailEnable = Object.keys(props.liveDetails.thumbnail).length !== 0;
    let posterEnable = Object.keys(props.liveDetails.poster).length !== 0;


    return (
        <React.Fragment>
            <Card className="col-12 clearfix">
                <div className="details col col-12">
                    <header className="flex justify-between mb2">
                        <Text size={20} weight="med">Details</Text>
                        <Button onClick={() => setEncoderModalOpen(true)} sizeButton="xs" typeButton="secondary" className="right mb25">Encoder Setup</Button>
                    </header>
                    <Toggle
                        className="col col-12 mb2"
                        defaultChecked={newLiveDetails.streamOnline}
                        onChange={() => setNewLiveDetails({ ...newLiveDetails, streamOnline: !newLiveDetails.streamOnline })}
                        label="Live Stream Online"
                    />
                    <Input
                        className={ClassHalfXsFullMd + "pr2 mb2"}
                        label="Title"
                        value={newLiveDetails.title}
                        onChange={event => setNewLiveDetails({ ...newLiveDetails, ["title"]: event.currentTarget.value })}
                    />
                    <InputTags
                        className={ClassHalfXsFullMd + "mb2"}
                        label="Folders"
                        greyBackground
                        disabled
                        defaultTags={props.liveDetails.folder ? props.liveDetails.folder : []}
                    />
                    <Input
                        className={ClassHalfXsFullMd + "pr2 mb2"}
                        type="textarea"
                        label="Description"
                        value={newLiveDetails.description}
                        onChange={event => setNewLiveDetails({ ...newLiveDetails, ["description"]: event.currentTarget.value })}
                    />
                    <div className={"col col-12 sm-col-3 flex flex-column"}>
                        <LinkBoxLabel>
                            <Text size={14} weight="med">Content ID</Text>
                        </LinkBoxLabel>
                        <LinkBox>
                            <LinkText size={14} weight="reg">{props.liveDetails.id}</LinkText>
                            <IconStyle className='pointer' id="copyCOntentIdTooltip" onClick={() => updateClipboard(props.liveDetails.id, 'Content ID Copied')}>file_copy_outlined</IconStyle>
                            <Tooltip target="copyCOntentIdTooltip">Copy to clipboard</Tooltip>
                        </LinkBox>
                    </div>
                </div>
                <Divider className="col col-12" />
                <div className='col col-12'>
                    <Text className='col col-12' size={20} weight='med'>Sharing</Text>
                    <Text className='pt2 col col-12' size={14}>The Embed Code can add content to your website and the Share Link can be shared on social media.</Text>

                    <div className={ClassHalfXsFullMd + "mt2 pr2 flex flex-column"} >
                        <LinkBoxLabel>
                            <Text size={14} weight="med">Embed Code</Text>
                        </LinkBoxLabel>
                        <LinkBox>
                            <LinkText size={14} weight="reg">{`<iframe src="https://iframe.dacast.com/vod/${userId}/${props.liveDetails.id}" width="590" height="431" frameborder="0" scrolling="no" allow="autoplay" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>`}</LinkText>
                            <IconStyle className='pointer' id="copyEmbedTooltip" onClick={() => updateClipboard(`<iframe src="https://iframe.dacast.com/vod/${userId}/${props.liveDetails.id}" width="590" height="431" frameborder="0" scrolling="no" allow="autoplay" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>`, "Embed Code Copied")}>file_copy_outlined</IconStyle>
                            <Tooltip target="copyEmbedTooltip">Copy to clipboard</Tooltip>
                        </LinkBox>
                    </div>
                    <div className={ClassHalfXsFullMd + "mt2 flex flex-column"}>
                        <LinkBoxLabel>
                            <Text size={14} weight="med">Share Link</Text>
                        </LinkBoxLabel>
                        <LinkBox>
                            <LinkText size={14} weight="reg">{`https://iframe.dacast.com/live/${userId}/${props.liveDetails.id}`}</LinkText>
                            <IconStyle className='pointer' id="copyShareLinkTooltip" onClick={() => updateClipboard(`https://iframe.dacast.com/live/${userId}/${props.liveDetails.id}`, "Share Link Copied")}>file_copy_outlined</IconStyle>
                            <Tooltip target="copyShareLinkTooltip">Copy to clipboard</Tooltip>
                        </LinkBox>
                    </div>
                    <Divider className="col col-12" />
                </div>
                <div className="settings col col-12">
                    <Text className="col col-12 mb25" size={20} weight="med">Settings</Text>
                    <div className="col col-12">
                        {
                            getPrivilege('privilege-recording') &&
                            <div className="mb2">
                                <Toggle label="Live Stream Recording" defaultChecked={newLiveDetails.recording} onChange={() => setNewLiveDetails({ ...newLiveDetails, recording: !newLiveDetails.recording })}></Toggle>
                                <ToggleTextInfo className="mt1">
                                    <Text size={14} weight='reg' color='gray-1'>8 continuous hours recording limit at a time. Live Stream recording turns off after 7 days and can be turned on again.</Text>
                                </ToggleTextInfo>
                            </div>
                        }

                        <div className="mb2 clearfix">
                            <Toggle
                                label="Live Stream Start Countdown"
                                onChange={() => { setLiveStreamCountdownToggle(!liveStreamCountdownToggle); setNewLiveDetails({ ...newLiveDetails, countdown: { ...newLiveDetails.countdown, enabled: !newLiveDetails.countdown.enabled } }) }}
                                defaultChecked={newLiveDetails.countdown.enabled}
                            ></Toggle>
                            <ToggleTextInfo className="mt1">
                                <Text size={14} weight='reg' color='gray-1'>Note that a Paywall can stop this from being displayed.</Text>
                            </ToggleTextInfo>

                            {
                                liveStreamCountdownToggle ?
                                    <div className="col col-12">
                                        <div
                                            className='col col-12 sm-col-4 pr1 mt1'
                                        >
                                            <DateSinglePickerWrapper
                                                className='mt25'
                                                id="startDate"
                                            />
                                        </div>
                                        <Input
                                            type='time'
                                            className='col col-12 sm-col-4 pl1 pr1'
                                            defaultValue={props.liveDetails.countdown.startTime.toString()}
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
                                            defaultValue={props.liveDetails.countdown.timezone}
                                            id='dropdownTimezone'
                                            list={moment.tz.names().reduce((reduced: DropdownListType, item: string) => { return { ...reduced, [item + ' (' + moment.tz(item).format('Z z') + ')']: false } }, {})}
                                        />
                                    </div> : null
                            }
                        </div>
                        {
                            getPrivilege('privilege-dvr') &&
                            <div className="mb2 clearfix">
                                <Toggle label="30 Minutes Rewind" checked={newLiveDetails.rewind ? true : false} callback={() => { newLiveDetails.rewind ? setNewLiveDetails({ ...newLiveDetails, rewind: false }) : setConfirmRewindModal(true) }}></Toggle>
                                <ToggleTextInfo className="mt1">
                                    <Text size={14} weight='reg' color='gray-1'>Rewind, pause, and fast-forward to catch back up to the live broadcast for up to 30 minutes. For help setting up please visit the <a href="https://www.dacast.com/support/knowledgebase/" target="_blank" rel="noopener noreferrer">Knowledge Base</a>.</Text>
                                </ToggleTextInfo>
                                {
                                    newLiveDetails.rewind ?
                                        <div className="col col-12 mb2">
                                            <Bubble type='warning' className='my2'>
                                                <BubbleContent>
                                                    <Text weight="reg" size={16}>
                                                        30 Minute Rewind will take 2 hours to take effect after enabling. Please ensure you have Purged your Live Stream before starting your encoder.
                                                    </Text>
                                                </BubbleContent>
                                            </Bubble>
                                            <Button sizeButton="xs" typeButton="secondary" onClick={() => { console.log("free the niples") }}>Purge Live Stream</Button>
                                        </div> :
                                        null
                                }
                            </div>
                        }

                    </div>
                </div>
                <Divider className="col col-12" />
                <div className="thumbnail col col-12">
                    <Text className="col col-12" size={20} weight="med">Images</Text>
                    <Text className="col col-12 pt1" size={14} weight="reg">Splashscreens show before the content plays, Thumbnails are shown in Playlists and Posters can be retrieved and used anywhere.</Text>
                    <ImagesContainer className="col col-12 pt2 flex">
                        <ImageContainer className="mr2 xs-mr0 xs-mb25">
                            <div className="flex flex-center">
                                <Text size={16} weight="med" className="mr1">Splashscreen</Text>
                                <IconStyle id="splashscreenTooltip">info_outlined</IconStyle>
                                <Tooltip target="splashscreenTooltip">Splashscreen Tooltip</Tooltip>
                            </div>
                            <ImageArea className="mt2">
                                <ButtonSection>
                                    {
                                        splashScreenEnable || uploadedImageFiles.splashscreen ?
                                            <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {props.deleteFile(props.liveDetails.id, props.liveDetails.splashscreen.targetID) } } >Delete</Button> : null
                                    }
                                    <Button className="clearfix right my1 mr1" sizeButton="xs" typeButton="secondary"
                                        onClick={() => { setImageModalTitle("Change Splashscreen"); setSelectedImageName(props.liveDetails.splashscreen.url);setImageModalOpen(true) }}>
                                        {
                                            splashScreenEnable || uploadedImageFiles.splashscreen ?
                                                "Change" : "Add"
                                        }
                                    </Button>
                                </ButtonSection>
                                {(splashScreenEnable || uploadedImageFiles.splashscreen) && <ImageSection><SelectedImage src={uploadedImageFiles.splashscreen ? uploadedImageFiles.splashscreen : props.liveDetails.splashscreen.url} /></ImageSection>}
                            </ImageArea>
                            <Text size={10} weight="reg" color="gray-3">Minimum 480px x 480px, formats: JPG, PNG, SVG, GIF</Text>
                        </ImageContainer>
                        <ImageContainer className="mr2 xs-mb25 xs-mr0">
                            <div className="flex flex-center">
                                <Text size={16} weight="med" className="mr1">Thumbnail</Text>
                                <IconStyle id="thumbnailTooltip">info_outlined</IconStyle>
                                <Tooltip target="thumbnailTooltip">Thumbnail Tooltip</Tooltip>
                            </div>
                            <ImageArea className="mt2">
                                <ButtonSection>
                                    {
                                        thumbnailEnable || uploadedImageFiles.thumbnail ?
                                            <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => { props.deleteFile(props.liveDetails.id, props.liveDetails.thumbnail.targetID)}}>Delete</Button> : null
                                    }
                                    <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => { setSelectedImageName(props.liveDetails.thumbnail.url);setImageModalTitle("Change Thumbnail"); setImageModalOpen(true) }}>
                                        {
                                            thumbnailEnable || uploadedImageFiles.thumbnail ?
                                                "Change" : "Add"
                                        }
                                    </Button>
                                </ButtonSection>
                                { (thumbnailEnable || uploadedImageFiles.thumbnail) && <ImageSection> <SelectedImage src={uploadedImageFiles.thumbnail ? uploadedImageFiles.thumbnail : props.liveDetails.thumbnail.url} /></ImageSection>}
                            </ImageArea>
                            <Text size={10} weight="reg" color="gray-3">Always 160px x 90px, formats: JPG, PNG, SVG, GIF</Text>
                        </ImageContainer>
                        <ImageContainer>
                            <div className="flex flex-center">
                                <Text size={16} weight="med" className="mr1">Poster</Text>
                                <IconStyle id="posterTooltip">info_outlined</IconStyle>
                                <Tooltip target="posterTooltip">Poster Tooltip</Tooltip>
                            </div>
                            <ImageArea className="mt2">
                                <ButtonSection>
                                    { posterEnable || uploadedImageFiles.poster && <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {props.deleteFile(props.liveDetails.id, props.liveDetails.poster.targetID) }}>Delete</Button> }
                                    <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => { setSelectedImageName(props.liveDetails.poster.url); setImageModalTitle("Change Poster"); setImageModalOpen(true) }}>
                                        {
                                            posterEnable || uploadedImageFiles.poster ?
                                                "Change" : "Add"
                                        }
                                    </Button>
                                </ButtonSection>
                                {(posterEnable || uploadedImageFiles.poster) && <ImageSection> <SelectedImage src={uploadedImageFiles.poster ? uploadedImageFiles.poster : props.liveDetails.poster.url} /></ImageSection>}
                            </ImageArea>
                            <Text size={10} weight="reg" color="gray-3">Minimum 480px x 480px, formats: JPG, PNG, SVG, GIF</Text>
                        </ImageContainer>
                    </ImagesContainer>
                </div>
                <Divider className="col col-12" />
                <div className="col col-12 advancedVideoLinks">
                    <div className="mb2 clearfix" onClick={() => setAdvancedLinksExpanded(!advancedLinksExpanded)}>
                        <IconStyle className="col col-1">{advancedLinksExpanded ? "expand_less" : "expand_more"}</IconStyle>
                        <Text className="col col-11" size={20} weight="med">Advanced Video Links</Text>
                    </div>
                    <AdvancedLinksContainer className="col col-12" isExpanded={advancedLinksExpanded}>
                        {liveAdvancedLinksOptions.filter(item => item.enabled).map((item) => {
                            {
                                if(item.link && item.link !== ''){
                                    return (
                                        <LinkBoxContainer key={item.id} className={ClassHalfXsFullMd + "mb2"}>
                                            <LinkBoxLabel>
                                                <Text size={14} weight="med">{item.label}</Text>
                                            </LinkBoxLabel>
                                            <LinkBox>
                                                <LinkText size={14} weight="reg">{item.link}</LinkText>
                                                <IconStyle className='pointer' id={item.id} onClick={() => updateClipboard('', `${item.label} Link Copied`)}>file_copy_outlined</IconStyle>
                                                <Tooltip target={item.id}>Copy to clipboard</Tooltip>
                                            </LinkBox>
                                        </LinkBoxContainer>
                                    )
                                }
                            }
                        })}
                    </AdvancedLinksContainer>
                </div>

                {
                    imageModalOpen && <ImageModal  
                        imageFileName={selectedImageName} 
                        uploadUrl={props.liveDetails.uploadurl} 
                        getUploadUrl={props.getUploadUrl} 
                        contentId={props.liveDetails.id} 
                        contentType='live'
                        imageType={handleImageModalFunction()} 
                        toggle={() => setImageModalOpen(false)} 
                        opened={imageModalOpen === true} 
                        submit={props.uploadFile} 
                        title={imageModalTitle}
                        uploadedImageFiles={uploadedImageFiles}
                        setUploadedImageFiles={setUploadedImageFiles}
                    />
                }

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
                                    <Text size={14} weight="med">Login</Text>
                                </LinkBoxLabel>
                                <LinkBox>
                                    <LinkText size={14} weight="reg">{props.liveDetails.username}</LinkText>
                                    <IconStyle className='pointer' onClick={() => updateClipboard(props.liveDetails.username, "Copied to clipboard!")}>file_copy</IconStyle>
                                </LinkBox>
                            </LinkBoxContainer>
                            <LinkBoxContainer className={ClassHalfXsFullMd + " mb2"}>
                                <LinkBoxLabel>
                                    <Text size={14} weight="med">Password</Text>
                                </LinkBoxLabel>
                                <LinkBox>
                                    <LinkText size={14} weight="reg">{props.liveDetails.password}</LinkText>
                                    <IconStyle className='pointer' onClick={() => updateClipboard(props.liveDetails.password, "Copied to clipboard!")}>file_copy</IconStyle>
                                </LinkBox>
                            </LinkBoxContainer>
                            <LinkBoxContainer className={ClassHalfXsFullMd + " mb2"}>
                                <LinkBoxLabel>
                                    <Text size={14} weight="med">Stream URL</Text>
                                </LinkBoxLabel>
                                <LinkBox>
                                    <LinkText size={14} weight="reg">{props.liveDetails.primaryPublishURL}</LinkText>
                                    <IconStyle className='pointer' onClick={() => updateClipboard(props.liveDetails.primaryPublishURL, "Copied to clipboard")}>file_copy</IconStyle>
                                </LinkBox>
                            </LinkBoxContainer>
                            <LinkBoxContainer className={ClassHalfXsFullMd + " mb2"}>
                                <LinkBoxLabel>
                                    <Text size={14} weight="med">Stream Name</Text>
                                </LinkBoxLabel>
                                <LinkBox>
                                    <LinkText size={14} weight="reg">{props.liveDetails.streamKeys[0]}</LinkText>
                                    <IconStyle className='pointer' onClick={() => updateClipboard(props.liveDetails.streamKeys[0], "Copied to clipboard")}>file_copy</IconStyle>
                                </LinkBox>
                            </LinkBoxContainer>
                            <LinkBoxContainer className={ClassHalfXsFullMd}>
                                <LinkBoxLabel>
                                    <Text size={14} weight="med">Backup URL</Text>
                                </LinkBoxLabel>
                                <LinkBox>
                                    <LinkText size={14} weight="reg">{props.liveDetails.backupPublishURL}</LinkText>
                                    <IconStyle className='pointer' onClick={() => updateClipboard(props.liveDetails.backupPublishURL, "Copied to clipboard")}>file_copy</IconStyle>
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
                                <Button onClick={() => { setNewLiveDetails({ ...newLiveDetails, rewind: !newLiveDetails.rewind }); setConfirmRewindModal(false); setStepModalRewind(1) }}>Confirm</Button>
                            </ModalFooter>
                        </>
                    }


                </Modal>

            </Card>
            <ButtonContainer>
                <Button className="mr2" isLoading={loadingButton} type="button" onClick={() =>  {setLoadingButton(true); props.saveLiveDetails(newLiveDetails, () => setLoadingButton(false)) }  }>Save</Button>
                <Button typeButton="secondary" onClick={() => setNewLiveDetails(props.liveDetails)}>Discard</Button>
            </ButtonContainer>
            <Prompt when={JSON.stringify(newLiveDetails) !== JSON.stringify(props.liveDetails)} message='' />
        </React.Fragment>
    )
}