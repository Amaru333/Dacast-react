import React from 'react';
import { Card } from '../../../../components/Card/Card';
import { Text } from "../../../../components/Typography/Text"
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Divider, LinkBoxContainer, LinkBoxLabel, LinkBox, LinkText, ImagesContainer, ButtonContainer, ImageContainer, ImageArea, SelectedImage, ImageSection, ButtonSection, AdvancedLinksContainer, ClassHalfXsFullMd } from '../../../shared/General/GeneralStyle';
import { IconStyle } from '../../../../shared/Common/Icon';
import { PlaylistDetails } from '../../../redux-flow/store/Playlists/General/types';
import { InputTags } from '../../../../components/FormsComponents/Input/InputTags';
import { ImageModal } from '../../../shared/General/ImageModal';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { Prompt } from 'react-router';
import { Toggle } from '../../../../components/Toggle/toggle';
import { updateClipboard } from '../../../utils/utils';
import { addTokenToHeader } from '../../../utils/token';
import { PreviewModal } from '../../../shared/Common/PreviewModal';

interface PlaylistGeneralComponentProps {
    playlistDetails: PlaylistDetails;
    editPlaylistDetails: Function;
    getUploadUrl: Function;
    uploadFile: Function;
    deleteFile: Function;
    showToast: Function;
}

export const PlaylistGeneralPage = (props: PlaylistGeneralComponentProps) => {

    const {userId} = addTokenToHeader()

    const [imageModalOpen, setImageModalOpen] = React.useState<boolean>(false)
    const [imageModalTitle, setImageModalTitle] = React.useState<string>(null)
    const [newPlaylistDetails, setNewPlaylistDetails] = React.useState<PlaylistDetails>(props.playlistDetails)
    const [advancedLinksExpanded, setAdvancedLinksExpanded] = React.useState<boolean>(false)
    const [selectedImageName, setSelectedImageName] = React.useState<string>(null)
    const [uploadedImageFiles, setUploadedImageFiles] = React.useState<any>({splashscreen: null, thumbnail: null, poster: null})
    const [previewModalOpen, setPreviewModalOpen] = React.useState<boolean>(false)

    React.useEffect(() => {
        setNewPlaylistDetails(props.playlistDetails)
    }, [props.playlistDetails.title, props.playlistDetails.folders, props.playlistDetails.description]);

    const handleImageModalFunction = () => {
        if (imageModalTitle === "Change Splashscreen") {
            return  'playlist-splashscreen'
        } else if (imageModalTitle === "Change Thumbnail") {
            return 'playlist-thumbnail'
        } else if(imageModalTitle === 'Change Poster') {
            return 'playlist-poster'
        } else {
            return ''
        }
    }

    const playlistAdvancedLinksOptions = [
        { id: "thumbnail", label: "Thumbnail", enabled: true, link: props.playlistDetails.thumbnail.url },
        { id: "splashscreen", label: "Splashscreen", enabled: true, link: props.playlistDetails.splashscreen.url},
        { id: "poster", label: "Poster", enabled: true, link: props.playlistDetails.poster.url},
        { id: "embed", label: "Embed Code", enabled: true, link: `<script id="${userId}-playlist-${props.playlistDetails.id}" width="590" height="431" src="https://player.dacast.com/js/player.js?contentId=${userId}-playlist-${props.playlistDetails.id}"  class="dacast-video"></script>` },
    ]

    let splashScreenEnable = Object.keys(props.playlistDetails.splashscreen).length !== 0;
    let thumbnailEnable = Object.keys(props.playlistDetails.thumbnail).length !== 0;
    let posterEnable = Object.keys(props.playlistDetails.poster).length !== 0;

    return (
        <React.Fragment>
            <Card className="col-12 clearfix">
                <div className="details col col-12">
                    <header className="flex justify-between mb2">
                        <Text size={20} weight="med">Details</Text>
                    </header>
                    <Toggle
                        className="col col-12 pb2"
                        defaultChecked={newPlaylistDetails.online}
                        onChange={() => setNewPlaylistDetails({...newPlaylistDetails, online: !newPlaylistDetails.online})}
                        label="Playlist Online"
                    />
                    <Input
                        className={ClassHalfXsFullMd + "pr2 mb2"}
                        label="Title"
                        value={newPlaylistDetails.title}
                        onChange={event => setNewPlaylistDetails({ ...newPlaylistDetails, ["title"]: event.currentTarget.value })}
                    />
                    <InputTags
                        className={ClassHalfXsFullMd + "mb2"}
                        label="Folders"
                        disabled
                        greyBackground
                        defaultTags={props.playlistDetails.folders} 
                    />
                    <Input
                        className={ClassHalfXsFullMd + "pr2 mb2"}
                        label="Description"
                        value={newPlaylistDetails.description}
                        type="textarea"
                        onChange={event => setNewPlaylistDetails({ ...newPlaylistDetails, ["description"]: event.currentTarget.value })}
                    />
                    <div className={"col col-3 flex flex-column"}>
                        <LinkBoxLabel>
                            <Text size={14} weight="med">Content ID</Text>
                        </LinkBoxLabel>
                        <LinkBox>
                            <LinkText size={14} weight="reg">{props.playlistDetails.id}</LinkText>
                            <IconStyle className='pointer' id="copyContentIdTooltip" onClick={() => {updateClipboard(props.playlistDetails.id, 'Content ID Copied')}}>file_copy_outlined</IconStyle>
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

                    <div className={ClassHalfXsFullMd + "mt2 pr2 flex flex-column"} >
                        <LinkBoxLabel>
                            <Text size={14} weight="med">Embed Code</Text>
                        </LinkBoxLabel>
                        <LinkBox>
                            <LinkText size={14} weight="reg">{`<iframe src="https://${process.env.BASE_IFRAME_URL}/playlist/${userId}/${props.playlistDetails.id}" width="590" height="431" frameborder="0" scrolling="no" allow="autoplay" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>`}</LinkText>
                            <IconStyle className='pointer' id="copyEmbedTooltip" onClick={() => updateClipboard(`<iframe src="https://${process.env.BASE_IFRAME_URL}/playlist/${userId}/${props.playlistDetails.id}" width="590" height="431" frameborder="0" scrolling="no" allow="autoplay" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>`, 'Embed Code Copied')}>file_copy_outlined</IconStyle>
                            <Tooltip target="copyEmbedTooltip">Copy to clipboard</Tooltip>
                        </LinkBox>
                    </div>
                    <div className={ClassHalfXsFullMd + "mt2 flex flex-column"}>
                        <LinkBoxLabel>
                            <Text size={14} weight="med">Share Link</Text>
                        </LinkBoxLabel>
                        <LinkBox>
                            <LinkText size={14} weight="reg">{`https://${process.env.BASE_IFRAME_URL}/playlist/${userId}/${props.playlistDetails.id}`}</LinkText>
                            <IconStyle className='pointer' id="copyShareTooltip" onClick={() =>  updateClipboard(`https://${process.env.BASE_IFRAME_URL}/playlist/${userId}/${props.playlistDetails.id}`, "Share Link Copied")}>file_copy_outlined</IconStyle>
                            <Tooltip target="copyShareTooltip">Copy to clipboard</Tooltip>
                        </LinkBox>
                    </div>
                    <Divider className="col col-12" />
                </div>
                <div className="thumbnail col col-12">
                    <Text className="col col-12" size={20} weight="med">Images</Text>
                    <Text className="col col-12 pt1" size={14} weight="reg">Upload image assets for your content.</Text>
                    <ImagesContainer className="col col-12 pt2 flex">
                        <ImageContainer className="mr2 xs-mr0 xs-mb25">
                            <div className="flex flex-center">
                                <Text size={16} weight="med" className="mr1">Splashscreen</Text>
                                <IconStyle id="splashscreenTooltip">info_outlined</IconStyle>
                                <Tooltip target="splashscreenTooltip">Displayed when your content is offline</Tooltip>
                            </div>
                            <ImageArea className="mt2">
                                <ButtonSection>
                                    {
                                        splashScreenEnable || uploadedImageFiles.splashscreen ?
                                            <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {}}>Delete</Button> : null
                                    }
                                    <Button className="clearfix right my1 mr1" sizeButton="xs" typeButton="secondary"
                                        onClick={() => {setImageModalTitle("Change Splashscreen");setImageModalOpen(true)}}>
                                        {
                                            splashScreenEnable || uploadedImageFiles.splashscreen ?
                                                "Change" : "Add"
                                        }
                                    </Button>
                                </ButtonSection>
                                {(splashScreenEnable || uploadedImageFiles.splashscreen) &&<ImageSection> <SelectedImage src={uploadedImageFiles.splashscreen ? uploadedImageFiles.splashscreen : props.playlistDetails.splashscreen.url} /></ImageSection>}  
                            </ImageArea>
                            <Text size={10} weight="reg" color="gray-3">Minimum 480px x 480px, formats: JPG, PNG, SVG, GIF</Text>
                        </ImageContainer>
                        <ImageContainer className="mr2 xs-mb25 xs-mr0">
                            <div className="flex flex-center">
                                <Text size={16} weight="med" className="mr1">Thumbnail</Text>  <IconStyle id="thumbnailTooltip">info_outlined</IconStyle>
                                <Tooltip target="thumbnailTooltip">A small image used in Playlists</Tooltip>
                            </div>
                            <ImageArea className="mt2">
                                <ButtonSection>
                                    {
                                        thumbnailEnable || uploadedImageFiles.thumbnail ?
                                            <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {}}>Delete</Button> : null
                                    }
                                    <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {setImageModalTitle("Change Thumbnail");setImageModalOpen(true)}}>
                                        {
                                            thumbnailEnable || uploadedImageFiles.thumbnail ?
                                                "Change" : "Add"
                                        }
                                    </Button>
                                </ButtonSection>  
                            { (thumbnailEnable || uploadedImageFiles.thumbnail) &&   <ImageSection> <SelectedImage src={uploadedImageFiles.thumbnail ? uploadedImageFiles.thumbnail : props.playlistDetails.thumbnail.url} /></ImageSection>}
                            </ImageArea>
                            <Text size={10} weight="reg" color="gray-3">Always 160px x 90px, formats: JPG, PNG, SVG, GIF</Text>
                        </ImageContainer>
                        <ImageContainer>
                            <div className="flex flex-center">
                                <Text className="mr1" size={16} weight="med">Poster</Text>  <IconStyle id="posterTooltip">info_outlined</IconStyle>
                                <Tooltip target="posterTooltip">A large image that you can use for any purpose</Tooltip>
                            </div>
                            <ImageArea className="mt2">
                                <ButtonSection>
                                    {
                                        posterEnable || uploadedImageFiles.poster && 
                                            <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {}}>Delete</Button>
                                    }
                                    <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {setImageModalTitle("Change Poster");setImageModalOpen(true)}}>
                                        {
                                            posterEnable || uploadedImageFiles.poster ?
                                                "Change" : "Add"
                                        }
                                    </Button>
                                </ButtonSection>
                                {(posterEnable || uploadedImageFiles.poster) && <ImageSection> <img height='auto' width="160px" src={uploadedImageFiles.poster ? uploadedImageFiles.poster : props.playlistDetails.poster.url} /></ImageSection>}
                            </ImageArea>
                            <Text size={10} weight="reg" color="gray-3">Minimum 480px x 480px, formats: JPG, PNG, SVG, GIF</Text>
                        </ImageContainer>
                    </ImagesContainer>
                </div>
                <Divider className="col col-12" />
                <div className="col col-12 advancedLinks">
                    <div className="mb2 clearfix" onClick={() => setAdvancedLinksExpanded(!advancedLinksExpanded)}>
                        <IconStyle className="col col-1">{advancedLinksExpanded ? "expand_less" : "expand_more"}</IconStyle>
                        <Text className="col col-11" size={20} weight="med">Advanced  Links</Text>
                    </div>                 
                    <AdvancedLinksContainer className="col col-12" isExpanded={advancedLinksExpanded}>
                        {playlistAdvancedLinksOptions.map((item) => {
                            {
                                if(item.link && item.link !== ''){
                                    return (
                                        <LinkBoxContainer className={ClassHalfXsFullMd+"mb2"}>
                                            <LinkBoxLabel>
                                                <Text size={14} weight="med">{item.label}</Text>
                                            </LinkBoxLabel>
                                            <LinkBox>
                                                <LinkText size={14} weight="reg">{item.link}</LinkText>
                                                <IconStyle className='pointer' id={item.id} onClick={() => updateClipboard(item.link, `${item.label} Copied`)}>file_copy_outlined</IconStyle>
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
                        uploadUrl={props.playlistDetails.uploadurl} 
                        getUploadUrl={props.getUploadUrl} 
                        contentId={props.playlistDetails.id} 
                        contentType='playlist'
                        imageType={handleImageModalFunction()} 
                        toggle={() => setImageModalOpen(false)} 
                        opened={imageModalOpen === true} 
                        submit={props.uploadFile} 
                        title={imageModalTitle}
                        uploadedImageFiles={uploadedImageFiles}
                        setUploadedImageFiles={setUploadedImageFiles}
                    />
                }            
            </Card>
            <ButtonContainer>
                <Button className="mr2" type="button" onClick={() => props.editPlaylistDetails(newPlaylistDetails)}>Save</Button>
                <Button typeButton="tertiary" onClick={() => {setNewPlaylistDetails(props.playlistDetails);props.showToast("Changes have been discarded", 'flexible', "success")}}>Discard</Button>
            </ButtonContainer>
            {
                previewModalOpen && <PreviewModal contentId={userId + '-playlist-' + props.playlistDetails.id} toggle={setPreviewModalOpen} isOpened={previewModalOpen} />
            }
            <Prompt when={JSON.stringify(newPlaylistDetails) !== JSON.stringify(props.playlistDetails)} message='' />
        </React.Fragment>
    )
}