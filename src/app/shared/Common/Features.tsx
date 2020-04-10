import React from 'react'
import { FolderAsset } from '../../redux-flow/store/Folders/types'
import { IconStyle, IconGreyContainer } from '../../../shared/Common/Icon'
import { Tooltip } from '../../../components/Tooltip/Tooltip'
import { LiveItem } from '../../redux-flow/store/Live/General/types'
import { PlaylistItem } from '../../redux-flow/store/Playlists/List/types'
import { VodItem } from '../../redux-flow/store/VOD/General/types'

export interface FeaturesList {
    paywall?: boolean;
    recording?: boolean;
    playlist?: boolean;  
    rewind?: boolean;
    advertising?: boolean;
    folder?: boolean;
}

export const handleFeatures = (item: FolderAsset | VodItem | LiveItem | PlaylistItem, id: string): JSX.Element[] => {
    var element = []
    if (item.features.paywall) {
        element.push(
            <IconGreyContainer key={'featureIconPaywall' + id} className="mr1" >
                <IconStyle id={"paywallTooltip" + id} coloricon='gray-3'>attach_money</IconStyle>
                <Tooltip target={"paywallTooltip" + id}>Paywall</Tooltip>
            </IconGreyContainer>
        )
    }
    if (item.features.recording) {
        element.push(
            <IconGreyContainer key={'featureIconRecording' + id} className="mr1" >
                <IconStyle id={"recordingTooltip" + id} coloricon='gray-3'>videocam</IconStyle>
                <Tooltip target={"recordingTooltip" + id}>Recording</Tooltip>
            </IconGreyContainer>)
    }
    if (item.features.playlist) {
        element.push(
            <IconGreyContainer key={'featureIconPlaylist' + id} className="mr1" >
                <IconStyle id={"playlistTooltip" + id} coloricon='gray-3'>video_library</IconStyle>
                <Tooltip target={"playlistTooltip" + id}>Playlists</Tooltip>
            </IconGreyContainer>)
    }
    if (item.features.rewind) {
        element.push(
            <IconGreyContainer key={'featureIconRewind' + id} className="mr1" >
                <IconStyle id={"rewindTooltip" + id} coloricon='gray-3'>replay_30</IconStyle>
                <Tooltip target={"rewindTooltip" + id}>30 min Rewind</Tooltip>
            </IconGreyContainer>)
    }
    if (item.features.advertising) {
        element.push(
            <IconGreyContainer key={'featureIconAdvertising' + id} className="mr1" >
                <IconStyle id={"advertisingTooltip" + id} coloricon='gray-3'>font_download</IconStyle>
                <Tooltip target={"advertisingTooltip" + id}>Advertising</Tooltip>
            </IconGreyContainer>)
    }
    if (item.features.folder) {
        element.push(
            <IconGreyContainer key={'featureIconFolder' + id} className="mr1" >
                <IconStyle id={"folderTooltip" + id} coloricon='gray-3'>folder</IconStyle>
                <Tooltip target={"folderTooltip" + id}></Tooltip>
            </IconGreyContainer>)
    }
    return element;
}