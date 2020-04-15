import React from 'react';
import { Card } from '../../../../components/Card/Card';
import { Text } from "../../../../components/Typography/Text"
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Divider, LinkBoxContainer, LinkBoxLabel, LinkBox, LinkText, ImagesContainer, ButtonContainer, ImageContainer, ImageArea, SelectedImage, ImageSection, ButtonSection, AdvancedLinksContainer } from '../../../shared/General/GeneralStyle';
import { IconStyle } from '../../../../shared/Common/Icon';
import { PlaylistDetails } from '../../../redux-flow/store/Playlists/General/types';
import { InputTags } from '../../../../components/FormsComponents/Input/InputTags';
import { ImageModal } from '../../../shared/General/ImageModal';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { Prompt } from 'react-router';
import { Toggle } from '../../../../components/Toggle/toggle';

interface PlaylistGeneralComponentProps {
    playlistDetails: PlaylistDetails;
    editPlaylistDetails: Function;
    changePlaylistThumbnail: Function;
    changePlaylistSplashscreen: Function;
    changePlaylistPoster: Function;
    showToast: Function;
}

var moment = require('moment-timezone');

export const PlaylistGeneralPage = (props: PlaylistGeneralComponentProps) => {

    const [imageModalOpen, setImageModalOpen] = React.useState<boolean>(false)
    const [imageModalTitle, setImageModalTitle] = React.useState<string>(null)
    const [newPlaylistDetails, setNewPlaylistDetails] = React.useState<PlaylistDetails>(props.playlistDetails)
    const [advancedLinksExpanded, setAdvancedLinksExpanded] = React.useState<boolean>(false)

    React.useEffect(() => {
        setNewPlaylistDetails(props.playlistDetails)
    }, [props.playlistDetails]);

    React.useEffect(() => {
    }, [newPlaylistDetails])

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
            return  props.changePlaylistSplashscreen()
           
        } else if (imageModalTitle === "Change Thumbnail") {
            return props.changePlaylistThumbnail()
        } else {
            return props.changePlaylistPoster()
        }
    }

    const playlistAdvancedLinksOptions = [
        { id: "thumb", label: "Thumbnail" },
        { id: "splashscreen", label: "Splashscreen" },
        { id: "poster", label: "Poster" },
        { id: "embed", label: "Embed Code" }
    ]

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
                        className="col col-6 pr2"
                        label="Title"
                        value={newPlaylistDetails.title}
                        onChange={event => setNewPlaylistDetails({ ...newPlaylistDetails, ["title"]: event.currentTarget.value })}
                    />
                    <InputTags
                        className="col col-6"
                        label="Folders"
                        disabled
                        greyBackground
                        defaultTags={props.playlistDetails.folder} 
                    />
                    <Input
                        className="col col-6 pr2 pt2"
                        label="Description"
                        value={newPlaylistDetails.description}
                        onChange={event => setNewPlaylistDetails({ ...newPlaylistDetails, ["description"]: event.currentTarget.value })}
                    />
                    <div className="col col-3 pt2 flex flex-column">
                        <LinkBoxLabel>
                            <Text size={14} weight="med">Content ID</Text>
                        </LinkBoxLabel>
                        <LinkBox>
                            <LinkText size={14} weight="reg">{props.playlistDetails.id}</LinkText>
                            <IconStyle className='pointer' id="copyContentIdTooltip" onClick={() => {copyKey(props.playlistDetails.id);props.showToast(`Content ID copied to clipboard`, 'flexible', "success")}}>file_copy_outlined</IconStyle>
                            <Tooltip target="copyContentIdTooltip">Copy to clipboard</Tooltip>
                        </LinkBox>
                    </div>
                </div>
                <Divider className="col col-12" />
                <div className='col col-12'>
                    <Text className='col col-12' size={20} weight='med'>Sharing</Text>
                    <Text className='pt2 col col-12' size={14}>The Embed Code can add content to your website and the Share Link can be shared on social media.</Text>

                    <div className="col col-6 mt2 pr2 flex flex-column">
                        <LinkBoxLabel>
                            <Text size={14} weight="med">Embed Code</Text>
                        </LinkBoxLabel>
                        <LinkBox>
                            <LinkText size={14} weight="reg">&lt;iframe src="//iframe.streamingasaservice.net&gt;</LinkText>
                            <IconStyle className='pointer' id="copyEmbedTooltip" onClick={() => {copyKey("embed code here");props.showToast("Embed code copied to clipboard", 'flexible', "success")}}>file_copy_outlined</IconStyle>
                            <Tooltip target="copyEmbedTooltip">Copy to clipboard</Tooltip>
                        </LinkBox>
                    </div>
                    <div className="col col-6 mt2 flex flex-column">
                        <LinkBoxLabel>
                            <Text size={14} weight="med">Share Link</Text>
                        </LinkBoxLabel>
                        <LinkBox>
                            <LinkText size={14} weight="reg">https://iframe.dacast.com/b/1234/f/929020</LinkText>
                            <IconStyle className='pointer' id="copyShareTooltip" onClick={() => {copyKey("share link here");props.showToast("Share link copied to clipboard", 'flexible', "success")}}>file_copy_outlined</IconStyle>
                            <Tooltip target="copyShareTooltip">Copy to clipboard</Tooltip>
                        </LinkBox>
                    </div>
                    <Divider className="col col-12" />
                </div>
                <div className="thumbnail col col-12">
                    <Text className="col col-12" size={20} weight="med">Images</Text>
                    <Text className="col col-12 pt1" size={14} weight="reg">Upload image assets for your content.</Text>
                    <ImagesContainer className="col col-12 pt2 flex">
                        <ImageContainer className="mr2">
                            <div className="flex flex-center">
                                <Text size={16} weight="med" className="mr1">Splashscreen</Text>
                                <IconStyle id="splashscreenTooltip">info_outlined</IconStyle>
                                <Tooltip target="splashscreenTooltip">Splashscreen Tooltip</Tooltip>
                            </div>
                            <ImageArea className="mt2">
                                <ButtonSection>
                                    {
                                        props.playlistDetails.splashscreen ?
                                            <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {}}>Delete</Button> : null
                                    }
                                    <Button className="clearfix right my1 mr1" sizeButton="xs" typeButton="secondary"
                                        onClick={() => {setImageModalTitle("Change Splashscreen");setImageModalOpen(true)}}>
                                        {
                                            props.playlistDetails.splashscreen ?
                                                "Change" : "Add"
                                        }
                                    </Button>
                                </ButtonSection>
                                <ImageSection> <SelectedImage src={props.playlistDetails.splashscreen} /></ImageSection>  
                            </ImageArea>
                            <Text size={10} weight="reg" color="gray-3">Minimum 480px x 480px, formats: JPG, PNG, SVG, GIF</Text>
                        </ImageContainer>
                        <ImageContainer className="mr2">
                            <div className="flex flex-center">
                                <Text size={16} weight="med" className="mr1">Thumbnail</Text>  <IconStyle id="thumbnailTooltip">info_outlined</IconStyle>
                                <Tooltip target="thumbnailTooltip">Thumbnail Tooltip</Tooltip>
                            </div>
                            <ImageArea className="mt2">
                                <ButtonSection>
                                    {
                                        props.playlistDetails.thumbnail ?
                                            <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {}}>Delete</Button> : null
                                    }
                                    <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {setImageModalTitle("Change Thumbnail");setImageModalOpen(true)}}>
                                        {
                                            props.playlistDetails.thumbnail ?
                                                "Change" : "Add"
                                        }
                                    </Button>
                                </ButtonSection>  
                                <ImageSection> <SelectedImage src={props.playlistDetails.thumbnail} /></ImageSection>
                            </ImageArea>
                            <Text size={10} weight="reg" color="gray-3">Always 160px x 90px, formats: JPG, PNG, SVG, GIF</Text>
                        </ImageContainer>
                        <ImageContainer>
                            <div className="flex flex-center">
                                <Text className="mr1" size={16} weight="med">Poster</Text>  <IconStyle id="posterTooltip">info_outlined</IconStyle>
                                <Tooltip target="posterTooltip">Poster Tooltip</Tooltip>
                            </div>
                            <ImageArea className="mt2">
                                <ButtonSection>
                                    {
                                        props.playlistDetails.poster ?
                                            <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {}}>Delete</Button> : null
                                    }
                                    <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {setImageModalTitle("Change Poster");setImageModalOpen(true)}}>
                                        {
                                            props.playlistDetails.poster ?
                                                "Change" : "Add"
                                        }
                                    </Button>
                                </ButtonSection>
                                <ImageSection> <SelectedImage src={props.playlistDetails.poster} /></ImageSection>
                            </ImageArea>
                            <Text size={10} weight="reg" color="gray-3">Minimum 480px x 480px, formats: JPG, PNG, SVG, GIF</Text>
                        </ImageContainer>
                    </ImagesContainer>
                </div>
                <Divider className="col col-12" />
                <div className="col col-12 advancedLinks">
                    <div onClick={() => setAdvancedLinksExpanded(!advancedLinksExpanded)}>
                        <IconStyle className="col col-1">{advancedLinksExpanded ? "expand_less" : "expand_more"}</IconStyle>
                        <Text className="col col-11" size={20} weight="med">Advanced  Links</Text>
                    </div>                 
                    <AdvancedLinksContainer className="col col-12" isExpanded={advancedLinksExpanded}>
                        {playlistAdvancedLinksOptions.map((item) => {
                            return (
                                <LinkBoxContainer className="col col-6">
                                    <LinkBoxLabel>
                                        <Text size={14} weight="med">{item.label}</Text>
                                    </LinkBoxLabel>
                                    <LinkBox>
                                        <Text size={14} weight="reg">https://view.vzaar.com/20929875/{item.id}</Text>
                                        <IconStyle className='pointer' id={item.id} onClick={() => {copyKey("embed code here");props.showToast(`${item.label} copied to clipboard`, 'flexible', "success")}}>file_copy_outlined</IconStyle>
                                        <Tooltip target={item.id}>Copy to clipboard</Tooltip>
                                    </LinkBox>
                                </LinkBoxContainer>

                            )
                        })}
                    </AdvancedLinksContainer>
                </div>
    
                <ImageModal toggle={() => setImageModalOpen(false)} opened={imageModalOpen === true} submit={handleImageModalFunction} title={imageModalTitle} />
            </Card>
            <ButtonContainer>
                <Button className="mr2" type="button" onClick={() => props.editPlaylistDetails(newPlaylistDetails)}>Save</Button>
                <Button typeButton="tertiary" onClick={() => {setNewPlaylistDetails(props.playlistDetails);props.showToast("Changes have been discarded", 'flexible', "success")}}>Discard</Button>
            </ButtonContainer>
            <Prompt when={newPlaylistDetails !== props.playlistDetails} message='' />
        </React.Fragment>
    )
}