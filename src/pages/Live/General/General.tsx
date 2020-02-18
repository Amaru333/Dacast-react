import React from 'react';
import { Card } from '../../../components/Card/Card';
import { Text } from "../../../components/Typography/Text"
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Toggle } from '../../../components/Toggle/toggle';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { Divider, LinkBoxContainer, LinkBoxLabel, LinkBox, LinkText, IconButton, ImagesContainer, ButtonContainer, ImageContainer, ImageArea, SelectedImage, ImageSection, ButtonSection, AdvancedLinksContainer } from '../../../shared/General/GeneralStyle';
import { Icon } from '@material-ui/core';
import { ToggleTextInfo } from '../../Settings/Security/SecurityStyle';
import { DateSinglePicker } from '../../../components/FormsComponents/Datepicker/DateSinglePicker';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownListType } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { LiveDetails } from '../../../redux-flow/store/Live/General/types';
import { ModalFooter, Modal, ModalContent } from '../../../components/Modal/Modal';
import { InputTags } from '../../../components/FormsComponents/Input/InputTags';
import { ImageModal } from '../../../shared/General/ImageModal';

interface LiveGeneralComponentProps {
    liveDetails: LiveDetails;
    saveLiveDetails: Function;
    changeLiveThumbnail: Function;
    changeLiveSplashscreen: Function;
    changeLivePoster: Function;
}

var moment = require('moment-timezone');

export const LiveGeneralPage = (props: LiveGeneralComponentProps) => {

    const [imageModalOpen, setImageModalOpen] = React.useState<boolean>(false)
    const [imageModalTitle, setImageModalTitle] = React.useState<string>(null)
    const [encoderModalOpen, setEncoderModalOpen] = React.useState<boolean>(false)
    const [liveStreamCountdownToggle, setLiveStreamCountdownToggle] = React.useState<boolean>(false)
    const [newLiveDetails, setNewLiveDetails] = React.useState<LiveDetails>(props.liveDetails)
    const [advancedLinksExpanded, setAdvancedLinksExpanded] = React.useState<boolean>(false)

    React.useEffect(() => {
        setNewLiveDetails(props.liveDetails)
    }, [props.liveDetails]);

    React.useEffect(() => {
        setLiveStreamCountdownToggle(newLiveDetails.countdown.enabled);
    }, [newLiveDetails])

    const copyKey = (value: string) => {
        var textArea = document.createElement("textarea");
        textArea.value = value;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();
    }

    const handleImageModalFunction = () => {
        if (imageModalTitle === "Change Splashscreen") {
            return  props.changeLiveSplashscreen()
        } else if (imageModalTitle === "Change Thumbnail") {
            return props.changeLiveThumbnail()
        } else {
            return props.changeLivePoster()
        }
    }

    const liveAdvancedLinksOptions = [
        { id: "splashscreen", label: "Splashscreen" },
        { id: "thumbnail", label: "Thumbnail" },
        { id: "poster", label: "Poster" },
        { id: "embed", label: "Embed Code" },
        { id: "m3u8", label: "M3U8" }
    ]

    return (
        <React.Fragment>
            <Button onClick={() => setEncoderModalOpen(true)} sizeButton="xs" typeButton="secondary" className="right mb25">Encoder Setup</Button>
            <Card className="col-12 clearfix">
                <div className="details col col-12">
                    <header className="flex justify-between mb2">
                        <Text size={20} weight="med">Details</Text>
                    </header>
                    <Toggle
                        className="col col-12 pb2"
                        defaultChecked={newLiveDetails.streamOnline}
                        onChange={() => setNewLiveDetails({...newLiveDetails, streamOnline: !newLiveDetails.streamOnline})}
                        label="Live Stream Online"
                    />
                    <Input
                        className="col col-6 pr2"
                        label="Title"
                        value={newLiveDetails.title}
                        onChange={event => setNewLiveDetails({ ...newLiveDetails, ["title"]: event.currentTarget.value })}
                    />
                    <div className="col col-6 flex flex-column">
                        <LinkBoxLabel>
                            <Text size={14} weight="med">Embed Code</Text>
                        </LinkBoxLabel>
                        <LinkBox>
                            <LinkText size={14} weight="reg">&lt;iframe src="//iframe.streamingasaservice.net&gt;</LinkText>
                            <IconButton onClick={() => copyKey("embed code here")}><Icon>file_copy_outlined</Icon></IconButton>
                        </LinkBox>
                    </div>
                    <Input
                        className="col col-6 pr2 pt2"
                        label="Description"
                        value={newLiveDetails.description}
                        onChange={event => setNewLiveDetails({ ...newLiveDetails, ["description"]: event.currentTarget.value })}
                    />
                    <InputTags
                        className="col col-6 pt2"
                        label="Folders"
                        placeholder="Type folder name"
                    />
                </div>
                <Divider className="col col-12" />
                <div className="thumbnail col col-12">
                    <Text className="col col-12" size={20} weight="med">Images</Text>
                    <Text className="col col-12 pt1" size={14} weight="reg">Upload image assets for your content.</Text>
                    <ImagesContainer className="col col-12 pt2 flex">
                        <ImageContainer className="mr2">
                            <div className="flex flex-center">
                                <Text size={16} weight="med" className="mr1">Splashscreen</Text>
                                <Icon>info_outlined</Icon>
                            </div>
                            <ImageArea className="mt2">
                                <ButtonSection>
                                {
                                    props.liveDetails.splashscreen ?
                                    <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {}}>Delete</Button> : null
                                }
                                <Button className="clearfix right my1 mr1" sizeButton="xs" typeButton="secondary"
                                onClick={() => {setImageModalTitle("Change Splashscreen");setImageModalOpen(true)}}>
                                        {
                                            props.liveDetails.splashscreen ?
                                            "Change" : "Add"
                                        }
                                    </Button>
                                </ButtonSection>  
                                <ImageSection><SelectedImage src={props.liveDetails.splashscreen} /></ImageSection>
                            </ImageArea>
                            <Text size={10} weight="reg" color="gray-3">Minimum 480px x 480px, formats: JPG, PNG, SVG, GIF</Text>
                        </ImageContainer>
                        <ImageContainer className="mr2">
                            <div className="flex flex-center">
                                <Text size={16} weight="med" className="mr1">Thumbnail</Text>  <Icon>info_outlined</Icon>
                            </div>
                            <ImageArea className="mt2">
                                <ButtonSection>
                                    {
                                        props.liveDetails.thumbnail ?
                                        <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {}}>Delete</Button> : null
                                    }
                                    <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {setImageModalTitle("Change Thumbnail");setImageModalOpen(true)}}>
                                    {
                                        props.liveDetails.thumbnail ?
                                        "Change" : "Add"
                                    }
                                    </Button>
                                </ButtonSection> 
                                <ImageSection> <SelectedImage src={props.liveDetails.thumbnail} /></ImageSection> 
                            </ImageArea>
                            <Text size={10} weight="reg" color="gray-3">Always 160px x 90px, formats: JPG, PNG, SVG, GIF</Text>
                        </ImageContainer>
                        <ImageContainer>
                            <div className="flex flex-center">
                                <Text className="mr1" size={16} weight="med">Poster</Text>  <Icon>info_outlined</Icon>
                            </div>
                            <ImageArea className="mt2">
                                <ButtonSection>
                                    {
                                        props.liveDetails.poster ?
                                        <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {}}>Delete</Button> : null
                                    }
                                    <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {setImageModalTitle("Change Poster");setImageModalOpen(true)}}>
                                    {
                                        props.liveDetails.poster ?
                                        "Change" : "Add"
                                    }
                                    </Button>
                                </ButtonSection>
                                <ImageSection> <SelectedImage src={props.liveDetails.poster} /></ImageSection> 
                            </ImageArea>
                            <Text size={10} weight="reg" color="gray-3">Minimum 480px x 480px, formats: JPG, PNG, SVG, GIF</Text>
                        </ImageContainer>
                    </ImagesContainer>
                </div>
                <Divider className="col col-12" />

                <div className="settings col col-12">
                    <Text className="col col-12 mb25" size={20} weight="med">Settings</Text>
                    <div className="col col-12">
                        <Toggle label="Live Stream Recording" defaultChecked={newLiveDetails.recording} onChange={() => setNewLiveDetails({...newLiveDetails, recording: !newLiveDetails.recording})}></Toggle>
                        <ToggleTextInfo className="mt1">
                            <Text size={14} weight='reg' color='gray-1'>8 continuous hours recording limit at a time. Live Stream recording turns off after 7 days and can be turned on again.</Text>
                        </ToggleTextInfo>
                        <div>
                            <Toggle
                                label="Live Stream Start Countdown" 
                                onChange={() => {setLiveStreamCountdownToggle(!liveStreamCountdownToggle);setNewLiveDetails({...newLiveDetails, countdown: {...newLiveDetails.countdown, enabled: !newLiveDetails.countdown.enabled}})}}
                                defaultChecked={newLiveDetails.countdown.enabled}
                            ></Toggle>
                            <ToggleTextInfo className="mt1">
                                <Text size={14} weight='reg' color='gray-1'>Note that a Paywall can stop this from being displayed.</Text>
                            </ToggleTextInfo>
                    
                            {
                                liveStreamCountdownToggle ?

                                    <div className="col col-12">
                                        <div 
                                            className='col col-4 md-col-3 mr2'
                                        >
                                            <DateSinglePicker 
                                                className='mt25'
                                                id="startDate"
                                            />
                                        </div>
                                        <Input 
                                            type='time' 
                                            className='col col-3 md-col-2 mb1 mr1'
                                            defaultValue={props.liveDetails.countdown.startTime}
                                            disabled={false} 
                                            id='promptTime' 
                                            label='Prompt Time' 
                                            required
                                            pattern="[0-9]{2}:[0-9]{2}"
                                            step='1'
                                        />
                                        <DropdownSingle 
                                            className="md-col md-col-6 p1"
                                            hasSearch
                                            dropdownTitle='Timezone'
                                            defaultValue={props.liveDetails.countdown.timezone}
                                            id='dropdownTimezone'
                                            list={moment.tz.names().reduce((reduced: DropdownListType, item: string) => {return {...reduced, [item + ' (' + moment.tz(item).format('Z z') + ')']: false}}, {})}
                                        />
                                    </div> : null
                            }
                        </div>    
                    </div> 
                </div>
                <Divider className="col col-12" />
                <div className="col col-12 advancedVideoLinks">
                    <div onClick={() => setAdvancedLinksExpanded(!advancedLinksExpanded)}>
                        <Icon className="col col-1">{advancedLinksExpanded ? "expand_less" : "expand_more"}</Icon>
                        <Text className="col col-11" size={20} weight="med">Advanced Video Links</Text>
                    </div>    
                    <AdvancedLinksContainer className="col col-12" isExpanded={advancedLinksExpanded}>
                        {liveAdvancedLinksOptions.map((item) => {
                            return (
                                <LinkBoxContainer className="col col-6">
                                    <LinkBoxLabel>
                                        <Text size={14} weight="med">{item.label}</Text>
                                    </LinkBoxLabel>
                                    <LinkBox>
                                        <Text size={14} weight="reg">https://view.vzaar.com/20929875/{item.id}</Text>
                                        <IconButton onClick={() => copyKey("embed code here")}><Icon>file_copy_outlined</Icon></IconButton>
                                    </LinkBox>
                                </LinkBoxContainer>

                            )
                        })}
                    </AdvancedLinksContainer>
                </div>
                <ImageModal toggle={() => setImageModalOpen(false)} opened={imageModalOpen === true} submit={handleImageModalFunction} title={imageModalTitle} />

                <Modal size="large" title="Encoder Setup" opened={encoderModalOpen} toggle={() => setEncoderModalOpen(!encoderModalOpen)} >
                    <ModalContent>
                        <Text size={14} weight="reg">Some information about this and how you enter it into the encoder blah and this is.</Text>
                        <div className="col col-12">
                            <LinkBoxContainer className="col col-6">
                                <LinkBoxLabel>
                                    <Text size={14} weight="med">Login</Text>
                                </LinkBoxLabel>
                                <LinkBox>
                                    <LinkText size={14} weight="reg"></LinkText>
                                    <IconButton onClick={() => copyKey("JS here")}><Icon>file_copy</Icon></IconButton>
                                </LinkBox>
                            </LinkBoxContainer>
                            <LinkBoxContainer className="col col-6">
                                <LinkBoxLabel>
                                    <Text size={14} weight="med">Password</Text>
                                </LinkBoxLabel>
                                <LinkBox>
                                    <LinkText size={14} weight="reg"></LinkText>
                                    <IconButton onClick={() => copyKey("JS here")}><Icon>file_copy</Icon></IconButton>
                                </LinkBox>
                            </LinkBoxContainer>
                            <LinkBoxContainer className="col col-6">
                                <LinkBoxLabel>
                                    <Text size={14} weight="med">Stream URL</Text>
                                </LinkBoxLabel>
                                <LinkBox>
                                    <LinkText size={14} weight="reg"></LinkText>
                                    <IconButton onClick={() => copyKey("JS here")}><Icon>file_copy</Icon></IconButton>
                                </LinkBox>
                            </LinkBoxContainer>
                            <LinkBoxContainer className="col col-6">
                                <LinkBoxLabel>
                                    <Text size={14} weight="med">Stream Name</Text>
                                </LinkBoxLabel>
                                <LinkBox>
                                    <LinkText size={14} weight="reg"></LinkText>
                                    <IconButton onClick={() => copyKey("JS here")}><Icon>file_copy</Icon></IconButton>
                                </LinkBox>
                            </LinkBoxContainer>
                            <LinkBoxContainer className="col col-6">
                                <LinkBoxLabel>
                                    <Text size={14} weight="med">Backup URL</Text>
                                </LinkBoxLabel>
                                <LinkBox>
                                    <LinkText size={14} weight="reg"></LinkText>
                                    <IconButton onClick={() => copyKey("JS here")}><Icon>file_copy</Icon></IconButton>
                                </LinkBox>
                            </LinkBoxContainer>   
                        </div>
                        <div className="flex col col-12 mt2 mb25">
                            <Icon style={{marginRight: "10px"}}>info_outlined</Icon>
                            <Text  size={14} weight="reg">Need help setting up an encoder Visit the <a href="https://www.dacast.com/support/knowledgebase/" target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
                        </div>
                    </ModalContent>
                    <ModalFooter>
                        <Button onClick={() => setEncoderModalOpen(false)}>Close</Button>
                        <Button typeButton="tertiary">Visit Knowledge Base</Button>
                    </ModalFooter>
                </Modal>

            </Card>
            <ButtonContainer>
                <Button className="mr2" type="button" onClick={() => props.saveLiveDetails(newLiveDetails)}>Save</Button>
                <Button typeButton="secondary" onClick={() => setNewLiveDetails(props.liveDetails)}>Discard</Button>
            </ButtonContainer>
        </React.Fragment>
    )
}