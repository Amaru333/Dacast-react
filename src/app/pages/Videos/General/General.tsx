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
import { Divider, LinkBoxContainer, LinkBoxLabel, LinkBox, LinkText, ButtonContainer, ImagesContainer, ImageContainer, ImageArea, ImageSection, SelectedImage, ButtonSection, AdvancedLinksContainer, ClassHalfXsFullMd } from "../../../shared/General/GeneralStyle"
import { InputTags } from '../../../../components/FormsComponents/Input/InputTags';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { Prompt } from 'react-router';
import { getPrivilege } from '../../../../utils/utils';
import { GeneralComponentProps } from '../../../containers/Videos/General';
import { updateClipboard } from '../../../utils/utils';
import { addTokenToHeader } from '../../../utils/token';
import { languages } from 'countries-list';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { PreviewModal } from '../../../shared/Common/PreviewModal';
import { logAmplitudeEvent } from '../../../utils/amplitudeService';


export const GeneralPage = (props: GeneralComponentProps & {vodId: string}) => {

    const emptySubtitle = { targetID: "", name: "", languageLongName: "", languageShortName: "", convertToUTF8: false }

    const {userId} = addTokenToHeader()

    const [advancedVideoLinksExpanded, setAdvancedVideoLinksExpanded] = React.useState<boolean>(false)
    const [subtitleModalOpen, setSubtitleModalOpen] = React.useState<boolean>(false)
    const [imageModalOpen, setImageModalOpen] = React.useState<boolean>(false)
    const [uploadedSubtitleFile, setUploadedSubtitleFile] = React.useState<SubtitleInfo>(emptySubtitle)
    const [VodDetails, setVodDetails] = React.useState<VodDetails>(props.vodDetails)
    const [imageModalTitle, setImageModalTitle] = React.useState<string>(null)
    const [subtitleFile, setSubtitleFile] = React.useState<File>(null)
    const [selectedImageName, setSelectedImageName] = React.useState<string>(null)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const [subtitleButtonLoading, setSubtitleButtonLoading] = React.useState<boolean>(false);
    const [previewModalOpen, setPreviewModalOpen] = React.useState<boolean>(false)

    const [uploadedImageFiles, setUploadedImageFiles] = React.useState<any>({splashscreen: null, thumbnail: null, poster: null})

    let subtitleBrowseButtonRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
        setVodDetails(props.vodDetails)
    }, [props.vodDetails.title, props.vodDetails.folders, props.vodDetails.description, props.vodDetails.online]);

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
        return props.vodDetails.subtitles ? props.vodDetails.subtitles.map((value, key) => {
            return {data: [
                <div className='flex'>
                    <Text key={"generalPage_subtitles_" + value.name + key} size={14} weight="reg">{value.name}</Text>
                    {
                        !value. url && 
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
                    <ActionIcon id={"deleteSubtitleTooltip" + key}><IconStyle onClick={() => props.deleteSubtitle(props.vodDetails.id, value.targetID, value.name)}>delete</IconStyle></ActionIcon>
                    <Tooltip target={"deleteSubtitleTooltip" + key}>Delete</Tooltip>
                    {/* <ActionIcon id={"editSubtitleTooltip" + key}><IconStyle onClick={() => editSubtitle(value)}>edit</IconStyle></ActionIcon>
                    <Tooltip target={"editSubtitleTooltip" + key}>Edit</Tooltip> */}
                </IconContainer>
            ]}
        })
        : null
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
            props.addSubtitle(subtitleFile, props.vodDetails.uploadurl, {...uploadedSubtitleFile, targetID: props.vodDetails.subtitles[props.vodDetails.subtitles.length - 1].targetID}, props.vodDetails.id, () => {setSubtitleButtonLoading(false)})
            setUploadedSubtitleFile(emptySubtitle)
            setSubtitleModalOpen(false);
        }
    }, [props.vodDetails.uploadurl])
    
    const handleSubtitleSubmit = () => {
        setSubtitleButtonLoading(true)
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

    let posterEnable = Object.keys(props.vodDetails.poster).length !== 0;

    const vodAdvancedLinksOptions = [
        { id: "thumbnail", label: "Thumbnail", enabled: true, link: props.vodDetails.thumbnail.url },
        { id: "splashscreen", label: "Splashscreen", enabled: true, link: props.vodDetails.splashscreen.url },
        { id: "poster", label: "Poster", enabled: true, link: posterEnable ? props.vodDetails.poster.url : '' },
        // { id: "embed", label: "Embed Code", enabled: true, link: `<script id="${userId}-vod-${props.vodDetails.id}" width="590" height="431" src="https://player.dacast.com/js/player.js?contentId=${userId}-vod-${props.vodDetails.id}"  class="dacast-video"></script>` },
        // { id: "video", label: "Video", enabled: true, link: 'https://prod-nplayer.dacast.com/index.html?contentId=vod-' + props.vodId },
        // { id: "download", label: "Download", enabled: getPrivilege('privilege-web-download'), link: 'todo' },
        { id: "m3u8", label: "M3U8", enabled: getPrivilege('privilege-unsecure-m3u8'), link: null }
    ]

    let splashScreenEnable = Object.keys(props.vodDetails.splashscreen).length !== 0;
    let thumbnailEnable = Object.keys(props.vodDetails.thumbnail).length !== 0;
    
    return (
        VodDetails &&
            <React.Fragment>
                <Card className="col-12 clearfix">
                    <div className="details col col-12">
                        <header className="flex justify-between mb2">
                            <Text size={20} weight="med">Details</Text>
                            { getPrivilege('privilege-web-download') && <Button sizeButton="xs" typeButton="secondary">Download</Button>}
                        </header>
                        <Toggle
                            className="col col-12 mb2"
                            defaultChecked={VodDetails.online}
                            onChange={() => {setVodDetails({ ...VodDetails, online: !VodDetails.online })}}
                            label="Video Online"
                        />
                        <Input
                            className={ClassHalfXsFullMd + "pr2 mb2"}
                            label="Title"
                            value={VodDetails.title}
                            onChange={event => setVodDetails({...VodDetails, title: event.currentTarget.value })}
                        />
                        <InputTags
                            className={ClassHalfXsFullMd + "mb2"}
                            label="Folders"
                            disabled
                            greyBackground
                            defaultTags={props.vodDetails.folders} 
                        />

                        <Input
                            className={ClassHalfXsFullMd + "pr2 mb2"}
                            type="textarea"
                            label="Description"
                            value={VodDetails.description ? VodDetails.description : ''}
                            onChange={event => setVodDetails({ ...VodDetails, description: event.currentTarget.value })}
                        />
                        <div className={"col col-3 flex flex-column"}>
                            <LinkBoxLabel>
                                <Text size={14} weight="med">Content ID</Text>
                            </LinkBoxLabel>
                            <LinkBox>
                                <LinkText size={14} weight="reg">{props.vodDetails.id}</LinkText>
                                <IconStyle className='pointer' id="copyContentIdTooltip" onClick={() => updateClipboard(props.vodDetails.id, 'Content ID Copied')}>file_copy_outlined</IconStyle>
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
                                <Text size={14} weight="med">Iframe Embed Code</Text>
                            </LinkBoxLabel>
                            <LinkBox>
                                <LinkText size={14} weight="reg">{`<iframe src="https://${process.env.BASE_IFRAME_URL}/vod/${userId}/${props.vodDetails.id}" width="590" height="431" frameborder="0" scrolling="no" allow="autoplay" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>`}</LinkText>
                                <IconStyle className='pointer' id="copyEmbedTooltip" onClick={() => { logAmplitudeEvent('embed video iframe'); updateClipboard(`<iframe src="https://${process.env.BASE_IFRAME_URL}/vod/${userId}/${props.vodDetails.id}" width="590" height="431" frameborder="0" scrolling="no" allow="autoplay" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>`, 'Iframe Embed Code Copied') } }>file_copy_outlined</IconStyle>
                                <Tooltip target="copyEmbedTooltip">Copy to clipboard</Tooltip>
                            </LinkBox>
                        </div>
                        <div className={ClassHalfXsFullMd + "mt2 flex flex-column"}>
                            <LinkBoxLabel>
                                <Text size={14} weight="med">Share Link</Text>
                            </LinkBoxLabel>
                            <LinkBox>
                                <LinkText size={14} weight="reg">{`https://${process.env.BASE_IFRAME_URL}/vod/${userId}/${props.vodDetails.id}`}</LinkText>
                                <IconStyle className='pointer' id="copyShareLinkTooltip" onClick={() => { logAmplitudeEvent('share video'); updateClipboard(`https://${process.env.BASE_IFRAME_URL}/vod/${userId}/${props.vodDetails.id}`, 'Share Link Copied')} }>file_copy_outlined</IconStyle>
                                <Tooltip target="copyShareLinkTooltip">Copy to clipboard</Tooltip>
                            </LinkBox>
                        </div>
                        <div className={ClassHalfXsFullMd + "mt2 pr2 flex flex-column"}>
                            <LinkBoxLabel>
                                <Text size={14} weight="med">JS Embed Code</Text>
                            </LinkBoxLabel>
                            <LinkBox>
                                <LinkText size={14} weight="reg">{`<script id="${userId}-vod-${props.vodDetails.id}" width="590" height="431" src="https://player.dacast.com/js/player.js?contentId=${userId}-vod-${props.vodDetails.id}"  class="dacast-video"></script>`}</LinkText>
                                <IconStyle className='pointer' id="copyShareLinkTooltip" onClick={() => { logAmplitudeEvent('embed video js'); updateClipboard(`<script id="${userId}-vod-${props.vodDetails.id}" width="590" height="431" src="https://player.dacast.com/js/player.js?contentId=${userId}-vod-${props.vodDetails.id}"  class="dacast-video"></script>`, 'JS Embed Code Copied') } }>file_copy_outlined</IconStyle>
                                <Tooltip target="copyShareLinkTooltip">Copy to clipboard</Tooltip>
                            </LinkBox>
                        </div>
                        <Divider className="col col-12" />
                    </div>
                    <div className="thumbnail col col-12">
                        <Text className="col col-12" size={20} weight="med">Images</Text>
                        <Text className="col col-12 pt1" size={14} weight="reg">Upload image assets for your content.</Text>
                        <ImagesContainer className="col col-12 pt2">
                            <ImageContainer className="mr2 xs-mr0 xs-mb25">
                                <div className="flex flex-center">
                                    <Text size={16} weight="med" className="mr1">Splashscreen</Text>
                                    <IconStyle id="splashscreenTooltip">info_outlined</IconStyle>
                                    <Tooltip target="splashscreenTooltip">Displayed when your content is offline</Tooltip>
                                </div>
                                <ImageArea className="mt2">
                                    <ButtonSection>
                                        <Button 
                                            className="clearfix right my1 mr1" sizeButton="xs" typeButton="secondary"
                                            onClick={() => {setImageModalTitle("Change Splashscreen");setSelectedImageName(props.vodDetails.splashscreen.url);setImageModalOpen(true)}}>
                                            {
                                                splashScreenEnable || uploadedImageFiles.splashscreen  ?
                                                    "Change" : "Add"
                                            }
                                        </Button>
                                    </ButtonSection> 
                                    {(splashScreenEnable || uploadedImageFiles.splashscreen) &&<ImageSection> <SelectedImage src={uploadedImageFiles.splashscreen ? uploadedImageFiles.splashscreen : props.vodDetails.splashscreen.url} /></ImageSection>   }
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
                                        <Button sizeButton="xs" className="clearfix right m1" typeButton="secondary" onClick={() => {setImageModalTitle("Change Thumbnail");setSelectedImageName(props.vodDetails.thumbnail.url);setImageModalOpen(true)}}>
                                            {
                                                thumbnailEnable  ?
                                                    "Change" : "Add"
                                            }
                                        </Button>
                                    </ButtonSection>
                                    {(thumbnailEnable || uploadedImageFiles.thumbnail) &&<ImageSection> <SelectedImage src={uploadedImageFiles.thumbnail ? uploadedImageFiles.thumbnail : props.vodDetails.thumbnail.url} /></ImageSection> }  
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
                                            (posterEnable || uploadedImageFiles.poster) && 
                                                <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {props.deleteFile(props.vodDetails.id, props.vodDetails.poster.targetID, "Poster Image")}}>Delete</Button>
                                        }
                                        
                                        <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {setImageModalTitle("Change Poster");setSelectedImageName(props.vodDetails.poster.url);setImageModalOpen(true)}}>
                                            {
                                                posterEnable || uploadedImageFiles.poster  ?
                                                    "Change" : "Add"
                                            }
                                        </Button>
                                    </ButtonSection>
                                    {(posterEnable || uploadedImageFiles.poster) && <ImageSection> <img height='auto' width="160px" src={uploadedImageFiles.poster ? uploadedImageFiles.poster : props.vodDetails.poster.url} /></ImageSection>}  
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
                        </AdvancedLinksContainer>
                    </div>

                   { subtitleModalOpen && 
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
                                        <Text className="ml2" color="gray-1" size={14} weight="reg">{uploadedSubtitleFile.name}</Text>
                                        <button style={{ border: "none", backgroundColor: "inherit" }}>
                                            <IconStyle onClick={() => setUploadedSubtitleFile({ ...uploadedSubtitleFile, name: "" })} className='flex items-center' customsize={14}>close</IconStyle>
                                        </button>
                                    </SubtitleFile>
                                }
                                <InputCheckbox className='col col-12 my2' id='convertToUtf8Checkbox' label='Convert to UTF-8' defaultChecked={uploadedSubtitleFile.convertToUTF8 ? true : false} onChange={() => {setUploadedSubtitleFile({...uploadedSubtitleFile, convertToUTF8: !uploadedSubtitleFile.convertToUTF8})}} />
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
                                contentId={props.vodId} 
                                contentType='vod'
                                uploadFromVideoAction={props.uploadImageFromVideo}
                                uploadUrl={props.vodDetails.uploadurl} 
                                getUploadUrl={props.getUploadUrl} 
                                title={imageModalTitle} 
                                toggle={() => setImageModalOpen(false)} 
                                opened={imageModalOpen === true} 
                                submit={props.uploadFile}
                                uploadedImageFiles={uploadedImageFiles}
                                setUploadedImageFiles={setUploadedImageFiles}
                            />
                    }

                </Card>
                <ButtonContainer>
                    <Button isLoading={buttonLoading} className="mr2" onClick={() => {setButtonLoading(true); props.editVodDetails(VodDetails, () => setButtonLoading(false)) } }>Save</Button>
                    <Button typeButton="tertiary" onClick={() => {setVodDetails(props.vodDetails);props.showToast("Changes have been discarded", 'fixed', "success")}}>Discard</Button>
                </ButtonContainer>
                {
                    previewModalOpen && <PreviewModal contentId={userId + '-vod-' + props.vodDetails.id} toggle={setPreviewModalOpen} isOpened={previewModalOpen} />
                }
                <Prompt when={ (VodDetails.online !== props.vodDetails.online) || (VodDetails.title !== props.vodDetails.title) || (VodDetails.description !== props.vodDetails.description) } message='' />
            </React.Fragment>
            
    )

}

const SubtitleFile = styled.div`
    display: flex;
    background-color: ${props => props.theme.colors["gray-10"]};
    height: 32px;
    align-items: center;
    justify-content: space-between;
`