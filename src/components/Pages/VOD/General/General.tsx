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


const subtitlesTableHeader = (setSubtitleModalOpen: Function) => {
    return [
        <Text size={14} weight="med">Subtitles</Text>,
        <Text size={14} weight="med">Language</Text>,
        <Button onClick={() => setSubtitleModalOpen(true)} className="right mr2" sizeButton="xs" typeButton="secondary">Create Subtitle</Button>
    ]
};

const subtitlesTableBody = () => {
    return [[
        <Text size={14} weight="reg">subtitles_123456.srt</Text>,
        <Text size={14} weight="reg">Bulgarian</Text>,
        <IconContainer className="iconAction">
            <Icon>get_app</Icon>
            <Icon>delete</Icon>
            <Icon>edit</Icon>   
        </IconContainer>
    ],
    [
        <Text size={14} weight="reg">subtitles_german.srt</Text>,
        <Text size={14} weight="reg">German</Text>,
        <IconContainer className="iconAction">
            <Icon>get_app</Icon>
            <Icon>delete</Icon>
            <Icon>edit</Icon>   
        </IconContainer>
    ]]
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

export const GeneralPage = () => {

    const [advancedVideoLinksExpanded, setAdvancedVideoLinksExpanded] = React.useState<boolean>(false)
    const [subtitleModalOpen, setSubtitleModalOpen] = React.useState<boolean>(false)

    return (
        <Card className="col-12 clearfix">
            <div className="details col col-12">
                <Text size={20} weight="med">Details</Text>
                <Toggle label="Video Online"></Toggle>
                <Input className="col col-6" label="Title"></Input>
                <Input className="col col-6" label="Folder"></Input>
                <Input className="col col-6" label="Description"></Input>
            </div>
            <Divider className="col col-12"/>
            <div className="share col col-12">
                <Text className="col col-12" size={20} weight="med">Share</Text>
                <LinkBoxContainer className="col col-4">
                    <LinkBoxLabel>
                        <Text size={14} weight="med">Embed Code</Text>
                    </LinkBoxLabel>
                    <LinkBox></LinkBox>
                </LinkBoxContainer>
                <LinkBoxContainer className="col col-4">
                    <LinkBoxLabel>
                        <Text size={14} weight="med">JS</Text>
                    </LinkBoxLabel>
                    <LinkBox></LinkBox>
                </LinkBoxContainer>
                <LinkBoxContainer className="col col-4">
                    <LinkBoxLabel>
                        <Text size={14} weight="med">Link</Text>
                    </LinkBoxLabel>
                    <LinkBox></LinkBox>
                </LinkBoxContainer>
            </div>
            <Divider className="col col-12"/>
            <div className="thumbnail col col-12">
                <Text className="col col-12" size={20} weight="med">Thumbnail</Text>
                <Text className="col col-12" size={14} weight="reg">Select a thumbnail from the generated images, or upload your own thumbnail</Text>
                <ThumbnailContainer className="col col-12">
                    <UploadThumbnail>
                        <Text size={12} weight="reg" color="dark-violet">Upload Thumbnail</Text>
                    </UploadThumbnail>
                </ThumbnailContainer>
                <Text className="col col-12" size={14} weight="reg">Or, find a still frame from your video</Text>
                <Input className="col col-2"></Input>
                <Button className="col col-1" typeButton="secondary" sizeButton="xs">Add Frame</Button>
            </div>
            <div className="subtitles col col-12">
            <Text className="col col-12" size={20} weight="med">Subtitles</Text>
            <Text className="col col-12" size={14} weight="reg">Something about the subtitles</Text> 
            </div>
            <Table className="col col-12" header={subtitlesTableHeader( setSubtitleModalOpen)} body={subtitlesTableBody()} id="subtitlesTable"></Table>
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
            <Modal opened={subtitleModalOpen === true} toggle={() => setSubtitleModalOpen(false)} size="small" title="Add Subtitles">
                <ModalContent>
                    
                </ModalContent>
                <ModalFooter>
                    <Button>Add</Button>
                    <Button onClick={() => setSubtitleModalOpen(false)} typeButton="secondary">Cancel</Button>
                </ModalFooter>
            </Modal>
        </Card>
        
    )
    
}

const Divider = styled.div`
    border-bottom: 1px solid ${props => props.theme.colors["gray-7"]};
    margin: 32px 24px 24px 24px;
`

const LinkBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    height:auto;
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
margin: 8px 16px;
padding: 0 12px;
background-color: ${props => props.theme.colors["gray-10"]};
border: 1px solid ${props => props.theme.colors["gray-7"]};
align-items: center;

justify-content: space-between;
    &:hover > button{
        display: block;
    }
`

const ThumbnailContainer = styled.div`
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
   display: ${props => props.isExpanded ? "block" : "none"}
   `