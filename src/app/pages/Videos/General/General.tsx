import React from 'react';
import { Card } from '../../../../components/Card/Card';
import { Text } from "../../../../components/Typography/Text"
import { Toggle } from '../../../../components/Toggle/toggle';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import styled from 'styled-components';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Table } from '../../../../components/Table/Table';
import { IconStyle, IconContainer, ActionIcon } from '../../../../shared/Common/Icon';
import { Modal, ModalContent, ModalFooter } from '../../../../components/Modal/Modal';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { ImageModal } from '../../../shared/General/ImageModal';
import { VodDetails, SubtitleInfo } from '../../../redux-flow/store/VOD/General/types';
import { Divider, LinkBoxContainer, LinkBoxLabel, LinkBox, LinkText, ButtonContainer, ImagesContainer, ImageContainer, ImageArea, ImageSection, SelectedImage, ButtonSection, AdvancedLinksContainer } from "../../../shared/General/GeneralStyle"
import { InputTags } from '../../../../components/FormsComponents/Input/InputTags';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { Prompt } from 'react-router';
import { getPrivilege } from '../../../../utils/utils';
import { GeneralComponentProps } from '../../../containers/Videos/General';
import { updateClipboard } from '../../../utils/utils';
import { addTokenToHeader } from '../../../utils/token';
import { languages } from 'countries-list';


export const GeneralPage = (props: GeneralComponentProps & {vodId: string}) => {

    const emptySubtitle = { id: "", fileName: "", languageLongName: "", languageShortName: "" }

    const {userId} = addTokenToHeader()

    const [advancedVideoLinksExpanded, setAdvancedVideoLinksExpanded] = React.useState<boolean>(false)
    const [subtitleModalOpen, setSubtitleModalOpen] = React.useState<boolean>(false)
    const [imageModalOpen, setImageModalOpen] = React.useState<boolean>(false)
    const [uploadedSubtitleFile, setUploadedSubtitleFile] = React.useState<SubtitleInfo>(emptySubtitle)
    const [VodDetails, setVodDetails] = React.useState<VodDetails>(null)
    const [imageModalTitle, setImageModalTitle] = React.useState<string>(null)
    const [subtitleFile, setSubtitleFile] = React.useState<File>(null);
    const [selectedImageName, setSelectedImageName] = React.useState<string>(null)

    React.useEffect(() => {
        setVodDetails(props.vodDetails)
    }, [props.vodDetails]);

    const subtitlesTableHeader = (setSubtitleModalOpen: Function) => {
        return {data: [
            {cell: <Text size={14} weight="med">Subtitles</Text>},
            {cell: <Text size={14} weight="med">Language</Text>},
            {cell: <Button onClick={() => setSubtitleModalOpen(true)} className="right mr2" sizeButton="xs" typeButton="secondary">Create Subtitle</Button>}
        ]}
    };
    
    const editSubtitle = (subtitle: SubtitleInfo) => {
        setUploadedSubtitleFile(subtitle)
        setSubtitleModalOpen(true)
    }
    
    const subtitlesTableBody = () => {
        return VodDetails.subtitles.map((value, key) => {
            return {data: [
                <Text key={"generalPage_subtitles_" + value.fileName + key} size={14} weight="reg">{value.fileName}</Text>,
                <Text key={"generalPage_subtitles_" + value.languageLongName + key} size={14} weight="reg">{value.languageLongName}</Text>,
                <IconContainer key={"generalPage_subtitles_actionIcons" + value.fileName + key} className="iconAction">
                    <ActionIcon id={"downloadSubtitleTooltip" + key}><IconStyle>get_app</IconStyle></ActionIcon>
                    <Tooltip target={"downloadSubtitleTooltip" + key}>Download</Tooltip>
                    <ActionIcon id={"deleteSubtitleTooltip" + key}><IconStyle onClick={() => props.deleteFile(props.vodDetails.id, value.id)}>delete</IconStyle></ActionIcon>
                    <Tooltip target={"deleteSubtitleTooltip" + key}>Delete</Tooltip>
                    <ActionIcon id={"editSubtitleTooltip" + key}><IconStyle onClick={() => editSubtitle(value)}>edit</IconStyle></ActionIcon>
                    <Tooltip target={"editSubtitleTooltip" + key}>Edit</Tooltip>
                </IconContainer>
            ]}
        })
    };
    
    const disabledSubtitlesTableHeader = (setSubtitleModalOpen: Function) => {
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
        if(props.vodDetails.uploadurl && subtitleModalOpen) {
            props.uploadFile(props.vodDetails.uploadurl, SubtitleFile)
            setUploadedSubtitleFile(emptySubtitle)
            setSubtitleModalOpen(false);
        }
    }, [props.vodDetails.uploadurl])
    
    const handleSubtitleSubmit = () => {
        props.getUploadUrl('subtitle', props.vodDetails.id, uploadedSubtitleFile)
    }

    const handleImageModalFunction = () => {
        if (imageModalTitle === "Change Splashscreen") {
            return  'vod-splashscreen'
        } else if (imageModalTitle === "Change Thumbnail") {
            return 'vod-thumbnail'
        } else if(imageModalTitle === 'Change Poster') {
            return 'vod-poster'
        } else {
            return ''
        }
    }

    const handleDrop = (file: FileList) => {
        const acceptedImageTypes = ['.srt', '.vtt'];
        if(file.length > 0 && acceptedImageTypes.includes(file[0].type)) {
            const reader = new FileReader();
            reader.onload = () => {
                let acceptedRatio = true;
                const img = new Image();
                img.onload = () => {
                    //acceptedRatio = (img.width / img.height) / 4 === 1 && img.width <= 240 ? true : false;
                }
                if(acceptedRatio) {
                    setSubtitleFile(file[0])
                }
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

    const vodAdvancedLinksOptions = [
        { id: "thumbnail", label: "Thumbnail", enabled: true, link: props.vodDetails.thumbnail.url },
        { id: "splashscreen", label: "Splashscreen", enabled: true, link: props.vodDetails.splashscreen.url },
        { id: "poster", label: "Poster", enabled: true, link: props.vodDetails.poster.url },
        { id: "embed", label: "Embed Code", enabled: true, link: `<script id="vod-${props.vodDetails.id}" width="590" height="431" src="https://player.dacast.com/js/player.js?contentId=vod-${props.vodDetails.id}"  class="dacast-video"></script>` },
        { id: "video", label: "Video", enabled: true, link: 'https://prod-nplayer.dacast.com/index.html?contentId=vod-' + props.vodId },
        // { id: "download", label: "Download", enabled: getPrivilege('privilege-web-download'), link: 'todo' },
        { id: "m3u8", label: "M3U8", enabled: getPrivilege('privilege-unsecure-m3u8'), link: 'todo' }
    ]

    return (
        VodDetails ?
            <React.Fragment>
                <Card className="col-12 clearfix">
                    <div className="details col col-12">
                        <header className="flex justify-between">
                            <Text size={20} weight="med">Details</Text>
                            { getPrivilege('privilege-web-download') && <Button sizeButton="xs" typeButton="secondary">Download</Button>}
                        </header>
                        <Toggle
                            className="col col-12 mt2 pb2"
                            defaultChecked={VodDetails.online}
                            onChange={() => {setVodDetails({ ...VodDetails, online: !VodDetails.online })}}
                            label="Video Online"
                        />
                        <Input
                            className="col col-6 pr2"
                            label="Title"
                            value={VodDetails.title}
                            onChange={event => setVodDetails({...VodDetails, title: event.currentTarget.value })}
                        />
                        <InputTags
                            className="col col-6"
                            label="Folders"
                            disabled
                            greyBackground
                            defaultTags={props.vodDetails.folder} 
                        />

                        <Input
                            className="col col-6 pr2 pt2"
                            type="textarea"
                            label="Description"
                            value={VodDetails.description ? VodDetails.description : ''}
                            onChange={event => setVodDetails({ ...VodDetails, description: event.currentTarget.value })}
                        />
                        <div className="col col-3 pt2 flex flex-column">
                            <LinkBoxLabel>
                                <Text size={14} weight="med">Content ID</Text>
                            </LinkBoxLabel>
                            <LinkBox>
                                <LinkText size={14} weight="reg">{props.vodDetails.id}</LinkText>
                                <IconStyle className='pointer' id="copyContentIdTooltip" onClick={() => updateClipboard(props.vodDetails.id, 'Copied to clipboard!')}>file_copy_outlined</IconStyle>
                                <Tooltip target="copyContentIdTooltip">Copy to clipboard</Tooltip>
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
                                <LinkText size={14} weight="reg">{`<iframe src="https://iframe.dacast.com/vod/${userId}/${props.vodDetails.id}" width="590" height="431" frameborder="0" scrolling="no" allow="autoplay" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>`}</LinkText>
                                <IconStyle className='pointer' id="copyEmbedTooltip" onClick={() => updateClipboard(`<iframe src="https://iframe.dacast.com/vod/${userId}/${props.vodDetails.id}" width="590" height="431" frameborder="0" scrolling="no" allow="autoplay" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>`, 'Copied to clipboard!')}>file_copy_outlined</IconStyle>
                                <Tooltip target="copyEmbedTooltip">Copy to clipboard</Tooltip>
                            </LinkBox>
                        </div>
                        <div className="col col-6 mt2 flex flex-column">
                            <LinkBoxLabel>
                                <Text size={14} weight="med">Share Link</Text>
                            </LinkBoxLabel>
                            <LinkBox>
                                <LinkText size={14} weight="reg">{`https://iframe.dacast.com/vod/${userId}/${props.vodDetails.id}`}</LinkText>
                                <IconStyle className='pointer' id="copyShareLinkTooltip" onClick={() => updateClipboard(`https://iframe.dacast.com/vod/${userId}/${props.vodDetails.id}`, 'Copied to clipboard!')}>file_copy_outlined</IconStyle>
                                <Tooltip target="copyShareLinkTooltip">Copy to clipboard</Tooltip>
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
                                    <IconStyle id="splashscreenTooltip">info_outlined</IconStyle>
                                    <Tooltip target="splashscreenTooltip">Splashscreen Tooltip</Tooltip>
                                </div>
                                <ImageArea className="mt2">
                                    <ButtonSection>
                                        {
                                            !VodDetails.splashscreen.url ? null :
                                                <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {props.deleteFile(props.vodDetails.id, props.vodDetails.splashscreen.targetID)}}>Delete</Button>
                                        }
                                        <Button 
                                            className="clearfix right m1" sizeButton="xs" typeButton="secondary"
                                            onClick={() => {setImageModalTitle("Change Splashscreen");setSelectedImageName(VodDetails.splashscreen.url);setImageModalOpen(true)}}>
                                            {
                                                !VodDetails.splashscreen.url  ?
                                                    "Add" : "Change"
                                            }
                                        </Button>
                                    </ButtonSection> 
                                    <ImageSection> <SelectedImage src={props.vodDetails.splashscreen.url} /></ImageSection>   
                                </ImageArea>
                                <Text size={10} weight="reg" color="gray-3">Minimum 480px x 480px, formats: JPG, PNG, SVG, GIF</Text>
                            </ImageContainer>
                            <ImageContainer className="mr2">
                                <div className="flex flex-center">
                                    <Text size={16} weight="med" className="mr1">Thumbnail</Text>
                                    <IconStyle id="thumbnailTooltip">info_outlined</IconStyle>
                                    <Tooltip target="thumbnailTooltip">Thumbnail Tooltip</Tooltip>
                                </div>
                                <ImageArea className="mt2">
                                    <ButtonSection>
                                        {
                                            !VodDetails.thumbnail.url ? null :
                                                <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {props.deleteFile(props.vodDetails.id, props.vodDetails.thumbnail.targetID)}}>Delete</Button>
                                        }
                                        <Button sizeButton="xs" className="clearfix right m1" typeButton="secondary" onClick={() => {setImageModalTitle("Change Thumbnail");setSelectedImageName(VodDetails.thumbnail.url);setImageModalOpen(true)}}>
                                            {
                                                !VodDetails.thumbnail.url  ?
                                                    "Add" : "Change"
                                            }
                                        </Button>
                                    </ButtonSection>
                                    <ImageSection> <SelectedImage src={props.vodDetails.thumbnail.url} /></ImageSection>   
                                </ImageArea>
                                <Text size={10} weight="reg" color="gray-3">Always 160px x 90px, formats: JPG, PNG, SVG, GIF</Text>
                            </ImageContainer>
                            <ImageContainer className="">
                                <div className="flex flex-center">
                                    <Text className="mr1" size={16} weight="med">Poster</Text>  
                                    <IconStyle id="posterTooltip">info_outlined</IconStyle>
                                    <Tooltip target="posterTooltip">Poster Tooltip</Tooltip>
                                </div>
                                <ImageArea className="mt2">
                                    <ButtonSection>
                                        {
                                            !VodDetails.poster.url ? null :
                                                <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {props.deleteFile(props.vodDetails.id, props.vodDetails.poster.targetID)}}>Delete</Button>
                                        }
                                        
                                        <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {setImageModalTitle("Change Poster");setSelectedImageName(VodDetails.poster.url);setImageModalOpen(true)}}>
                                            {
                                                !VodDetails.poster.url  ?
                                                    "Add" : "Change"
                                            }
                                        </Button>
                                    </ButtonSection>
                                    <ImageSection> <SelectedImage src={props.vodDetails.poster.url} /></ImageSection>  
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
                    {(!props.vodDetails.subtitles || props.vodDetails.subtitles.length === 0) ?
                        <Table className="col col-12" headerBackgroundColor="gray-10" header={disabledSubtitlesTableHeader(setSubtitleModalOpen)} body={disabledSubtitlesTableBody('You currently have no Subtitles')} id="subtitlesTable" />
                        : <Table className="col col-12" headerBackgroundColor="gray-10" header={subtitlesTableHeader(setSubtitleModalOpen)} body={subtitlesTableBody()} id="subtitlesTable" />
                    }
                    <Divider className="col col-12" />
                    <div className="col col-12 advancedVideoLinks">
                        <div onClick={() => setAdvancedVideoLinksExpanded(!advancedVideoLinksExpanded)}>
                            <IconStyle  className="col col-1 pointer">{advancedVideoLinksExpanded ? "expand_less" : "expand_more"}</IconStyle>
                            <Text className="col col-11 pointer" size={20} weight="med">Advanced Video Links</Text>
                        </div>                  
                        <AdvancedLinksContainer className="col col-12" isExpanded={advancedVideoLinksExpanded}>
                            {vodAdvancedLinksOptions.filter(item => item.enabled).map((item) => {
                                return (
                                    <LinkBoxContainer key={item.id} className="col col-6 mt2">
                                        <LinkBoxLabel>
                                            <Text size={14} weight="med">{item.label}</Text>
                                        </LinkBoxLabel>
                                        <LinkBox>
                                            <LinkText>
                                                <Text size={14} weight="reg">{item.link}</Text>
                                            </LinkText>
                                            <IconStyle className='pointer' id={item.id} onClick={() => updateClipboard(item.link, 'Copied to clipboard!')}>file_copy_outlined</IconStyle>
                                            <Tooltip target={item.id}>Copy to clipboard</Tooltip>
                                        </LinkBox>
                                    </LinkBoxContainer>

                                )
                            })}
                        </AdvancedLinksContainer>
                    </div>

                    <Modal id="addSubtitles" opened={subtitleModalOpen === true} toggle={() => setSubtitleModalOpen(false)} size="small" modalTitle="Add Subtitles">
                            <ModalContent>
                                <DropdownSingle
                                    className="col col-12"
                                    id="subtitleLanguage"
                                    dropdownTitle="Subtitle Language"
                                    list={Object.keys(languages).reduce((reduced, language) => {return {...reduced, [languages[language].name]: false}}, {})}
                                    dropdownDefaultSelect={uploadedSubtitleFile.languageLongName}
                                    callback={(value: string) => setUploadedSubtitleFile({ ...uploadedSubtitleFile, languageLongName: value, languageShortName: Object.keys(languages).find(l => languages[l].name === value)})}
                                />
                                <Button className="mt25" typeButton="secondary" sizeButton="xs">                                    
                                    <label htmlFor='browseButton'>
                                        <input type='file' onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBrowse(e)} style={{ display: 'none' }} id='browseButton' />
                                        Select Files
                                    </label>                                    
                                </Button>
                                <Text className="col col-12" size={10} weight="reg" color="gray-5">Max file size is 1MB, File srt or vtt</Text>
                                {uploadedSubtitleFile.fileName === "" ? null :
                                    <SubtitleFile className="col mt1">
                                        <Text className="ml2" color="gray-1" size={14} weight="reg">{uploadedSubtitleFile.fileName}</Text>
                                        <button style={{ border: "none", backgroundColor: "inherit" }}>
                                            <IconStyle onClick={() => setUploadedSubtitleFile({ ...uploadedSubtitleFile, fileName: "" })} className='flex items-center' customsize={14}>close</IconStyle>
                                        </button>
                                    </SubtitleFile>
                                }
                            </ModalContent>
                            <ModalFooter>
                                <Button onClick={() => {handleSubtitleSubmit()}}  >Add</Button>
                                <Button onClick={() => { setSubtitleModalOpen(false); setUploadedSubtitleFile(emptySubtitle) }} typeButton="secondary">Cancel</Button>
                            </ModalFooter>
                    </Modal>
                    {
                        imageModalOpen ?
                            <ImageModal imageFileName={selectedImageName} imageType={handleImageModalFunction()} contentId={props.vodId} uploadUrl={props.vodDetails.uploadurl} getUploadUrl={props.getUploadUrl} title={imageModalTitle} toggle={() => setImageModalOpen(false)} opened={imageModalOpen === true} submit={props.uploadFile} />
                            : null
                    }

                </Card>
                <ButtonContainer>
                    <Button className="mr2" onClick={() => props.editVodDetails(VodDetails)}>Save</Button>
                    <Button typeButton="tertiary" onClick={() => setVodDetails(props.vodDetails)}>Discard</Button>
                </ButtonContainer>
                <Prompt when={VodDetails !== props.vodDetails} message='' />
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