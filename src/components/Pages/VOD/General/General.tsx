import React from 'react';
import { Card } from '../../../Card/Card';
import { Text } from "../../../Typography/Text"
import { Toggle } from '../../../Toggle/toggle';
import { Input } from '../../../FormsComponents/Input/Input';
import styled from 'styled-components';
import { Button } from '../../../FormsComponents/Button/Button';
import { Table } from '../../../Table/Table';
import { Icon } from '@material-ui/core';
import { Modal, ModalContent, ModalFooter } from '../../../Modal/Modal';
import { DropdownSingle } from '../../../FormsComponents/Dropdown/DropdownSingle';
import { ThumbnailModal } from './ThumbnailModal';
import { VodDetails, SubtitleInfo } from '../../../../redux-flow/store/VOD/General/types';

interface GeneralComponentProps {
    vodDetails: VodDetails;
    editVodDetails: Function;
    addVodSubtitle: Function;
    editVodSubtitle: Function;
    deleteVodSubtitle: Function;
    changeVodThumbnail: Function;
}

const subtitlesTableHeader = (setSubtitleModalOpen: Function) => {
    return [
        <Text size={14} weight="med">Subtitles</Text>,
        <Text size={14} weight="med">Language</Text>,
        <Button onClick={() => setSubtitleModalOpen(true)} className="right mr2" sizeButton="xs" typeButton="secondary">Create Subtitle</Button>
    ]
};

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

const advancedVideoLinksOptions = [
    {id: "thumb", label: "Thumbnail"},
    {id: "download", label: "Download Video"},
    {id: "image", label: "Poster Frame"},
    {id: "embed", label: "Embed Code"},
    {id: "video", label: "Video"},
    {id: "audio", label: "Audio Embed"},
    {id: "adaptive.m3u8", label: "Adaptive Streaming (HLS"}
    
]

const copyKey = (value: string) => {
    var textArea = document.createElement("textarea");
    textArea.value = value;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
}

const editSubtitle = (subtitle: SubtitleInfo, setSelectedSubtitle: Function, setSubtitleModalOpen: Function, setUploadedSubtitleFile: Function) => {
    setSelectedSubtitle(subtitle);
    setUploadedSubtitleFile(subtitle)
    setSubtitleModalOpen(true)
}

const handleSubtitleSubmit = (props: GeneralComponentProps, setSubtitleModalOpen: Function, data: SubtitleInfo, setUploadedSubtitleFile: Function, selectedSubtitle: SubtitleInfo, emptySubtitle: SubtitleInfo) => {
    if (selectedSubtitle.id ===  emptySubtitle.id && selectedSubtitle.fileName === emptySubtitle.fileName) {
        props.addVodSubtitle(data);
    } else {
        props.editVodSubtitle(data)
    }
    console.log(data)
    setUploadedSubtitleFile({fileName: "", language: ""})
    setSubtitleModalOpen(false);
}

export const GeneralPage = (props: GeneralComponentProps) => {

    const emptySubtitle = {id: "", fileName: "", language: ""}

    const [advancedVideoLinksExpanded, setAdvancedVideoLinksExpanded] = React.useState<boolean>(false)
    const [subtitleModalOpen, setSubtitleModalOpen] = React.useState<boolean>(false)
    const [thumbnailModalOpen, setThumbnailModalOpen] = React.useState<boolean>(false)
    const [videoIsOnline, toggleVideoIsOnline] = React.useState<boolean>(true)
    const [uploadedSubtitleFile, setUploadedSubtitleFile] = React.useState<SubtitleInfo>(emptySubtitle)
    const [selectedSubtitle, setSelectedSubtitle] = React.useState<SubtitleInfo>(emptySubtitle)
    const [VodDetails, setVodDetails] = React.useState<VodDetails>(null)

    React.useEffect(() => {
        setVodDetails(props.vodDetails)
    }, [props.vodDetails]);
    React.useEffect(() => {}, [selectedSubtitle, subtitleModalOpen])
    const testSubtitleFile = "mozumban_subtitle_678.srt"

    return (
        VodDetails ? 
        <React.Fragment>
        <Card className="col-12 clearfix">
            <div className="details col col-12">
                <Text size={20} weight="med">Details</Text>
                <Toggle 
                className="col col-12 mt2 pb2"
                defaultChecked={VodDetails.online} 
                onChange={(event) => {toggleVideoIsOnline(!videoIsOnline);setVodDetails({...VodDetails, ["online"]: !videoIsOnline})}} 
                label="Video Online"
                />
                <Input 
                    className="col col-6 pr2" 
                    label="Title" 
                    value={props.vodDetails.title}
                    onChange={event => setVodDetails({...VodDetails, ["title"]: event.currentTarget.value})}
                />
                <Input 
                    className="col col-6" 
                    label="Folder" 
                    value={props.vodDetails.folder}
                    onChange={event => setVodDetails({...VodDetails, ["folder"]: event.currentTarget.value})} 
                />
                <Input 
                    className="col col-6 pr2 pt2" 
                    label="Description" 
                    defaultValue={props.vodDetails.description} 
                    onChange={event => setVodDetails({...VodDetails, ["description"]: event.currentTarget.value})}
                />
            </div>
            <Divider className="col col-12"/>
            <div className="share col col-12">
                <Text className="col col-12" size={20} weight="med">Share</Text>
                <LinkBoxContainer className="col col-4 pr2">
                    <LinkBoxLabel>
                        <Text size={14} weight="med">Embed Code</Text>
                    </LinkBoxLabel>
                    <LinkBox>
                        <LinkText size={14} weight="reg">&lt;iframe src="//iframe.streamingasaservice.net&gt;</LinkText>
                        <IconButton onClick={() => copyKey("embed code here")}><Icon>file_copy</Icon></IconButton>
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
            <Divider className="col col-12"/>
            <div className="thumbnail col col-12">
                <Text className="col col-12" size={20} weight="med">Thumbnail</Text>
                <Text className="col col-12 pt1" size={14} weight="reg">Select a thumbnail from the generated images, or upload your own thumbnail</Text>
                <ThumbnailContainer className="col col-12 pt2 flex">
                    <ThumbnailImage className="mr2" src={VodDetails.thumbnail.toString()}/>
                    <UploadThumbnail onClick={() => setThumbnailModalOpen(true)}>
                        <Text size={12} weight="reg" color="dark-violet">Change Thumbnail</Text>
                    </UploadThumbnail>
                </ThumbnailContainer>
            </div>
            <Divider className="col col-12"/>
            <div className="subtitles col col-12">
            <Text className="col col-12" size={20} weight="med">Subtitles</Text>
            <Text className="col col-12 pt2" size={14} weight="reg">Something about the subtitles</Text> 
            </div>
            <Table className="col col-12 mt25" header={subtitlesTableHeader(setSubtitleModalOpen)} body={subtitlesTableBody(props, VodDetails, setSelectedSubtitle, setSubtitleModalOpen, setUploadedSubtitleFile)} id="subtitlesTable"></Table>
            <Divider className="col col-12"/>
            <div className="col col-12 advancedVideoLinks">
                <Icon onClick={() => setAdvancedVideoLinksExpanded(!advancedVideoLinksExpanded)} className="col col-1">{ advancedVideoLinksExpanded ? "expand_less" : "expand_more"}</Icon>
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
            onSubmit={event => {event.preventDefault();handleSubtitleSubmit(props, setSubtitleModalOpen, uploadedSubtitleFile, setUploadedSubtitleFile, selectedSubtitle, emptySubtitle)}}>
                <ModalContent>
                    <DropdownSingle
                        className="col col-12" 
                        id="subtitleLanguage"
                        dropdownTitle="Subtitle Language"
                        list={{"Swedish":false, "French":false, "German":false, "Mozumban":false, "Russian": false}}
                        dropdownDefaultSelect={selectedSubtitle.language}
                        callback={(value: string) => setUploadedSubtitleFile({...uploadedSubtitleFile, language: value})}
                    />
                    <Button onClick={(event) => {event.preventDefault();setUploadedSubtitleFile({...uploadedSubtitleFile, fileName: testSubtitleFile})}} typeButton="secondary" sizeButton="xs">Select File</Button>
                    <Text className="col col-12" size={10} weight="reg" color="gray-5">Max file size is 1MB, File srt or vtt</Text>
                    { uploadedSubtitleFile.fileName === "" ? null :
                    <SubtitleFile className="col mt1">
                        <Text className="ml2" color="gray-1" size={14} weight="reg">{uploadedSubtitleFile.fileName}</Text>
                        <button style={{border: "none", backgroundColor:"inherit"}}>
                            <Icon onClick={() => setUploadedSubtitleFile({...uploadedSubtitleFile, fileName: ""})} style={{fontSize: "14px"}}>close</Icon>
                        </button>   
                    </SubtitleFile>
                    }
                </ModalContent>
                <ModalFooter>
                    <Button type="submit" >Add</Button>
                    <Button onClick={(event) => {event.preventDefault();setSubtitleModalOpen(false);setSelectedSubtitle(emptySubtitle);setUploadedSubtitleFile(emptySubtitle)}} typeButton="secondary">Cancel</Button> 
                </ModalFooter>
            </form>
            </Modal>
            <ThumbnailModal toggle={() => setThumbnailModalOpen(false) } opened={thumbnailModalOpen === true} submit={props.changeVodThumbnail}/>

        </Card>
        <ButtonContainer>
            <Button className="mr2" onClick={() => props.editVodDetails(VodDetails)}>Save</Button>
            <Button typeButton="secondary">Discard</Button>
        </ButtonContainer>
        </React.Fragment>
        : null
    )
    
}
const Divider = styled.div`
    border-bottom: 1px solid ${props => props.theme.colors["gray-7"]};
    margin: 32px 24px 24px 0;
`

const LinkBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    height:auto;
    padding-top: 24px;
    padding-right: 16px;
`

const LinkBoxLabel = styled.label`
    display: flex;
    height:auto;
    margin-bottom: 4px;
    margin-top:4px;
    align-items: center;
`

const LinkBox = styled.div`
display: flex;
height: 32px;
padding: 0 12px;
background-color: ${props => props.theme.colors["gray-10"]};
border: 1px solid ${props => props.theme.colors["gray-7"]};
align-items: center;
`

const LinkText = styled(Text)`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const ThumbnailContainer = styled.div`
`

const ThumbnailImage = styled.img`
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

   const AdvancedVideoLinksContainer = styled.div<{isExpanded: boolean}>`
   display: ${props => props.isExpanded ? "block" : "none"};
   `

   const SubtitleFile = styled.div`
    display: flex;
    background-color: ${props => props.theme.colors["gray-10"]};
    height: 32px;
    align-items: center;
    justify-content: space-between;
`

const IconButton = styled.button`
display: block;
border: none;
background-color: inherit;
`

const ButtonContainer = styled.div`
margin-top: 24px;
`