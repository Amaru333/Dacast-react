import React from 'react';
import { Card } from '../../../components/Card/Card';
import { Text } from "../../../components/Typography/Text"
import { Toggle } from '../../../components/Toggle/toggle';
import { Input } from '../../../components/FormsComponents/Input/Input';
import styled from 'styled-components';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Table } from '../../../components/Table/Table';
import { Icon } from '@material-ui/core';
import { Modal, ModalContent, ModalFooter } from '../../../components/Modal/Modal';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { ImageModal } from '../../../shared/General/ImageModal';
import { VodDetails, SubtitleInfo } from '../../../redux-flow/store/VOD/General/types';
import { Divider, LinkBoxContainer, LinkBoxLabel, LinkBox, LinkText, IconButton, ButtonContainer, ImagesContainer, ImageContainer, ImageArea, ImageSection, SelectedImage, ButtonSection, AdvancedLinksContainer } from "../../../shared/General/GeneralStyle"
import { InputTags } from '../../../components/FormsComponents/Input/InputTags';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { IconContainer, ActionIcon } from '../../../shared/ActionIconStyle'

interface GeneralComponentProps {
    vodDetails: VodDetails;
    editVodDetails: Function;
    addVodSubtitle: Function;
    editVodSubtitle: Function;
    deleteVodSubtitle: Function;
    changeVodThumbnail: Function;
    changeVodSplashscreen: Function;
    changeVodPoster: Function;
}

const subtitlesTableHeader = (setSubtitleModalOpen: Function) => {
    return [
        <Text size={14} weight="med">Subtitles</Text>,
        <Text size={14} weight="med">Language</Text>,
        <Button onClick={() => setSubtitleModalOpen(true)} className="right mr2" sizeButton="xs" typeButton="secondary">Create Subtitle</Button>
    ]
};

const editSubtitle = (subtitle: SubtitleInfo, setSelectedSubtitle: Function, setSubtitleModalOpen: Function, setUploadedSubtitleFile: Function) => {
    setSelectedSubtitle(subtitle);
    setUploadedSubtitleFile(subtitle)
    setSubtitleModalOpen(true)
}

const subtitlesTableBody = (props: GeneralComponentProps, vodDetails: VodDetails, setSelectedSubtitle: Function, setSubtitleModalOpen: Function, setUploadedSubtitleFile: Function) => {
    return vodDetails.subtitles.map((value, key) => {
        return [
            <Text key={"generalPage_subtitles_" + value.fileName + key} size={14} weight="reg">{value.fileName}</Text>,
            <Text key={"generalPage_subtitles_" + value.language + key} size={14} weight="reg">{value.language}</Text>,
            <IconContainer key={"generalPage_subtitles_actionIcons" + value.fileName + key} className="iconAction">
                <ActionIcon id={"downloadTooltip" + key}><Icon>get_app</Icon></ActionIcon>
                <Tooltip target={"downloadTooltip" + key}></Tooltip>
                <ActionIcon><Icon onClick={() => props.deleteVodSubtitle(value)}>delete</Icon></ActionIcon>
                <ActionIcon><Icon onClick={() => editSubtitle(value, setSelectedSubtitle, setSubtitleModalOpen, setUploadedSubtitleFile)}>edit</Icon></ActionIcon>
                
            </IconContainer>
        ]
    })
};

const disabledSubtitlesTableHeader = (setSubtitleModalOpen: Function) => {
    return [
        <span key={'disabledTableHeader'}></span>,
        <Button onClick={() => setSubtitleModalOpen(true)} className="right mr2" sizeButton="xs" typeButton="secondary">Create Subtitle</Button>
    ]
}

const disabledSubtitlesTableBody = (text: string) => {
    return [[
        <span key={'disabledTableBody'}></span>,
        <div className=' center'><Text key={text}  size={14} weight='reg' color='gray-3' >{text}</Text></div>
    ]]
}



const copyKey = (value: string) => {
    var textArea = document.createElement("textarea");
    textArea.value = value;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
}

const handleSubtitleSubmit = (props: GeneralComponentProps, setSubtitleModalOpen: Function, data: SubtitleInfo, setUploadedSubtitleFile: Function, selectedSubtitle: SubtitleInfo, emptySubtitle: SubtitleInfo) => {
    if (selectedSubtitle.id === emptySubtitle.id && selectedSubtitle.fileName === emptySubtitle.fileName) {
        props.addVodSubtitle(data);
    } else {
        props.editVodSubtitle(data)
    }
    setUploadedSubtitleFile({ fileName: "", language: "" })
    setSubtitleModalOpen(false);
}

export const GeneralPage = (props: GeneralComponentProps) => {

    const emptySubtitle = { id: "", fileName: "", language: "" }

    const [advancedVideoLinksExpanded, setAdvancedVideoLinksExpanded] = React.useState<boolean>(false)
    const [subtitleModalOpen, setSubtitleModalOpen] = React.useState<boolean>(false)
    const [imageModalOpen, setImageModalOpen] = React.useState<boolean>(false)
    const [videoIsOnline, toggleVideoIsOnline] = React.useState<boolean>(true)
    const [uploadedSubtitleFile, setUploadedSubtitleFile] = React.useState<SubtitleInfo>(emptySubtitle)
    const [selectedSubtitle, setSelectedSubtitle] = React.useState<SubtitleInfo>(emptySubtitle)
    const [VodDetails, setVodDetails] = React.useState<VodDetails>(null)
    const [imageModalTitle, setImageModalTitle] = React.useState<string>(null)

    React.useEffect(() => {
        setVodDetails(props.vodDetails)
    }, [props.vodDetails]);
    React.useEffect(() => { }, [selectedSubtitle, subtitleModalOpen])
    const testSubtitleFile = "mozumban_subtitle_678.srt"

    const handleImageModalFunction = () => {
        if (imageModalTitle === "Change Splashscreen") {
            return  props.changeVodSplashscreen
        } else if (imageModalTitle === "Change Thumbnail") {
            return props.changeVodThumbnail
        } else {
            return props.changeVodPoster
        }
    }

    const vodAdvancedLinksOptions = [
        { id: "thumbnail", label: "Thumbnail" },
        { id: "splashscreen", label: "Splashscreen" },
        { id: "poster", label: "Poster" },
        { id: "embed", label: "Embed Code" },
        { id: "video", label: "Video" },
        { id: "download", label: "Download" },
        { id: "m3u8", label: "M3U8" }
    ]

    return (
        VodDetails ?
            <React.Fragment>
                <Card className="col-12 clearfix">
                    <div className="details col col-12">
                        <header className="flex justify-between">
                            <Text size={20} weight="med">Details</Text>
                            <Button sizeButton="xs" typeButton="secondary">Download</Button>
                        </header>
                        <Toggle
                            className="col col-12 mt2 pb2"
                            defaultChecked={VodDetails.online}
                            onChange={(event) => { toggleVideoIsOnline(!videoIsOnline); setVodDetails({ ...VodDetails, ["online"]: !videoIsOnline }) }}
                            label="Video Online"
                        />
                        <Input
                            className="col col-6 pr2"
                            label="Title"
                            value={VodDetails.title}
                            onChange={event => setVodDetails({ ...VodDetails, ["title"]: event.currentTarget.value })}
                        />
                        <InputTags
                            className="col col-6"
                            label="Folders"
                            placeholder="Type folder name"
                        />

                        <Input
                            className="col col-6 pr2 pt2"
                            label="Description"
                            value={VodDetails.description}
                            onChange={event => setVodDetails({ ...VodDetails, ["description"]: event.currentTarget.value })}
                        />
                        <div className="col col-3 pt2 flex flex-column">
                            <LinkBoxLabel>
                                <Text size={14} weight="med">Video ID</Text>
                            </LinkBoxLabel>
                            <LinkBox>
                                <LinkText size={14} weight="reg">{props.vodDetails.id}</LinkText>
                                <IconButton id="copyEmbedTooltip" onClick={() => copyKey(props.vodDetails.id)}><Icon>file_copy_outlined</Icon></IconButton>
                                <Tooltip target="copyEmbedTooltip">Copy to clipboard</Tooltip>
                            </LinkBox>
                        </div>
                        <Divider className="col col-12" />
                    </div>
                    <div className='col col-12'>
                        <Text className='col col-12' size={20} weight='med'>Sharing</Text>
                        <Text className='pt2 col col-12' size={14}>The Embed Code can add content to your website and the Share Link can be shared on social media.</Text>

                        <div className="col col-6 mt2 pr2 flex flex-column">
                            <LinkBoxLabel>
                                <Text size={14} weight="med">Embed Code</Text>
                            </LinkBoxLabel>
                            <LinkBox>
                                <LinkText size={14} weight="reg">&lt;iframe src="//iframe.streamingasaservice.net&gt;</LinkText>
                                <IconButton id="copyEmbedTooltip" onClick={() => copyKey("embed code here")}><Icon>file_copy_outlined</Icon></IconButton>
                                <Tooltip target="copyEmbedTooltip">Copy to clipboard</Tooltip>
                            </LinkBox>
                        </div>
                        <div className="col col-6 mt2 flex flex-column">
                            <LinkBoxLabel>
                                <Text size={14} weight="med">Share Link</Text>
                            </LinkBoxLabel>
                            <LinkBox>
                                <LinkText size={14} weight="reg">https://iframe.dacast.com/b/1234/f/929020</LinkText>
                                <IconButton id="copyEmbedTooltip" onClick={() => copyKey("share link here")}><Icon>file_copy_outlined</Icon></IconButton>
                                <Tooltip target="copyEmbedTooltip">Copy to clipboard</Tooltip>
                            </LinkBox>
                        </div>
                        <Divider className="col col-12" />
                    </div>
                    <div className="thumbnail col col-12">
                        <Text className="col col-12" size={20} weight="med">Images</Text>
                        <Text className="col col-12 pt1" size={14} weight="reg">Upload image assets for your content.</Text>
                        <ImagesContainer className="col col-12 pt2">
                            <ImageContainer className="mr2">
                                <div className="flex flex-center">
                                    <Text size={16} weight="med" className="mr1">Splashscreen</Text>
                                    <Icon id="splashscreenTooltip">info_outlined</Icon>
                                    <Tooltip target="splashscreenTooltip">Splashscreen Tooltip</Tooltip>
                                </div>
                                <ImageArea className="mt2">
                                    <ButtonSection>
                                        <Button 
                                            className="clearfix right m1" sizeButton="xs" typeButton="secondary"
                                            onClick={() => {setImageModalTitle("Change Splashscreen");setImageModalOpen(true)}}>
                                                Change
                                        </Button>
                                    </ButtonSection> 
                                    <ImageSection> <SelectedImage src={props.vodDetails.splashscreen} /></ImageSection>   
                                </ImageArea>
                                <Text size={10} weight="reg" color="gray-3">Minimum 480px x 480px, formats: JPG, PNG, SVG, GIF</Text>
                            </ImageContainer>
                            <ImageContainer className="mr2">
                                <div className="flex flex-center">
                                    <Text size={16} weight="med" className="mr1">Thumbnail</Text>
                                    <Icon id="thumbnailTooltip">info_outlined</Icon>
                                    <Tooltip target="thumbnailTooltip">Thumbnail Tooltip</Tooltip>
                                </div>
                                <ImageArea className="mt2">
                                    <ButtonSection><Button sizeButton="xs" className="clearfix right m1" typeButton="secondary" onClick={() => {setImageModalTitle("Change Thumbnail");setImageModalOpen(true)}}>Change</Button></ButtonSection>
                                    <ImageSection> <SelectedImage src={props.vodDetails.thumbnail} /></ImageSection>   
                                </ImageArea>
                                <Text size={10} weight="reg" color="gray-3">Always 160px x 90px, formats: JPG, PNG, SVG, GIF</Text>
                            </ImageContainer>
                            <ImageContainer className="">
                                <div className="flex flex-center">
                                    <Text className="mr1" size={16} weight="med">Poster</Text>  
                                    <Icon id="posterTooltip">info_outlined</Icon>
                                    <Tooltip target="posterTooltip">Poster Tooltip</Tooltip>
                                </div>
                                <ImageArea className="mt2">
                                    <ButtonSection>
                                        {
                                            VodDetails.poster === "" ? null :
                                                <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {}}>Delete</Button>
                                        }
                                        
                                        <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {setImageModalTitle("Change Poster");setImageModalOpen(true)}}>
                                            {
                                                VodDetails.poster === "" ?
                                                    "Add" : "Change"
                                            }
                                        </Button>
                                    </ButtonSection>
                                    <ImageSection> <SelectedImage src={props.vodDetails.poster} /></ImageSection>  
                                </ImageArea>
                                <Text size={10} weight="reg" color="gray-3"> Minimum 480px x 480px, formats: JPG, PNG, SVG, GIF</Text>
                            </ImageContainer>
                        </ImagesContainer>
                    </div>
                    <Divider className="col col-12" />
                    <div className="subtitles col col-12">
                        <Text className="col col-12" size={20} weight="med">Subtitles</Text>
                        <Text className="col col-12 pt2" size={14} weight="reg">Add subtitles to improve the accessibility of your content.</Text>
                    </div>
                    {(props.vodDetails.subtitles.length === 0) ?
                        <Table className="col col-12 mt25" header={disabledSubtitlesTableHeader(setSubtitleModalOpen)} body={disabledSubtitlesTableBody('You currently have no Subtitles')} id="subtitlesTable" />
                        : <Table className="col col-12 mt25" header={subtitlesTableHeader(setSubtitleModalOpen)} body={subtitlesTableBody(props, VodDetails, setSelectedSubtitle, setSubtitleModalOpen, setUploadedSubtitleFile)} id="subtitlesTable" />
                    }
                    <Divider className="col col-12" />
                    <div className="col col-12 advancedVideoLinks">
                        <div onClick={() => setAdvancedVideoLinksExpanded(!advancedVideoLinksExpanded)}>
                            <Icon  className="col col-1 pointer">{advancedVideoLinksExpanded ? "expand_less" : "expand_more"}</Icon>
                            <Text className="col col-11 pointer" size={20} weight="med">Advanced Video Links</Text>
                        </div>                  
                        <AdvancedLinksContainer className="col col-12" isExpanded={advancedVideoLinksExpanded}>
                            {vodAdvancedLinksOptions.map((item) => {
                                return (
                                    <LinkBoxContainer className="col col-6">
                                        <LinkBoxLabel>
                                            <Text size={14} weight="med">{item.label}</Text>
                                        </LinkBoxLabel>
                                        <LinkBox>
                                            <Text size={14} weight="reg">https://view.vzaar.com/20929875/{item.id}</Text>
                                            <IconButton id={item.id} onClick={() => copyKey("embed code here")}><Icon>file_copy_outlined</Icon></IconButton>
                                            <Tooltip target={item.id}>Copy to clipboard</Tooltip>
                                        </LinkBox>
                                    </LinkBoxContainer>

                                )
                            })}
                        </AdvancedLinksContainer>
                    </div>

                    <Modal id="addSubtitles" opened={subtitleModalOpen === true} toggle={() => setSubtitleModalOpen(false)} size="small" title="Add Subtitles">
                        <form id="addSubtitlesForm"
                            onSubmit={event => { event.preventDefault(); handleSubtitleSubmit(props, setSubtitleModalOpen, uploadedSubtitleFile, setUploadedSubtitleFile, selectedSubtitle, emptySubtitle) }}>
                            <ModalContent>
                                <DropdownSingle
                                    className="col col-12"
                                    id="subtitleLanguage"
                                    dropdownTitle="Subtitle Language"
                                    list={{ "Swedish": false, "French": false, "German": false, "Mozumban": false, "Russian": false }}
                                    dropdownDefaultSelect={selectedSubtitle.language}
                                    callback={(value: string) => setUploadedSubtitleFile({ ...uploadedSubtitleFile, language: value })}
                                />
                                <Button className="mt25" onClick={(event) => { event.preventDefault(); setUploadedSubtitleFile({ ...uploadedSubtitleFile, fileName: testSubtitleFile }) }} typeButton="secondary" sizeButton="xs">Select File</Button>
                                <Text className="col col-12" size={10} weight="reg" color="gray-5">Max file size is 1MB, File srt or vtt</Text>
                                {uploadedSubtitleFile.fileName === "" ? null :
                                    <SubtitleFile className="col mt1">
                                        <Text className="ml2" color="gray-1" size={14} weight="reg">{uploadedSubtitleFile.fileName}</Text>
                                        <button style={{ border: "none", backgroundColor: "inherit" }}>
                                            <Icon onClick={() => setUploadedSubtitleFile({ ...uploadedSubtitleFile, fileName: "" })} style={{ fontSize: "14px", display: "flex", alignItems: "center" }}>close</Icon>
                                        </button>
                                    </SubtitleFile>
                                }
                            </ModalContent>
                            <ModalFooter>
                                <Button type="submit" >Add</Button>
                                <Button onClick={(event) => { event.preventDefault(); setSubtitleModalOpen(false); setSelectedSubtitle(emptySubtitle); setUploadedSubtitleFile(emptySubtitle) }} typeButton="secondary">Cancel</Button>
                            </ModalFooter>
                        </form>
                    </Modal>
                    <ImageModal toggle={() => setImageModalOpen(false)} opened={imageModalOpen === true} submit={handleImageModalFunction()} />

                </Card>
                <ButtonContainer>
                    <Button className="mr2" onClick={() => props.editVodDetails(VodDetails)}>Save</Button>
                    <Button typeButton="secondary" onClick={() => setVodDetails(props.vodDetails)}>Discard</Button>
                </ButtonContainer>
            </React.Fragment>
            : null
    )

}

const SubtitleFile = styled.div`
    display: flex;
    background-color: ${props => props.theme.colors["gray-10"]};
    height: 32px;
    align-items: center;
    justify-content: space-between;
`