import React from 'react';
import { Card } from '../../../components/Card/Card';
import { Text } from "../../../components/Typography/Text"
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Toggle } from '../../../components/Toggle/toggle';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { Divider, LinkBoxContainer, LinkBoxLabel, LinkBox, LinkText, IconButton, ImagesContainer, ButtonContainer, ImageContainer, ImageArea, SelectedImage, ImageSection, ButtonSection } from '../../../shared/General/GeneralStyle';
import { Icon } from '@material-ui/core';
import { PlaylistDetails } from '../../../redux-flow/store/Playlists/General/types';
import { LiveImageModal } from '../../Live/General/ImageModal';

interface PlaylistGeneralComponentProps {
    playlistDetails: PlaylistDetails;
    editPlaylistDetails: Function;
    changePlaylistThumbnail: Function;
    changePlaylistSplashscreen: Function;
    changePlaylistPoster: Function;
}

var moment = require('moment-timezone');

export const PlaylistGeneralPage = (props: PlaylistGeneralComponentProps) => {

    const [imageModalOpen, setImageModalOpen] = React.useState<boolean>(false)
    const [imageModalTitle, setImageModalTitle] = React.useState<string>(null)
    const [newPlaylistDetails, setNewPlaylistDetails] = React.useState<PlaylistDetails>(props.playlistDetails)

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

    return (
        <React.Fragment>
            <Card className="col-12 clearfix">
                <div className="details col col-12">
                    <header className="flex justify-between">
                        <Text size={20} weight="med">Details</Text>
                    </header>
                    <Input
                        className="col col-6 pr2"
                        label="Title"
                        value={newPlaylistDetails.title}
                        onChange={event => setNewPlaylistDetails({ ...newPlaylistDetails, ["title"]: event.currentTarget.value })}
                    />
                    <Input
                        className="col col-6"
                        label="Folder"
                        value={newPlaylistDetails.folder}
                        onChange={event => setNewPlaylistDetails({ ...newPlaylistDetails, ["folder"]: event.currentTarget.value })}
                    />
                    <Input
                        className="col col-6 pr2 pt2"
                        label="Description"
                        value={newPlaylistDetails.description}
                        onChange={event => setNewPlaylistDetails({ ...newPlaylistDetails, ["description"]: event.currentTarget.value })}
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
                                <ImageSection> <SelectedImage src={props.playlistDetails.splashscreen} /></ImageSection>
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
                                <ImageSection> <SelectedImage src={props.playlistDetails.thumbnail} /></ImageSection>
                                <ButtonSection><Button sizeButton="xs" className="clearfix right m1" typeButton="secondary" onClick={() => {setImageModalTitle("Change Thumbnail");setImageModalOpen(true)}}>Change</Button></ButtonSection>  
                            </ImageArea>
                            <Text size={10} weight="reg" color="gray-3">Minimum 480px x 480px, formats: JPG, PNG, SVG, GIF</Text>
                        </ImageContainer>
                        <ImageContainer className="">
                            <div className="flex flex-center">
                                <Text className="mr1" size={16} weight="med">Poster</Text>  <Icon>info_outlined</Icon>
                            </div>
                            <ImageArea className="mt2">
                                <ImageSection> <SelectedImage src={props.playlistDetails.poster} /></ImageSection>
                                <ButtonSection><Button sizeButton="xs" className="clearfix right m1" typeButton="secondary" onClick={() => {setImageModalTitle("Change Poster");setImageModalOpen(true)}}>Change</Button></ButtonSection>  
                            </ImageArea>
                            <Text size={10} weight="reg" color="gray-3">Always 160px x 90px, formats: JPG, PNG, SVG, GIF </Text>
                        </ImageContainer>

                    </ImagesContainer>
                </div>
    
                <LiveImageModal toggle={() => setImageModalOpen(false)} opened={imageModalOpen === true} submit={handleImageModalFunction} title={imageModalTitle} />
            </Card>
            <ButtonContainer>
                <Button className="mr2" type="button" onClick={() => props.editPlaylistDetails(newPlaylistDetails)}>Save</Button>
                <Button typeButton="secondary" onClick={() => setNewPlaylistDetails(props.playlistDetails)}>Discard</Button>
            </ButtonContainer>
        </React.Fragment>
    )
}