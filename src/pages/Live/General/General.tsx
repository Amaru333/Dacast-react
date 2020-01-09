import React from 'react';
import { Card } from '../../../components/Card/Card';
import { Text } from "../../../components/Typography/Text"
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Toggle } from '../../../components/Toggle/toggle';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { Divider, LinkBoxContainer, LinkBoxLabel, LinkBox, LinkText, IconButton, ImagesContainer, ButtonContainer, ImageContainer, ImageArea, SelectedImage, ImageSection, ButtonSection } from '../../../shared/General/GeneralStyle';
import { Icon } from '@material-ui/core';
import { Modal } from '../../../components/Modal/Modal';
import { ToggleTextInfo } from '../../Settings/Security/SecurityStyle';
import { ImageModal } from '../../Videos/General/ImageModal';
import { LiveImageModal } from './ImageModal';

export const LiveGeneralPage = () => {

    const [imageModalOpen, setImageModalOpen] = React.useState<boolean>(false)
    const [imageModalTitle, setImageModalTitle] = React.useState<string>(null)

    const copyKey = (value: string) => {
        var textArea = document.createElement("textarea");
        textArea.value = value;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();
    }

    return (
        <React.Fragment>
            <Card className="col-12 clearfix">
                <div className="details col col-12">
                    <header className="flex justify-between">
                        <Text size={20} weight="med">Details</Text>
                    </header>
                    <Toggle
                        className="col col-12 mt2 pb2"
                        // defaultChecked={VodDetails.online}
                        // onChange={(event) => { toggleVideoIsOnline(!videoIsOnline); setVodDetails({ ...VodDetails, ["online"]: !videoIsOnline }) }}
                        label="Live Stream Online"
                    />
                    <Input
                        className="col col-6 pr2"
                        label="Title"
                        // value={props.vodDetails.title}
                        // onChange={event => setVodDetails({ ...VodDetails, ["title"]: event.currentTarget.value })}
                    />
                    <Input
                        className="col col-6"
                        label="Folder"
                        // value={props.vodDetails.folder}
                        // onChange={event => setVodDetails({ ...VodDetails, ["folder"]: event.currentTarget.value })}
                    />
                    <Input
                        className="col col-6 pr2 pt2"
                        label="Description"
                        // defaultValue={props.vodDetails.description}
                        // onChange={event => setVodDetails({ ...VodDetails, ["description"]: event.currentTarget.value })}
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
                                <ImageSection> <SelectedImage src="https://www.placecage.com/240/149" /></ImageSection>
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
                                <ImageSection> <SelectedImage src="https://www.placecage.com/171/96" /></ImageSection>
                                <ButtonSection><Button sizeButton="xs" className="clearfix right m1" typeButton="secondary" onClick={() => {setImageModalTitle("Change Thumbnail");setImageModalOpen(true)}}>Change</Button></ButtonSection>  
                            </ImageArea>
                            <Text size={10} weight="reg" color="gray-3">Minimum 480px x 480px, formats: JPG, PNG, SVG, GIF</Text>
                        </ImageContainer>
                        <ImageContainer className="">
                            <div className="flex flex-center">
                            <Text className="mr1" size={16} weight="med">Poster</Text>  <Icon>info_outlined</Icon>
                            </div>
                            <ImageArea className="mt2">
                                <ImageSection> <SelectedImage src="https://www.placecage.com/90/160" /></ImageSection>
                                <ButtonSection><Button sizeButton="xs" className="clearfix right m1" typeButton="secondary" onClick={() => {setImageModalTitle("Change Poster");setImageModalOpen(true)}}>Change</Button></ButtonSection>  
                            </ImageArea>
                            <Text size={10} weight="reg" color="gray-3">Always 160px x 90px, formats: JPG, PNG, SVG, GIF </Text>
                        </ImageContainer>

                    </ImagesContainer>
                </div>
                <Divider className="col col-12" />
                <div className="settings col col-12">
                    <Text className="col col-12" size={20} weight="med">Settings</Text>
                    <div className="col col-12">
                        <Toggle label="Live Stream Recording"></Toggle>
                        <ToggleTextInfo>
                        <Text size={14} weight='reg' color='gray-1'>8 continuous hours recording limit at a time. Live Stream recording turns off after 7 days and can be turned on again.</Text>
                        </ToggleTextInfo>
                        <Toggle label="Live Stream Start Countdown"></Toggle>
                        <ToggleTextInfo>
                        <Text size={14} weight='reg' color='gray-1'>The scheduled Paywall needs to be deleted to display the countdown.</Text>
                        </ToggleTextInfo>
                        <Toggle label="30 Minute Rewind"></Toggle>
                        <ToggleTextInfo>
                        <Text size={14} weight='reg' color='gray-1'>Rewind, pause, and fast-forward to catch back up to the live broadcast for up to 30 minutes. For help setting up please visit the Knowledge Base.</Text>
                        </ToggleTextInfo>   
                    </div>  
                </div>
                <LiveImageModal toggle={() => setImageModalOpen(false)} opened={imageModalOpen === true} submit={() => console.log("submitted")} title={imageModalTitle} />

            </Card>
            <ButtonContainer>
                <Button className="mr2" type="button">Save</Button>
                <Button typeButton="secondary">Discard</Button>
            </ButtonContainer>
    </React.Fragment>
    )
}