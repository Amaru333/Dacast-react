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
import { ImageModal } from './ImageModal';
import { VodDetails, SubtitleInfo } from '../../../redux-flow/store/VOD/General/types';
import { Divider, LinkBoxContainer, LinkBoxLabel, LinkBox, LinkText, IconButton, ButtonContainer, ImagesContainer, ImageContainer, ImageArea, ImageSection, SelectedImage, ButtonSection } from "../../../shared/General/GeneralStyle"

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
                <Icon>get_app</Icon>
                <Icon onClick={() => props.deleteVodSubtitle(value)}>delete</Icon>
                <Icon onClick={() => editSubtitle(value, setSelectedSubtitle, setSubtitleModalOpen, setUploadedSubtitleFile)}>edit</Icon>
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
        <Text key={text} className='center' size={14} weight='reg' color='gray-3' >{text}</Text>,
        <span key={'disabledTableBody'}></span>
    ]]
}

const advancedVideoLinksOptions = [
    { id: "thumb", label: "Thumbnail" },
    { id: "download", label: "Download Video" },
    { id: "image", label: "Poster Frame" },
    { id: "embed", label: "Embed Code" },
    { id: "video", label: "Video" },
    { id: "audio", label: "Audio Embed" },
    { id: "adaptive.m3u8", label: "Adaptive Streaming (HLS" }

]

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
    console.log(data)
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
            console.log("splash")
           return  props.changeVodSplashscreen
           
        } else if (imageModalTitle === "Change Thumbnail") {
            console.log("thumb")
            return props.changeVodThumbnail
        } else {
            console.log("poster")
            return props.changeVodPoster
        }
    }

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
                            defaultValue={props.vodDetails.title}
                            onChange={event => setVodDetails({ ...VodDetails, ["title"]: event.currentTarget.value })}
                        />
                        <Input
                            className="col col-6"
                            label="Folder"
                            defaultValue={props.vodDetails.folder}
                            onChange={event => setVodDetails({ ...VodDetails, ["folder"]: event.currentTarget.value })}
                        />
                        <Input
                            className="col col-6 pr2 pt2"
                            label="Description"
                            defaultValue={props.vodDetails.description}
                            onChange={event => setVodDetails({ ...VodDetails, ["description"]: event.currentTarget.value })}
                        />
                    </div>
                    <Divider className="col col-12" />
                    <div className="share col col-12">
                        <Text className="col col-12" size={20} weight="med">Share</Text>
                        <LinkBoxContainer className="col col-4 pr2">
                            <LinkBoxLabel>
                                <Text size={14} weight="med">Embed Code</Text>
                            </LinkBoxLabel>
                            <LinkBox>
                                <LinkText size={14} weight="reg">&lt;iframe src="//iframe.streamingasaservice.net&gt;</LinkText>
                                <IconButton onClick={() => copyKey("embed code here")}><Icon>file_copy_outlined</Icon></IconButton>
                            </LinkBox>
                        </LinkBoxContainer>
                        <LinkBoxContainer className="col col-4 pr2">
                            <LinkBoxLabel>
                                <Text size={14} weight="med">JS</Text>
                            </LinkBoxLabel>
                            <LinkBox>
                                <LinkText size={14} weight="reg">&lt;iframe src="//iframe.streamingasaservice.net&gt;</LinkText>
                                <IconButton onClick={() => copyKey("JS here")}><Icon>file_copy</Icon></IconButton>
                            </LinkBox>
                        </LinkBoxContainer>
                        <LinkBoxContainer className="col col-4">
                            <LinkBoxLabel>
                                <Text size={14} weight="med">Link</Text>
                            </LinkBoxLabel>
                            <LinkBox>
                                <LinkText size={14} weight="reg">&lt;iframe src="//iframe.streamingasaservice.net&gt;</LinkText>
                                <IconButton onClick={() => copyKey("Link here")}><Icon>file_copy</Icon></IconButton>
                            </LinkBox>
                        </LinkBoxContainer>
                    </div>
                    <Divider className="col col-12" />
                    <div className="col col-12">
                        <Text className="col col-12" size={20} weight="med">Advertising</Text>
                        <Text className="col col-12 pt1" size={14} weight="reg">Some text about advertising</Text>
                        <AdContainer className="col col-12 mt2">
                            <AdInput className="col col-4 mr2" label="Ad URL" />
                            <Button className="mt3" sizeButton="xs" typeButton="secondary">Preview Ads</Button>
                        </AdContainer>
                        <Divider className="col col-12" />
                    </div>
                    <div className="thumbnail col col-12">
                    <Text className="col col-12" size={20} weight="med">Images</Text>
                    <Text className="col col-12 pt1" size={14} weight="reg">Some text about the images blah blah blah splashscreen thumbnail poster</Text>
                    <ImagesContainer className="col col-12 pt2 flex">
                        <ImageContainer className="mr2">
                            <div className="flex flex-center">
                            <Text size={16} weight="med" className="mr1">Splashscreen</Text>
                            <Icon>info_outlined</Icon>
                            </div>
                           
                            <ImageArea className="mt2">
                                <ImageSection> <SelectedImage src={props.vodDetails.splashscreen} /></ImageSection>
                                <ButtonSection><Button className="clearfix right m1" sizeButton="xs" typeButton="secondary"
                                onClick={() => {setImageModalTitle("Change Splashscreen");setImageModalOpen(true)}}>Change</Button></ButtonSection>  
                            </ImageArea>
                            <Text size={10} weight="reg" color="gray-3">Minimum 480px x 480px, formats: JPG, PNG, SVG, GIF</Text>
                        </ImageContainer>
                        <ImageContainer className="mr2">
                            <div className="flex flex-center">
                            <Text size={16} weight="med" className="mr1">Thumbnail</Text>  <Icon>info_outlined</Icon>
                            </div>
                            <ImageArea className="mt2">
                                <ImageSection> <SelectedImage src={props.vodDetails.thumbnail} /></ImageSection>
                                <ButtonSection><Button sizeButton="xs" className="clearfix right m1" typeButton="secondary" onClick={() => {setImageModalTitle("Change Thumbnail");setImageModalOpen(true)}}>Change</Button></ButtonSection>  
                            </ImageArea>
                            <Text size={10} weight="reg" color="gray-3">Minimum 480px x 480px, formats: JPG, PNG, SVG, GIF</Text>
                        </ImageContainer>
                        <ImageContainer className="">
                            <div className="flex flex-center">
                            <Text className="mr1" size={16} weight="med">Poster</Text>  <Icon>info_outlined</Icon>
                            </div>
                            <ImageArea className="mt2">
                                <ImageSection> <SelectedImage src={props.vodDetails.poster} /></ImageSection>
                                <ButtonSection><Button sizeButton="xs" className="clearfix right m1" typeButton="secondary" onClick={() => {setImageModalTitle("Change Poster");setImageModalOpen(true)}}>Change</Button></ButtonSection>  
                            </ImageArea>
                            <Text size={10} weight="reg" color="gray-3">Always 160px x 90px, formats: JPG, PNG, SVG, GIF </Text>
                        </ImageContainer>

                    </ImagesContainer>
                </div>
                    <Divider className="col col-12" />
                    <div className="subtitles col col-12">
                        <Text className="col col-12" size={20} weight="med">Subtitles</Text>
                        <Text className="col col-12 pt2" size={14} weight="reg">Something about the subtitles</Text>
                    </div>
                    {(props.vodDetails.subtitles.length === 0) ?
                        <Table className="col col-12 mt25" header={disabledSubtitlesTableHeader(setSubtitleModalOpen)} body={disabledSubtitlesTableBody('No subtitles')} id="subtitlesTable" />
                        : <Table className="col col-12 mt25" header={subtitlesTableHeader(setSubtitleModalOpen)} body={subtitlesTableBody(props, VodDetails, setSelectedSubtitle, setSubtitleModalOpen, setUploadedSubtitleFile)} id="subtitlesTable" />
                    }
                    <Divider className="col col-12" />
                    <div className="col col-12 advancedVideoLinks">
                        <Icon onClick={() => setAdvancedVideoLinksExpanded(!advancedVideoLinksExpanded)} className="col col-1">{advancedVideoLinksExpanded ? "expand_less" : "expand_more"}</Icon>
                        <Text className="col col-11" size={20} weight="med">Advanced Video Links</Text>
                        <AdvancedVideoLinksContainer className="col col-12" isExpanded={advancedVideoLinksExpanded}>
                            {advancedVideoLinksOptions.map((item) => {
                                return (
                                    <LinkBoxContainer className="col col-6">
                                        <LinkBoxLabel>
                                            <Text size={14} weight="med">{item.label}</Text>
                                        </LinkBoxLabel>
                                        <LinkBox>
                                            <Text size={14} weight="reg">https://view.vzaar.com/20929875/{item.id}</Text>
                                        </LinkBox>
                                    </LinkBoxContainer>

                                )
                            })}
                        </AdvancedVideoLinksContainer>
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
                    <ImageModal title={imageModalTitle} toggle={() => setImageModalOpen(false)} opened={imageModalOpen === true} submit={handleImageModalFunction()} />

                </Card>
                <ButtonContainer>
                    <Button className="mr2" onClick={() => props.editVodDetails(VodDetails)}>Save</Button>
                    <Button typeButton="secondary" onClick={() => setVodDetails(props.vodDetails)}>Discard</Button>
                </ButtonContainer>
            </React.Fragment>
            : null
    )

}

const AdContainer = styled.div`
display: flex;
align-items: center;
`

const AdInput = styled(Input)`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const UploadThumbnail = styled.button`
height: 102px;
width: 171px;
border: 1px dashed ${props => props.theme.colors["gray-7"]};
`

const IconContainer = styled.div`
    float:right;
    display:none;
    .material-icons{
        margin-right:16px;
        color:  ${props => props.theme.colors["gray-1"]};
    }
   `

const AdvancedVideoLinksContainer = styled.div<{ isExpanded: boolean }>`
   display: ${props => props.isExpanded ? "block" : "none"};
   `

const SubtitleFile = styled.div`
    display: flex;
    background-color: ${props => props.theme.colors["gray-10"]};
    height: 32px;
    align-items: center;
    justify-content: space-between;
`