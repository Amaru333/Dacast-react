import { AssetTypeEndpoint } from "../../../../../DacastSdk/common";
import { GetExpoDetailsOutput, PutExpoDetailsInput } from "../../../../../DacastSdk/expo";
import { GetLiveDetailsOutput, PutLiveDetailsInput } from "../../../../../DacastSdk/live";
import { GetPlaylistDetailsOutput, PutPlaylistDetailsInput } from "../../../../../DacastSdk/playlist";
import { GetVideoDetailsOutput, PutVideoDetailsInput } from "../../../../../DacastSdk/video";
import { ContentType } from "../../Common/types";
import { AssetType, ExpoDetails, LiveDetails, PlaylistDetails, VodDetails } from "./types";

const formatAssetType = (asset: AssetTypeEndpoint): AssetType => {
    if(!asset.targetID) {
        return {}
    }
    let formattedAsset: AssetType = {
        targetID: asset.targetID,
        targetType: asset.targetType,
        url: asset.url
    }

    return formattedAsset
}

export const formatGetContentDetailsInput = (data: string): string => data

export const formatGetVideoDetailsOutput = (contentType: ContentType) => (data: GetVideoDetailsOutput): VodDetails & {contentType: ContentType} => {
    let formattedData: VodDetails & {contentType: ContentType} = {
        id: data.id,
        title: data.title,
        description: data.description,
        online: data.online,
        folders: data.folders,
        embedScaling: data.embedScaling,
        embedSize: data.embedSize,
        embedType: data.embedType,
        splashscreen: formatAssetType(data.splashscreen),
        thumbnail: formatAssetType(data.thumbnail),
        poster: formatAssetType(data.poster),
        subtitles: data.subtitles,
        uploadurl: null,
        contentType: contentType
    }

    return formattedData
}

export const formatPutVideoDetailsInput = (data: VodDetails): PutVideoDetailsInput => {
    let formattedData: PutVideoDetailsInput = {
        id: data.id,
        payload: {
            title: data.title,
            description: data.description,
            online: data.online
        }
    }

    return formattedData
}

export const formatPutVideoDetailsOutput = (contentType: ContentType) => (endpointResponse: null, data: VodDetails): VodDetails & {contentType: ContentType} => {
    let formattedData: VodDetails & {contentType: ContentType} = {
        ...data, 
        contentType: contentType
    }

    return formattedData
}

export const formatGetLiveDetailsOutput = (contentType: ContentType) => (data: GetLiveDetailsOutput): LiveDetails & {contentType: ContentType} => {
    let formattedData: LiveDetails & {contentType: ContentType} = {
        id: data.id,
        title: data.title,
        description: data.description,
        online: data.online,
        folders: data.folders,
        embedScaling: data.embedScaling,
        embedSize: data.embedSize,
        embedType: data.embedType,
        splashscreen: formatAssetType(data.splashscreen),
        thumbnail: formatAssetType(data.thumbnail),
        poster: formatAssetType(data.poster),
        unsecureM3u8Url: data.unsecureM3u8Url,
        countdown: data.countdown,
        recording: data.recording,
        rewind: data.rewind,
        backupPublishURL: data.backupPublishURL,
        username: data.username,
        password: data.password,
        primaryPublishURL: data.primaryPublishURL,
        streamKeys: data.streamKeys,
        encoderKey: data.encoderKey,
        uploadurl: null,
        contentType: contentType
    }

    return formattedData
}

export const formatPutLiveDetailsInput = (data: LiveDetails): PutLiveDetailsInput => {
    let formattedData: PutLiveDetailsInput = {
        id: data.id,
        payload: {
            title: data.title,
            description: data.description,
            online: data.online,
            countdown: data.countdown,
            recording: data.recording
        }
    }

    return formattedData
}

export const formatPutLiveDetailsOutput = (contentType: ContentType) => (endpointResponse: null, data: LiveDetails): LiveDetails & {contentType: ContentType} => {
    let formattedData: LiveDetails & {contentType: ContentType} = {
        ...data, 
        contentType: contentType
    }

    return formattedData
}

export const formatGetPlaylistDetailsOutput = (contentType: ContentType) => (data: GetPlaylistDetailsOutput): PlaylistDetails & {contentType: ContentType} => {
    let formattedData: PlaylistDetails & {contentType: ContentType} = {
        id: data.id,
        title: data.title,
        description: data.description,
        online: data.online,
        folders: data.folders,
        embedScaling: data.embedScaling,
        embedSize: data.embedSize,
        embedType: data.embedType,
        splashscreen: formatAssetType(data.splashscreen),
        thumbnail: formatAssetType(data.thumbnail),
        poster: formatAssetType(data.poster),
        uploadurl: null,
        contentType: contentType
    }

    return formattedData
}

export const formatPutPlaylistDetailsInput = (data: PlaylistDetails): PutPlaylistDetailsInput => {
    let formattedData: PutPlaylistDetailsInput = {
        id: data.id,
        payload: {
            title: data.title,
            description: data.description,
            online: data.online
        }
    }

    return formattedData
}

export const formatPutPlaylistDetailsOutput = (contentType: ContentType) => (endpointResponse: null, data: PlaylistDetails): PlaylistDetails & {contentType: ContentType} => {
    let formattedData: PlaylistDetails & {contentType: ContentType} = {
        ...data, 
        contentType: contentType
    }

    return formattedData
}

export const formatGetExpoDetailsOutput = (contentType: ContentType) => (data: GetExpoDetailsOutput): ExpoDetails & {contentType: ContentType} => {
    let formattedData: ExpoDetails & {contentType: ContentType} = {
        ...data,
        contentType: contentType,
        uploadurl: null
    }

    return formattedData
}

export const formatPutExpoDetailsInput = (data: ExpoDetails): PutExpoDetailsInput => {
    let formattedData: PutExpoDetailsInput = {
        id: data.id,
        payload: {
            title: data.title,
            description: data.description,
            appearance: data.appearance,
            online: data.online,
            poster: {
                assetId: data.poster.assetId,
                url: data.poster.url
            }
        }
    }

    return formattedData
}

export const formatPutExpoDetailsOutput = (contentType: ContentType) => (endpointResponse: null, data: ExpoDetails): ExpoDetails & {contentType: ContentType} => {
    let formattedData: ExpoDetails & {contentType: ContentType} = {
        ...data, 
        contentType: contentType
    }

    return formattedData
}